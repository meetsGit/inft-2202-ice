// src/client/app/list.js

import { getAnimals } from './animal.service.js';

document.addEventListener("DOMContentLoaded", () => {
  const animals = getAnimals();
  drawAnimalsTable(animals);
});

function drawAnimalsTable(animals) {
  const animalsList = document.getElementById("animals-list").getElementsByTagName('tbody')[0];
  animalsList.innerHTML = '';

  animals.forEach(animal => {
    const row = animalsList.insertRow(-1);

    const nameCell = row.insertCell(0);
    const breedCell = row.insertCell(1);
    const legsCell = row.insertCell(2);
    const eyesCell = row.insertCell(3);
    const soundCell = row.insertCell(4);
    const actionsCell = row.insertCell(5);

    nameCell.textContent = animal.name;
    breedCell.textContent = animal.breed;
    legsCell.textContent = animal.legs;
    eyesCell.textContent = animal.eyes;
    soundCell.textContent = animal.sound;

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-warning btn-sm';
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = () => location.href = `add.html?name=${animal.name}`;
    actionsCell.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.onclick = () => {
      deleteAnimal(animal.name);
      location.reload();
    };
    actionsCell.appendChild(deleteButton);
  });
}
