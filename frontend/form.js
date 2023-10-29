const urlParams = new URLSearchParams(window.location.search);
const database_user_id = urlParams.get('id');

// Now, 'id' contains the value passed from the login.html page
console.log('ID:', database_user_id);

function validateForm() {
    var name = document.getElementById("name").value;
    var desgn = document.getElementById("desgn").value;
    var about = document.getElementById("about").value;
    var skill = document.getElementById("skill").value;

    if (name.trim() === "") {
        alert("Name is required.");
        return false;
    }

    if (desgn.trim() === "") {
        alert("Designation is required.");
        return false;
    }

    if (about.trim() === "") {
        alert("About Yourself is required.");
        return false;
    }

    if (skill.trim() === "") {
        alert("Skills are required.");
        return false;
    }

    return true;
}

function storeUserInfo() {
    // Get form elements
    var name = document.getElementById('name').value;
    var desgn = document.getElementById('desgn').value;
    var about = document.getElementById('about').value;
    var skill = document.getElementById('skill').value;

    // Get educational details
    var eduDetails = document.getElementById('educationDetails').querySelectorAll('.educationRow');
    var educationInfo = [];

    for (var i = 0; i < eduDetails.length; i++) {
        var uni = eduDetails[i].querySelector('input[name^="uni_"]').value;
        var course = eduDetails[i].querySelector('input[name^="course_"]').value;
        var yc = eduDetails[i].querySelector('input[name^="yc_"]').value;

        educationInfo.push({
            university: uni,
            course: course,
            yearOfCompletion: yc
        });
    }

    // Get experience details
    var expDetails = document.getElementById('experienceDetails').querySelectorAll('.experienceRow');
    var experienceInfo = [];

    for (var i = 0; i < expDetails.length; i++) {
        var cname = expDetails[i].querySelector('input[name^="cname_"]').value;
        var cdesgn = expDetails[i].querySelector('input[name^="cdesgn_"]').value;
        var sd = expDetails[i].querySelector('input[name^="sd_"]').value;
        var ed = expDetails[i].querySelector('input[name^="ed_"]').value;
        var currwork = expDetails[i].querySelector('input[name^="currwork"]').checked;

        experienceInfo.push({
            companyName: cname,
            designation: cdesgn,
            startDate: sd,
            endDate: ed,
            currentlyWorking: currwork
        });
    }

    // Get project details
    var projDetails = document.getElementById('projectDetails').querySelectorAll('.projectRow');
    var projectInfo = [];

    for (var i = 0; i < projDetails.length; i++) {
        var pname = projDetails[i].querySelector('input[name^="pname_"]').value;
        var pdesc = projDetails[i].querySelector('input[name^="pdesc_"]').value;

        projectInfo.push({
            projectName: pname,
            description: pdesc
        });
    }

    // Get contact details
    var eid = document.getElementById('eid').value;
    var lid = document.getElementById('lid').value;
    var cid = document.getElementById('cid').value;
    var aid = document.getElementById('aid').value;

    // Create a user object with all the collected information
    var user = {
        personalInfo: {
            name: name,
            designation: desgn,
            about: about,
            skills: skill
        },
        education: educationInfo,
        experience: experienceInfo,
        projects: projectInfo,
        contact: {
            email: eid,
            linkedIn: lid,
            contactNumber: cid,
            address: aid
        }
    };
    var serverURL = 'http://localhost:5000/portfolio';

    // Generate a unique ID or use any identifier as needed
    var id = database_user_id;

    //Yaha se dekh
    // Prepare the request body
    var requestBody = {
        id: id,
        data: user
    };

    // Make a POST request to the server
    fetch(serverURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server if needed
            console.log('Server Response:', data);
            alert(data.message + "\nYou will be redirected...")
            window.location.href = "./portfolio/index.html?id=" + id;
        })
        .catch(error => {
            console.error('API Error:', error);
        });

    // Prevent the default form submission
    return false;

}