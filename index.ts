import axios from 'axios';


function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}


const form = document.getElementById("contactForm") as HTMLFormElement;
const responseMessage = document.getElementById("responseMessage") as HTMLParagraphElement;

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const contactNumber = (document.getElementById("contactNumber") as HTMLInputElement).value;
    const subject = (document.getElementById("subject") as HTMLInputElement).value;
    const message = (document.getElementById("message") as HTMLTextAreaElement).value;

    
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

    try {
        
        const apiUrl = "https://6715f76d33bc2bfe40bbbfbe.mockapi.io/a9/api"; 
        const result = await axios.post(apiUrl, formData);
        
        if (result.status === 201) {
            responseMessage.textContent = "Form Submitted Successfully!";
            form.reset();
        } else {
            responseMessage.textContent = "Submission Failed. Please try again.";
        }
    } catch (error) {
        responseMessage.textContent = "Submission Failed. Please try again.";
        console.error("Error submitting form:", error);
    }
});
