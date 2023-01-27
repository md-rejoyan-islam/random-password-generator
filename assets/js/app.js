//get element from html page
const showPassword = document.getElementById("showPassword");
const formResult = document.getElementById("formResult");
const passwordSize = document.getElementById("passwordSize");
const copy = document.getElementById("copy");

//  password size change
passwordSize.oninput = (e) => {
  const sizeValue = document.getElementById("sizeValue");
  sizeValue.innerText = e.target.value;
};

// password includes element
let possibleCharacters = "";
formResult.onsubmit = (e) => {
  possibleCharacters = "";
  e.preventDefault();
  const form = new FormData(e.target);
  const { size, duplicate, lowercase, number, space, symbol, uppercase } =
    Object.fromEntries(form.entries());

  lowercase ? (possibleCharacters += "abcdefghijklmnopqrstuvwxyz") : "";
  uppercase ? (possibleCharacters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ") : false;
  number ? (possibleCharacters += "0123456789") : false;
  symbol ? (possibleCharacters += "!@#%^&*()_+-=[]{}|;':\"<>,.?/\\") : false;
  space ? (possibleCharacters += " ") : false;

  showPassword.value = generatePassword(Number(size), duplicate);
};

// password generate function
function generatePassword(passwordLength, duplicate) {
  let password = "";
  for (let i = 0; i <= passwordLength; i++) {
    password += possibleCharacters.charAt(
      Math.floor(Math.random() * possibleCharacters.length)
    );
  }
  let duplicateLetters = password
    .split("")
    .filter((val, i, arr) => arr.indexOf(val) !== i);
  if (duplicate) {
    return password;
  } else {
    return duplicateLetters.length > 0
      ? generatePassword(passwordLength)
      : password;
  }
}

// password hide show
const eyes = document.getElementById("eyes");
let defaultValue = true;
eyes.onclick = () => {
  if (defaultValue) {
    defaultValue = false;
    showPassword.setAttribute("type", "text");
    eyes.children[1].classList.add("hidden");
    eyes.children[0].classList.remove("hidden");
  } else {
    showPassword.setAttribute("type", "password");
    eyes.children[0].classList.add("hidden");
    eyes.children[1].classList.remove("hidden");
    defaultValue = true;
  }
};

// password copy
copy.onclick = (e) => {
  if (!showPassword.value) return;
  window.navigator.clipboard.writeText(showPassword.value);
  e.target.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"  width="16" height="16" class='fill-white mt-2' x="0" y="0" viewBox="0 0 424.032 424" style="enable-background:new 0 0 512 512" xml:space="preserve" ><g><path d="M146.66 293.367c-4.094 0-8.191-1.558-11.305-4.695L4.688 158.004c-6.25-6.25-6.25-16.383 0-22.633s16.382-6.25 22.636 0l119.36 119.36L396.71 4.702c6.25-6.25 16.383-6.25 22.633 0s6.25 16.387 0 22.637L158.012 288.672a16.05 16.05 0 0 1-11.352 4.695zm0 0" data-original="#000000"></path></g></svg>
`;
  setInterval(() => {
    e.target.innerHTML = "copy";
  }, 1000);
};
