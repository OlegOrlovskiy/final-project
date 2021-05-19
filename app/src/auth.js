const currentUser = {};

const emailSign = document.querySelector('#emailSign');
const passwordSign = document.querySelector('#passwordSign');

const emailSignError = document.querySelector('#emailSignError');
const passwordSIgnError = document.querySelector('#passwordSignError');

emailSign.addEventListener('blur', emailVerify, true);
passwordSign.addEventListener('blur', passwordVerify, true);


function Validate() {
  const usersList = JSON.parse(localStorage.getItem('users'));
  const isRightEmail = element => element.email === emailSign.value;

  fetch('./app/src/dummy_data/users.json')
  .then(response => response.json())
  .then(data => {
      const ref = localStorage.getItem('users');
      if (!ref){
        localStorage.setItem('users', JSON.stringify(data));
      }        
    }); 

  if (emailSign.value == "") {
    emailSign.style.borderBottom = "1px solid red";
    document.querySelector('label[for=emailSign]').style.color = "red";
    emailSignError.textContent = "Email is required";
    emailSign.focus();
    return false;
  }  

  if (!usersList.some(isRightEmail)) {
    emailSign.style.borderBottom = "1px solid red";
    document.querySelector('label[for=emailSign]').style.color = "red";
    emailSignError.textContent = "User with this email does not exist";
    emailSign.focus();
    return false;
  }
  
  if (passwordSign.value == "") {
    passwordSign.style.borderBottom = "1px solid red";
    document.querySelector('label[for=passwordSign]').style.color = "red";
    passwordError.textContent = "Password is required";
    passwordSign.focus();
    return false;
  }

  usersList.forEach(element => {
    if (element.password === passwordSign.value && element.email === emailSign.value) {
      currentUser = element;
    } else {
      passwordSign.style.borderBottom = "1px solid red";
      document.querySelector('label[for=passwordSign]').style.color = "red";
      passwordSignError.textContent = "Incorrect password. Try again";
      passwordSign.focus();
    }
    return currentUser
  }) 
}

function addUser(newUser) {
  const ref = localStorage.getItem('users');
  const usersList = JSON.parse(ref);
  usersList.push(newUser);
  
  return usersList
}


function passwordVerify() {
  if (passwordSign.value != "") {
  	passwordSign.style.borderBottom = "1px solid #ccc";
  	document.querySelector('label[for=passwordSign]').style.color = "#aaa";
  	passwordSignError.innerHTML = "";
  	return true;
  }
}

function emailVerify() {
  if (emailSign.value != "") {
  	emailSign.style.borderBottom = "1px solid #ccc";
  	document.querySelector('label[for=emailSign]').style.color = "#aaa";
  	emailSignError.innerHTML = "";
  	return true;
  }
}