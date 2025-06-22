"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = (0, express_1.Router)();
router.post('/contact', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'maddison53@ethereal.email',
            pass: 'jn7jnAPss4f63QBp6D'
        }
    });
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: 'jeevith1708@gmail.com',
        subject: 'New Contact Form Submission from Portfolio',
        text: message,
        html: `<p>You have a new contact form submission from your portfolio.</p>
           <h3>Contact Details</h3>
           <ul>
             <li>Name: ${name}</li>
             <li>Email: ${email}</li>
           </ul>
           <h3>Message</h3>
           <p>${message}</p>`,
    };
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Email sent successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});
exports.default = router;
