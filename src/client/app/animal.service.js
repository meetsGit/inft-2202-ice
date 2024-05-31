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

export function deleteAnimal(name) {
  const animals = getAnimals();
  const updatedAnimals = animals.filter(animal => animal.name !== name);
  localStorage.setItem('Animals', JSON.stringify(updatedAnimals)); // Fixed casing here
}

export function findAnimal(name) {
  const animals = getAnimals();
  return animals.find(animal => animal.name === name) || null;
}


export function updateAnimal(object){
  let animals = getAnimals();
  let index = animals.findIndex(o => o.name === object.name);
  animals.splice(index, 1);
  animals.push(object);
  localStorage.setItem('Animals', JSON.stringify(animals));
}

