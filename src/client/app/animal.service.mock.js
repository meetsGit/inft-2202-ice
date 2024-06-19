export function getAnimals() {
  try {
    let animals = localStorage.getItem('Animals') ? JSON.parse(localStorage.getItem('Animals')) : [];
    return animals;
  } catch (error) {
    console.error("Error getting animals:", error);
    return [];
  }
}

export function saveAnimal(animal) {
  try {
    const animalArray = JSON.parse(localStorage.getItem('Animals')) || [];
    const existingAnimal = animalArray.find(a => a.name === animal.name);
    if (existingAnimal) {
      throw new Error("An animal with this name already exists.");
    } else {
      animalArray.push(animal);
      localStorage.setItem('Animals', JSON.stringify(animalArray));
      console.log('Animal added:', animal);
    }
  } catch (error) {
    console.error("Error saving animal:", error);
  }
}

export function deleteAnimal(name) {
  try {
    const animals = getAnimals();
    const updatedAnimals = animals.filter(animal => animal.name !== name);
    localStorage.setItem('Animals', JSON.stringify(updatedAnimals));
  } catch (error) {
    console.error("Error deleting animal:", error);
  }
}

export function findAnimal(name) {
  try {
    const animals = getAnimals();
    const animal = animals.find(animal => animal.name === name);
    if (!animal) {
      throw new Error("Animal not found.");
    }
    return animal;
  } catch (error) {
    console.error("Error finding animal:", error);
    return null;
  }
}

export function updateAnimal(object) {
  try {
    let animals = getAnimals();
    let index = animals.findIndex(o => o.name === object.name);
    if (index === -1) {
      throw new Error("Animal not found.");
    }
    animals[index] = object;
    localStorage.setItem('Animals', JSON.stringify(animals));
  } catch (error) {
    console.error("Error updating animal:", error);
  }
}
