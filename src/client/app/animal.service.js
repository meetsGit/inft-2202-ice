const API_URL = 'https://inft2202.paclan.net/api/animals';

export async function getAnimals(page = 1, perPage = 5) {
  try {
    const url = `${API_URL}?${new URLSearchParams({ page, perPage })}`;
    const response = await fetch(url,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': "6671be31f37f86c6ae703289"
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error getting animals:", error);
    return { records: [], pagination: { page, perPage, count: 0 } };
  }
}

export async function saveAnimal(animal) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const savedAnimal = await response.json();
    console.log('Animal added:', savedAnimal);
    return savedAnimal;
  } catch (error) {
    console.error("Error saving animal:", error);
  }
}

export async function deleteAnimal(name) {
  try {
    const response = await fetch(`${API_URL}/${name}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Animal with name ${name} deleted.`);
  } catch (error) {
    console.error("Error deleting animal:", error);
  }
}

export async function findAnimal(name) {
  try {
    const response = await fetch(`${API_URL}/${name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const animal = await response.json();
    return animal;
  } catch (error) {
    console.error("Error finding animal:", error);
    return null;
  }
}

export async function updateAnimal(animal) {
  try {
    const response = await fetch(`${API_URL}/${animal.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(animal)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updatedAnimal = await response.json();
    console.log('Animal updated:', updatedAnimal);
    return updatedAnimal;
  } catch (error) {
    console.error("Error updating animal:", error);
  }
}
