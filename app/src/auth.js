const currentUser = {};
  
const emailSign = document.querySelector('#emailSign');
const passwordSign = document.querySelector('#passwordSign');
const emailSignError = document.querySelector('#emailSignError');
const passwordSIgnError = document.querySelector('#passwordSignError');
const SignInBtn = document.querySelector('#signInBtn');

emailSign.addEventListener('blur', emailSignVerify, true);
passwordSign.addEventListener('blur', passwordSignVerify, true);
signInBtn.addEventListener('click', ValidateSignIn);

function ValidateSignIn() {
  let usersList = JSON.parse(localStorage.getItem('users'));
  const isRightEmail = element => element.email === emailSign.value;

  fetch('./app/src/dummy_data/users.json')
  .then(response => response.json())
  .then(data => {
      const ref = localStorage.getItem('users');
      if (!ref){
        localStorage.setItem('users', JSON.stringify(data));
        usersList = JSON.parse(localStorage.getItem('users'));
        console.log(usersList);
      } else {
        usersList = JSON.parse(localStorage.getItem('users'));
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
      for (let key in element){
        currentUser[key] = element[key];
      }
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      window.location.href = 'index.html';
    } else {
      passwordSign.style.borderBottom = "1px solid red";
      document.querySelector('label[for=passwordSign]').style.color = "red";
      passwordSignError.textContent = "Incorrect password. Try again";
      passwordSign.focus();
    }
  });
}

function passwordSignVerify() {
  if (passwordSign.value != "") {
    passwordSign.style.borderBottom = "1px solid #ccc";
    document.querySelector('label[for=passwordSign]').style.color = "#aaa";
    passwordSignError.innerHTML = "";
    return true;
  }
}

function emailSignVerify() {
  if (emailSign.value != "") {
    emailSign.style.borderBottom = "1px solid #ccc";
    document.querySelector('label[for=emailSign]').style.color = "#aaa";
    emailSignError.innerHTML = "";
    return true;
  }
}
