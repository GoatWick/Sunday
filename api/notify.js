<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notify Owner - Sunday’s Tag</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #fdf7e2;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 500px;
            margin: auto;
            padding: 20px;
            background: white;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
        }
        h1 {
            color: #f76c6c;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-label {
            font-size: 1.1rem;
            margin-bottom: 5px;
            display: inline-block;
        }
        .form-control {
            width: 100%;
            padding: 10px;
            font-size: 1rem;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .form-control:focus {
            border-color: #f76c6c;
            outline: none;
        }
        .btn {
            padding: 10px 20px;
            font-size: 1rem;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .btn-primary {
            background-color: #f76c6c;
            color: white;
            border: none;
        }
        .btn-primary:hover {
            background-color: #e65b5b;
        }
        .btn-success {
            background-color: #4caf50;
            color: white;
            border: none;
        }
        .btn-success:hover {
            background-color: #45a047;
        }
        footer {
            margin-top: 20px;
            font-size: 0.9rem;
            color: #666;
        }
        /* Popup styles */
        .popup {
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            border: 1px solid #ddd;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            z-index: 1000;
            width: 300px;
        }
        .popup-button {
            background-color: #f76c6c;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .popup-button:hover {
            background-color: #e65b5b;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 999;
            display: none;
        }
        .info-text {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Sunday’s Tag</h1>
        <p>Help us locate Sunday if she's lost!</p>
        <form id="contact-form">
            <div class="form-group">
                <label for="name" class="form-label">Name (optional)</label>
                <input type="text" id="name" name="name" class="form-control" placeholder="Enter your name" />
            </div>
            <div class="form-group">
                <label for="phone" class="form-label">Phone Number (optional)</label>
                <input type="tel" id="phone" name="phone" class="form-control" placeholder="Enter your phone number" />
            </div>
            <div class="form-group">
                <label for="message" class="form-label">Message (optional)</label>
                <textarea id="message" name="message" class="form-control" placeholder="Enter your message"></textarea>
            </div>
            <!-- Share location button with info -->
            <div class="form-group">
                <button type="button" id="share-location" class="btn btn-primary">Share Location</button>
                <span class="info-text">This will only request your location once. The sole purpose is to help locate Sunday if she gets lost.</span>
            </div>
            <!-- Notify Owner button -->
            <div class="form-group">
                <button type="button" id="notify-owner" class="btn btn-success">Notify Owner</button>
            </div>
        </form>
    </div>
    <footer>
        <p>&copy; 2024 Sunday’s Tag | All rights reserved.</p>
    </footer>

    <!-- Popup Modal -->
    <div class="overlay" id="overlay"></div>
    <div class="popup" id="popup">
        <p>Your message has been successfully sent! Thank you for helping Sunday!</p>
        <button class="popup-button" id="close-popup">Close</button>
    </div>

    <script>
        // JavaScript for handling location sharing and form submission
        document.getElementById('share-location').addEventListener('click', function() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    const locationInput = document.createElement('input');
                    locationInput.type = 'hidden';
                    locationInput.name = 'location';
                    locationInput.value = `https://www.google.com/maps?q=${latitude},${longitude}`;
                    document.getElementById('contact-form').appendChild(locationInput);
                    alert('Location shared successfully! You can now notify the owner.');
                }, function(error) {
                    alert('Error retrieving location. Please make sure location services are enabled.');
                });
            } else {
                alert('Geolocation is not supported by your browser.');
            }
        });

        // Notify Owner button functionality - send data to API
        document.getElementById('notify-owner').addEventListener('click', function() {
            const formData = new FormData(document.getElementById('contact-form'));
            fetch('/api/notify', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === 'Notification sent successfully!') {
                    // Show popup when notification is successful
                    document.getElementById('popup').style.display = 'block';
                    document.getElementById('overlay').style.display = 'block';
                } else {
                    alert('There was an error sending the notification.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error sending the notification.');
            });
        });

        // Close popup when clicking the close button
        document.getElementById('close-popup').addEventListener('click', function() {
            document.getElementById('popup').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        });
    </script>
</body>
</html>
