const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
// const firstName, lastName, adress, city, email;

function errorMsg(id, message, valid) {
  const container = document.getElementById(id);
  const errorText = document.getElementById(id + 'ErrorMsg');
  if(!valid) {
    errorText.textContent = message;
  } else {
    errorText.textContent = "";
  }
};
function NameChecker(value) {
  if (value.length > 0 && (value.length < 2 || value.length > 20)){
    errorMsg('firstName', "'Veuillez entrée un ' ${tagName} ' valide'");
    // firstName = null;
  } else if (!value.match(/^[a-zA-Z-]+$/)) {
    errorMsg('firstName', "'Le ' ${tagName} ' ne doit pas contenir de caractères spéciaux'");
    // firstName = null;
  } else {
    errorMsg('firstName', "", true);
    // firstName = value;
  }
};
// function lastNameChecker(value) {
//   if (value.length > 0 && (value.length < 2 || value.length > 20)){
//     errorMsg('lastName', 'Veuillez entrée un prénom valide');
//     // lastName = null;
//   } else if (!value.match(/^[a-zA-Z-]+$/)) {
//     errorMsg('lastName', 'Le nom ne doit pas contenir de caractères spéciaux');
//     // lastName = null;
//   } else {
//     errorMsg('lastName', "", true);
//     // lastName = value;
//   }
// };
function adressChecker(value) {
  if (!value.match(/^[a-zA-Z0-9-]+$/)) {
    errorMsg('adress', 'adresse invalide');
    // adress = null;
  } else {
    errorMsg('email', "", true);
    // adress = value;
  }
};
// function cityChecker(value) {
//   if (!value.match(/^[a-z]+$/i)) {
//     errorMsg('city', 'nom de la ville invalide');
//     // city = null;
//   } else {
//     errorMsg('city', "", true);
//     // city = value;
//   }
// };
function emailChecker(value) {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorMsg('email', 'adresse mail invalide');
    // email = null;
  } else {
    errorMsg('city', "", true);
    // email = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener('input', (e) =>{
    switch (e.target.id) {
      case 'firstName':
        firstNameChecker(e.target.value)
        break;
      case 'lastName':
        lastNameChecker(e.target.value)
        break;
      case 'adress':
        adressChecker(e.target.value)
        break;
      case 'city':
        cityChecker(e.target.value)
        break;
      case 'email':
        emailChecker(e.target.value)
        break;
    }
  });
});


fetch('http://localhost:3000/api/products').then((res) => res.json()).then((kanaps) => {
  kanaps.map(kanap => {
  })
});

