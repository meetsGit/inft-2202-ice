const API_URL = 'https://inft2202.paclan.net/api/animals';
const API_KEY = '6671be31f37f86c6ae703289';

// Fetch animals with pagination
export async function getAnimals(page = 1, perPage = 5) {
  try {
    const url = `${API_URL}?${new URLSearchParams({ page, perPage })}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    displayMessage("Error getting animals: " + error.message, "danger");
    return { records: [], pagination: { page, perPage, count: 0 } };
  }
}

// Save a new animal
export async function saveAnimal(animal) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY,
      },
      body: JSON.stringify(animal),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const savedAnimal = await response.json();
    console.log('Animal added:', savedAnimal);
    displayMessage("Animal added successfully!", "success");
    redirectToList();
    return savedAnimal;
  } catch (error) {
    displayMessage("Error saving animal: " + error.message, "danger");
  }
}

// Delete an animal by name
export async function deleteAnimal(name) {
  try {
    const response = await fetch(`${API_URL}/${name}`, {
      method: 'DELETE',
      headers: {
        'apikey': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`Animal with name ${name} deleted.`);
    displayMessage(`Animal with name ${name} deleted successfully!`, "success");
    redirectToList();
  } catch (error) {
    displayMessage("Error deleting animal: " + error.message, "danger");
  }
}

// Find an animal by name
export async function findAnimal(name) {
  try {
    const response = await fetch(`${API_URL}/${name}`, {
      method: 'GET',
      headers: {
        'apikey': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const animal = await response.json();
    return animal;
  } catch (error) {
    displayMessage("Error finding animal: " + error.message, "danger");
    return null;
  }
}

// Update an existing animal
export async function updateAnimal(animal) {
  try {
    const response = await fetch(`${API_URL}/${animal.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'apikey': API_KEY,
      },
      body: JSON.stringify(animal),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const updatedAnimal = await response.json();
    console.log('Animal updated:', updatedAnimal);
    displayMessage("Animal updated successfully!", "success");
    redirectToList();
    return updatedAnimal;
  } catch (error) {
    displayMessage("Error updating animal: " + error.message, "danger");
  }
}

// Display a message on the screen
function displayMessage(message, type) {
  const messageContainer = document.getElementById("message-container");
  if (messageContainer) {
    messageContainer.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
  }
}

// Redirect to the list page
function redirectToList() {
  window.location.href = "./list.html"; 
}
