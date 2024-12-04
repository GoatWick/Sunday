import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // Check if the method is POST
    if (req.method === 'POST') {
        try {
            // Extract the data sent in the body of the request
            const { name, email, message, latitude, longitude } = req.body;
            const timestamp = new Date().toISOString();

            // Check if email credentials are available in environment variables
            if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
                return res.status(500).json({ error: 'Email credentials are not set in the environment variables.' });
            }

            // Create a transporter object using SMTP (Gmail in this case)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,         // Your email address from environment variable
                    pass: process.env.EMAIL_PASSWORD, // Your email password from environment variable
                },
            });

            // Set up the email data
            const mailOptions = {
                from: process.env.EMAIL,           // Sender email
                to: process.env.EMAIL,             // Receiver email (the same email for now)
                subject: "Sunday’s Tag Notification", // Subject of the email
                text: `Sunday was found! 
                Name: ${name}
                Phone Number: ${tel}
                Message: ${message || 'No message provided'}
                Latitude: ${latitude}, Longitude: ${longitude}
                Timestamp: ${timestamp}`,
            };

            // Send the email
            await transporter.sendMail(mailOptions);

            // Respond with success message
            res.status(200).json({ message: 'Notification sent successfully!' });

        } catch (error) {
            // Log and handle any errors that occur during the request processing
            console.error('Error in API route:', error);
            res.status(500).json({ error: 'Failed to send notification.' });
        }
    } else {
        // If the method is not POST, return a Method Not Allowed error
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
