
// Login Check
const urlParams = new URLSearchParams(window.location.search);
const database_user_id = urlParams.get('id');

if(!database_user_id){
    alert("Youre not Logged In")
    window.location.href = './login.html';
}

window.localStorage.setItem('user_id',database_user_id)

console.log("Here is my id:", database_user_id)


