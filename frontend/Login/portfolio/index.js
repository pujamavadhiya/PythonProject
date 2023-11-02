const urlParams = new URLSearchParams(window.location.search);
const database_user_id = urlParams.get('id');

// yeeeeeeeeeeeeeeeeee
const updateDocument = (data) => {
    console.log(data)
    document.querySelector('.user_name').textContent = data.personalInfo.name;
    document.querySelector('.user_designation').textContent = "And I'm a " + data.personalInfo.designation;
  
  }

  document.addEventListener("DOMContentLoaded", function () {
    fetch(portfolioUrl)
    .then((response) => {
        if (!response.ok) {
        throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((portfolioData) => {
        // Process the retrieved portfolio data here
        console.log(portfolioData);
        updateDocument(portfolioData.data)

        // You can call the populatePortfolio function or use the data as needed
    })
    .catch((error) => {
        console.error("Error fetching portfolio data:", error);
    });
    // const userNameElement = document.querySelector('.text-2');
    // userNameElement.innerHTML = 'Your New Name';
  });
  
// document.getElementsByClassName("user_name").innerText = "Hello";

const portfolioUrl = `http://localhost:5000/portfolio?id=${database_user_id}`;

