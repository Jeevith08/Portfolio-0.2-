import { Router, Request, Response } from 'express';
import nodemailer from 'nodemailer';

const router = Router();

router.post('/contact', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jeevith1708@gmail.com',
      pass: 'brut ujqo qxqs bzyl',
    },
  });

  const mailOptions = {
    from: `"Portfolio Contact" <${req.body.email}>`,
    to: 'jeevith1708@gmail.com',
    subject: `New message from ${req.body.name}`,
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: `Error sending email: ${error.message}` });
    }
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

export default router; 