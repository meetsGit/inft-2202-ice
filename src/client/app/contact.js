// src/client/app/contact.js

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    // Get form values
    var name = document.getElementById('name').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
  
    // Log values to the console
    console.log('Name:', name);
    console.log('Phone:', phone);
    console.log('Email:', email);
    console.log('Message:', message);
  });
  