<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notify Sunday’s Owner</title>
    <style>
        /* Same styles as before */
    </style>
</head>
<body>
    <div class="container">
        <h1>Notify Sunday’s Owner</h1>
        <form id="notifyForm">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required><br><br>

            <label for="email">Your Email:</label>
            <input type="email" id="email" name="email" required><br><br>

            <label for="message">Message (optional):</label>
            <textarea id="message" name="message"></textarea><br><br>

            <button type="submit" class="button">Send Notification</button>
        </form>
    </div>

    <footer>
        <p>&copy; 2024 Sunday’s Tag | All rights reserved.</p>
    </footer>

    <script>
        // Handle the form submission
        document.getElementById('notifyForm').addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent the default form submission

            const form = new FormData(e.target);
            const data = {
                name: form.get('name'),
                email: form.get('email'),
                message: form.get('message'),
                latitude: localStorage.getItem('latitude'), // Assuming you stored this from geolocation
                longitude: localStorage.getItem('longitude')
            };

            try {
                const response = await fetch('/api/notify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const result = await response.json();

                if (response.ok) {
                    alert('Notification sent successfully!');
                } else {
                    alert('Error: ' + result.error || 'There was an issue.');
                }
            } catch (error) {
                alert('Error sending notification: ' + error.message);
            }
        });
    </script>
</body>
</html>
