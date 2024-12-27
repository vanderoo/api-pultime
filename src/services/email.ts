import { emailTransporter } from '../configs/email';
import { MailOptions } from "../types/email";
import { ApiError } from "../utils/api-error";
import {logger} from "../configs/logging";

export async function sendEmail(options: MailOptions): Promise<void> {

    const mailOptions = {
        from: `"PulTime" <${process.env.SMTP_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
    };

    try {
        await emailTransporter.sendMail(mailOptions);
    } catch (error) {
        logger.error(error);
        throw new ApiError(500, 'INTERNAL_SERVER_ERROR', [{ message: error.message }]);
    }
}

export async function sendResetPasswordEmail(email: string, resetToken: string): Promise<void> {
    const resetLink = `${process.env.FRONTEND_URL}/login/reset/?token=${resetToken}`;
    const htmlContent = `
        <p>Hi,</p>
        <p>You requested to reset your password. Click the link below to reset your password:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>Thank you,</p>
        <p>PulTime Team</p>
    `;

    await sendEmail({
        to: email,
        subject: 'Reset Your Password',
        html: htmlContent,
    });
}
