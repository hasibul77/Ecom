import EmailSend from "../utility/EmailHelper.js";
import UserModel from "../models/UserModel.js";
import ProfileModel from "../models/ProfileModel.js";
import { EncodeToken } from "../utility/TokenHelper.js";

export const UserOTPService = async (req) => {
  try {
    const email = req.params.email;
    const code = Math.floor(100000 + Math.random() * 900000);

    const EmailText = `Your Verification Code is: ${code}`;
    const EmailSubject = "Email Verification";

    await EmailSend(email, EmailText, EmailSubject);

    await UserModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });

    return { status: "success", message: "6 Digit OTP has been sent" };
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

export const VerifyOTPService = async (req) => {
  try {
    const email = req.params.email;
    const otp = req.params.otp;

    //user count
    const total = await UserModel.find({ email, otp }).countDocuments();

    if (total === 1) {

      //user id read
      const user = await UserModel.find({ email, otp }).select("_id");
      const user_id = user[0]._id.toString();

      // user token
      const token = EncodeToken(email, user_id);

      //update 0
      await UserModel.updateOne({ email }, { $set: { otp: "0" } });

      return { status: "success", message: "Valid OTP", token, total };
    } else {
      return { status: "fail", message: "Invalid OTP", total };
    }
  } catch (e) {
    return { status: "fail", message: e.toString() };
  }
};

export const SaveProfileService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const reqBody = req.body;
    reqBody.userID = user_id;

    await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });

    return { status: "success", message: "Profile Save Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};

export const ReadProfileService = async (req) => {
  try {
    const user_id = req.headers.user_id;
    const result = await ProfileModel.find({ userID: user_id });

    return { status: "success", data: result };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong" };
  }
};
