// src/client/app/contact.js
import { getAnimals, saveAnimal} from "./animal.service.js";
getAnimals();

document.getElementById("addForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from submitting and reloading the page
  // Get form values
  const name = document.getElementById("name").value;
  const breed = document.getElementById("breed").value;
  const legs = document.getElementById("legs").value;
  const eyes = document.getElementById("eyes").value;
  const sound = document.getElementById("sound").value;

  const valid = validateaddform(addForm);

  if(valid == true){
    // Log values to the console
    console.log("Name:", name);
    console.log("Breed:", breed);
    console.log("Legs:", legs);
    console.log("Eyes:", eyes);
    console.log("Sound:", sound);
    putAnimalInStorage({
      name,breed,legs,eyes,sound
    });
  }
  
});

// validate the animal form
function validateaddform(form) {
  let valid = true;

  const eleNameError = document.getElementById('name-error');
  const eleBreedError = document.getElementById('breed-error');
  const eleLegsError = document.getElementById('legs-error');
  const eleEyesError = document.getElementById('eyes-error');
  const eleSoundError = document.getElementById('sound-error');

  //const eleNameError = form.name.nextElementSibling;
  if (form.name.value === "") {
    valid = false;
    eleNameError.classList.remove("d-none");
    eleNameError.textContent = "You must name this animal.";
  } else {
    eleNameError.classList.add("d-none");
  }

  if (form.breed.value === "") {
    valid = false;
    eleBreedError.classList.remove("d-none");
    eleBreedError.textContent = "You must name this animal.";
  } else {
    eleBreedError.classList.add("d-none");
  }

  if (form.legs.value === "") {
    valid = false;
    eleLegsError.classList.remove("d-none");
    eleLegsError.textContent = "You must name this animal.";
  } else {
    eleLegsError.classList.add("d-none");
  }

  if (form.eyes.value === "") {
    valid = false;
    eleEyesError.classList.remove("d-none");
    eleEyesError.textContent = "You must name this animal.";
  } else {
    eleEyesError.classList.add("d-none");
  }

  if (form.sound.value === "") {
    valid = false;
    eleSoundError.classList.remove("d-none");
    eleSoundError.textContent = "You must name this animal.";
  } else {
    eleSoundError.classList.add("d-none");
  }

  const breed = form.breed.value;
  const legs = form.legs.value; // check that these are numbers
  const eyes = form.eyes.value; // check that these are numbers
  const sound = form.sound.value;
  return valid;
}

function putAnimalInStorage(animal) {
  
  const animalArray = JSON.parse(localStorage.getItem('Animals')) || [];

  
  const existingAnimal = animalArray.find(a => a.name === animal.name);

  if (existingAnimal) {

    console.log("An animal with this name already exists.");
  } else {
 
    animalArray.push(animal);
 
    localStorage.setItem('Animals', JSON.stringify(animalArray));
    console.log('Animal added:', animal);
    
  }
}



