import { getAnimals, deleteAnimal } from './animal.service.js';

const messageBox = document.getElementById('message-box');
const animalTable = document.getElementById('animals-list');
const tbody = animalTable.querySelector('tbody');

const animals = getAnimals();
console.log('Loaded animals:', animals);
drawAnimalTable(animals);

function drawAnimalTable(animals) 
{    
    if (animals.length === 0) {        
        messageBox.classList.remove('d-none');
        animalTable.classList.add('d-none');
    } else {        
        messageBox.classList.add('d-none');
        animalTable.classList.remove('d-none');        
        tbody.innerHTML = '';   

        animals.forEach(animal => {           
            const row = tbody.insertRow();            
            Object.values(animal).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });            
            const buttonCell = row.insertCell();            
            const deleteButton = document.createElement('button');

            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');            
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';            
            deleteButton.addEventListener('click', () => {
                deleteAnimal(animal.name);                
                drawAnimalTable(getAnimals());
            });            

            buttonCell.appendChild(deleteButton);            
            const editLink = document.createElement('a');
            editLink.classList.add('btn', 'btn-primary', 'btn-sm', 'ms-2');           
            editLink.innerHTML = '<i class="fas fa-edit"></i>';            
            editLink.href = 'add.html?name='+ animal.name;            
            buttonCell.appendChild(editLink);
        });
    }
}
