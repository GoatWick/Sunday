import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { latitude, longitude, timestamp } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // Your new Gmail address
                pass: process.env.EMAIL_PASSWORD, // App Password
            },
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: process.env.EMAIL, // Send notifications to yourself
            subject: "Sunday's Tag Scanned!",
            text: `Sunday was found! Location:
            Latitude: ${latitude}, Longitude: ${longitude}
            Timestamp: ${timestamp}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Notification sent successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to send notification.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
