export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { latitude, longitude, timestamp } = req.body;

        // Example: Sending Email with Nodemailer
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password',
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'your-email@gmail.com',
            subject: "Sunday's Tag Scanned!",
            text: `Sunday was found! Location: 
            Latitude: ${latitude}, Longitude: ${longitude}
            Timestamp: ${timestamp}
            `,
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
