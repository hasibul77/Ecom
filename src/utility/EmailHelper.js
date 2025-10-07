import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ quiet: true }); // Load environment variables from .env

const EmailSend = async (EmailTo, EmailText, EmailSubject) => {
    const transport = nodemailer.createTransport({
        service: 'gmail', // Gmail service
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // Use App Password if 2FA is enabled
        }
    });

    const mailOptions = {
        from: `MERN Ecommerce Solution <${process.env.EMAIL_USER}>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    return await transport.sendMail(mailOptions);
};

export default EmailSend;
