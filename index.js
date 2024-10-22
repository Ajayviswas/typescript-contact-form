
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const contactNumber = document.getElementById('contactNumber').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const responseMessage = document.getElementById('responseMessage');

    
    if (!name || !email || !contactNumber || !subject || !message) {
        responseMessage.textContent = "All fields are required.";
        return;
    }

    if (!validateEmail(email)) {
        responseMessage.textContent = "Invalid email address.";
        return;
    }

    
    const formData = {
        name,
        email,
        contactNumber,
        subject,
        message
    };

    
    fetch('https://6715f76d33bc2bfe40bbbfbe.mockapi.io/a9/api', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        responseMessage.textContent = "Form Submitted Successfully!";
        document.getElementById('contactForm').reset(); 
    })
    .catch(error => {
        console.error('Error:', error);
        responseMessage.textContent = "Submission Failed. Please try again.";
    });
});
