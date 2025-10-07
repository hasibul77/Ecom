import {
  UserOTPService,
  VerifyOTPService,
  SaveProfileService,
  ReadProfileService,
} from "../services/UserServices.js";

export const UserOTP = async (req, res) => {
  const result = await UserOTPService(req);
  return res.status(200).json(result);
};

export const VerifyLogin = async (req, res) => {
  const result = await VerifyOTPService(req);

  if (result.status === "success") {
    const cookieOption = {
      expires: new Date(Date.now() + 48 * 60 * 60 * 1000),
      httpOnly: false,
    };

    res.cookie("token", result.token, cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

export const UserLogout = async (req, res) => {
  const cookieOption = {
    expires: new Date(Date.now() - 48 * 60 * 60 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};

export const CreateProfile = async (req, res) => {
  const result = await SaveProfileService(req);
  return res.status(200).json(result);
};

export const UpdateProfile = async (req, res) => {
  const result = await SaveProfileService(req);
  return res.status(200).json(result);
};

export const ReadProfile = async (req, res) => {
  const result = await ReadProfileService(req);
  return res.status(200).json(result);
};
