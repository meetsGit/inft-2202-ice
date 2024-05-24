
export function getAnimals() {
    let animals;
    if(localStorage.getItem('animal')) {
        animals = JSON.parse(localStorage.getItem('animal'))
    } else {
        animals = [];

    }

    return animals;
  }
    
export function saveAnimal(animal) {
        
    if (animal.find(a => a.name === animal.name)) 
    {
      return false; 
    }
    else {
        console.log("It already exists, we are not going to store it ")
    }       
    animal.push(animal);       
    localStorage.setItem('Animals', JSON.stringify(animal));    
    return true; 
  }
  