import nodemailer from 'nodemailer';

export const emailTransporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a1ef347f9782ea",
        pass: "b64500e7f68eb4"
    }
});
