// src/client/app/animal.service.js

export function getAnimals() {
  let animals;
  if (localStorage.getItem('Animals')) {
    animals = JSON.parse(localStorage.getItem('Animals'));
  } else {
    animals = [];
  }
  return animals;
}

export function saveAnimal(animal) {
  const animals = getAnimals();
  if (animals.find(a => a.name === animal.name)) {
    console.log("Animal already exists");
    return false;
  }
  animals.push(animal);
  localStorage.setItem('Animals', JSON.stringify(animals));
  console.log("Animal added");
  return true;
}

