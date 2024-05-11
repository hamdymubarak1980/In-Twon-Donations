// A query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// The toggleDarkMode function
const toggleDarkMode = () => {
  // This code manipulates the DOM
  document.body.classList.toggle("dark-mode");
}

// Register a 'click' event listener for the theme button
  themeButton.addEventListener("click", toggleDarkMode);

// A query for the sign now button
let signNowButton = document.getElementById("sign-now-button");
let count = 3;

const addSignature = (person) => {
  let newSignature = document.createElement("h4");
  newSignature.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause.`;

  let signatures = document.querySelector(".signatures");
  signatures.appendChild(newSignature); 

  // A code to keep the count of total signatures
  document.getElementById("counter").remove();
  count = count + 1;
  let newCount = document.createElement("h4");
  newCount.id = "counter";
  newCount.innerText = "🖊️ " + count + " people have signed this petition and support this cause.";
  signatures.appendChild(newCount);
}

// A form-validating function
const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
 
  let person = {
    name: petitionInputs[0].value, 
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }

  if (person.name.length < 2) {
    petitionInputs[0].classList.add("error");
    containsErrors = true;
  } else {
    petitionInputs[0].classList.remove("error");
  }

  if (person.hometown.length < 2) {
    petitionInputs[1].classList.add("error");
    containsErrors = true;
  } else {
    petitionInputs[1].classList.remove("error");
  }

  const email = document.getElementById("email");

  if (!person.email.includes(".com")) {
    email.classList.add("error");
    containsErrors = true;
  } else {
    email.classList.remove("error");
  }

  if (!containsErrors) {
    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    toggleModal(person);    
  }  
}

signNowButton.addEventListener("click", validateForm);

// An object that contains animation properties
let animation = {
  revealDistance : 150,
  initialOpacity : 0,
  transitionDealy : 0,
  transitionDuaraion : 0,
  transitionProberty : "all",
  transitionTimingFunction : "ease"
}

let revealableContainers = document.querySelectorAll(".revealable");

const reveal = () => {
  for(let i = 0; i < revealableContainers.length; i++){
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
}

// Add reveal as an event listener to window, with the type of event as 'scroll'
window.addEventListener("scroll", reveal);

const toggleModal = (person) => {
   let modal = document.getElementById("thanks-modal");
   let modalContent = document.getElementById("thanks-modal-content");

   modal.style.display = "flex";
   modalContent.textContent = `Thank you so much ${person.name} for signing ths petition!`

   // A call to setTimeOut() function
   setTimeout(() => {
     modal.style.display = "none"; 
   }, 4000);  

  let intervalId = setInterval(scaleImage, 500);
  
  setTimeout(() => {
    clearInterval(intervalId);
  }, 10000);
}

let scaleFactor = 1;
let modalImage = document.getElementById("modal-image");

const scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

let closeButton = document.getElementById("close-thanks-modal");

const closeModal = () => {
  let modal = document.getElementById("thanks-modal");
  modal.style.display = "none";
}

closeButton.addEventListener("click", closeModal);

const reduceMotion = () => {
  animation.transitionDuration = "0";
  animation.transitionProperty = "none";
  animation.transitionTimingFunction = "linear";

  revealableContainers.forEach(container => {
    container.style.transitionDuration = animation.transitionDuration;
    container.style.transitionProperty = animation.transitionProperty;
    container.style.transitionTimingFunction = animation.transitionTimingFunction;
  });
}

let reduceMotionButton = document.getElementById("reduce-motion-button");
reduceMotionButton.addEventListener("click", reduceMotion);
