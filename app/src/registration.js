const user = {};

const userName = document.querySelector('#userName');
const userSurname = document.querySelector('#userSurname');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const passwordConfirm = document.querySelector('#passwordConfirm');
const signUpBtn = document.querySelector('#signUpBtn');


const nameError = document.querySelector('#nameError');
const SurnameError = document.querySelector('#surnameError');
const emailError = document.querySelector('#emailError');
const passwordError = document.querySelector('#passwordError');


userName.addEventListener('blur', nameVerify, true);
userSurname.addEventListener('blur', surnameVerify, true);
email.addEventListener('blur', emailVerify, true);
password.addEventListener('blur', passwordVerify, true);
signUpBtn.addEventListener('click', ValidateSignUp);

function ValidateSignUp(){
  if (userName.value == "") {
    userName.style.borderBottom = "1px solid red";
    document.querySelector('label[for=userName]').style.color = "red";
    nameError.textContent = "Name is required";
    userName.focus();
    return false;
  }

  if (userName.value.length < 6) {
    userName.style.borderBottom = "1px solid red";
    document.querySelector('label[for=userName]').style.color = "red";
    nameError.textContent = "Name must be at least 6 characters";
    userName.focus();
    return false;
  }

  if (userSurname.value == "") {
    userSurname.style.borderBottom = "1px solid red";
    document.querySelector('label[for=userSurame]').style.color = "red";
    surnameError.textContent = "Surname is required";
    userSurname.focus();
    return false;
  }

  if (userSurname.value.length < 6) {
    userSurname.style.borderBottom = "1px solid red";
    document.querySelector('label[for=userSurname]').style.color = "red";
    surnameError.textContent = "Surname must be at least 6 characters";
    userSurname.focus();
    return false;
  } 

  if (password.value == "") {
    password.style.borderBottom = "1px solid red";
    document.querySelector('label[for=password]').style.color = "red";
    passwordConfirm.style.borderBottom = "1px solid red";
    passwordError.textContent = "Password is required";
    password.focus();
    return false;
  }

  if (password.value.length < 6) {
    password.style.borderBottom = "1px solid red";
    document.querySelector('label[for=password]').style.color = "red";
    passwordConfirm.style.borderBottom = "1px solid red";
    passwordError.textContent = "Password must be at least 6 character";
    password.focus();
    return false;
  }

  if (password.value != passwordConfirm.value) {
    password.style.borderBottom = "1px solid red";
    document.querySelector('label[for=passwordConfirm]').style.color = "red";
    passwordConfirm.style.borderBottom = "1px solid red";
    passwordError.innerHTML = "The two passwords do not match";
    passwordConfirm.focus();
    return false;
  }

   if (email.value == "") {
    email.style.borderBottom = "1px solid red";
    document.querySelector('label[for=email]').style.color = "red";
    emailError.textContent = "Email is required";
    email.focus();
    return false;
  }
  
  fetch('./app/src/dummy_data/users.json')
  .then(response => response.json())
  .then(data => {
      const ref = localStorage.getItem('users');
      if (!ref){
        localStorage.setItem('users', JSON.stringify(data));
      }        
    }); 


  const usersList = JSON.parse(localStorage.getItem('users'));
  const isRightEmail = element => element.email != email.value;

  if (!usersList.every(isRightEmail)) {
    email.style.borderBottom = "1px solid red";
    document.querySelector('label[for=email]').style.color = "red";
    emailError.textContent = "User with this email already exists";
    email.focus();
    return false;
  }    
   
  user.name = userName.value;
  user.surname = userSurname.value;
  user.password = password.value;
  user.email = email.value; 
  user.type = "user";
 
  localStorage.setItem('users', JSON.stringify(addUser(user)));
  window.location.href = 'auth.html';
}

function addUser(newUser) {
  const ref = localStorage.getItem('users');
  const usersList = JSON.parse(ref);
  usersList.push(newUser);
  
  return usersList
}

function nameVerify() {
  if (userName.value != "") {
   userName.style.borderBottom = "1px solid #ccc";
   document.querySelector('label[for=userName]').style.color = "#aaa";
   nameError.innerHTML = "";
   return true;
  }
}

function surnameVerify() {
  if (userSurname.value != "") {
   userSurname.style.borderBottom = "1px solid #ccc";
   document.querySelector('label[for=userSurname]').style.color = "#aaa";
   surnameError.innerHTML = "";
   return true;
  }
}

function passwordVerify() {
  if (password.value != "") {
  	password.style.borderBottom = "1px solid #ccc";
  	document.querySelector('label[for=passwordConfirm]').style.color = "#aaa";
  	document.querySelector('label[for=password]').style.color = "#aaa";
  	passwordError.innerHTML = "";
  	return true;
  }
  if (password.value === passwordConfirm.value) {
  	password.style.borderBottom = "1px solid #ccc";
  	document.querySelector('label[for=passwordConfirm]').style.color = "#aaa";
  	passwordError.innerHTML = "";
  	return true;
  }
}

function emailVerify() {
  if (email.value != "") {
  	email.style.borderBottom = "1px solid #ccc";
  	document.querySelector('label[for=email]').style.color = "#aaa";
  	emailError.innerHTML = "";
  	return true;
  }
}