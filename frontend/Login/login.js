function login() {
    // Get the email and password from the login form
    var email = document.querySelector('.login-form input[type="text"]').value;
    var password = document.querySelector('.login-form input[type="password"]').value;

    // Create the request body
    var requestBody = {
        email: email,
        password: password
    };

    // Make a POST request to the API
    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        // Log the API response to the console
        console.log('API Response Success:', data);
        
        if(data && data.id){
            alert(data.message + "\nYou will be redirected...")
            window.location.href = './index.html?id=' + data.id;
        }else{
            alert(data.message)
        }

        // You can handle the response data here, such as redirecting the user or showing a message.
    })
    .catch(error => {
        console.error('API Response:', error);
        
    });

    // Prevent the default form submission
    return false;
}

function signup() {
    // Get the name, email, and password from the signup form
    var name = document.querySelector('.signup-form input[type="text"]').value;
    var email = document.querySelector('.signup-form input[type="text"]').value;
    var password = document.querySelector('.signup-form input[type="password"]').value;

    // Log the signup data to the console
    console.log("Signup - Name: " + name + ", Email: " + email + ", Password: " + password);

    // Prevent the default form submission
    return false;
}