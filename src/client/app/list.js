import { getAnimals, deleteAnimal } from './animal.service.js';

const messageBox = document.getElementById('message-box');
const animalTable = document.getElementById('animals-list');
const tbody = animalTable.querySelector('tbody');
const pagination = document.getElementById('pagination');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
let animals = getAnimals();
let currentPage = 1;
const animalsPerPage = 5;
let animalToDelete = null;

console.log('Loaded animals:', animals);

function drawAnimalTable(animals, page = 1) {
    if (animals.length === 0) {
        messageBox.classList.remove('d-none');
        animalTable.classList.add('d-none');
    } else {
        messageBox.classList.add('d-none');
        animalTable.classList.remove('d-none');
        const start = (page - 1) * animalsPerPage;
        const end = start + animalsPerPage;
        const paginatedAnimals = animals.slice(start, end);
        tbody.innerHTML = '';

        paginatedAnimals.forEach(animal => {
            const row = tbody.insertRow();
            Object.values(animal).forEach(value => {
                const cell = row.insertCell();
                cell.textContent = value;
            });
            const buttonCell = row.insertCell();

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.setAttribute('data-bs-toggle', 'tooltip');
            deleteButton.setAttribute('title', 'Delete this animal');
            deleteButton.addEventListener('click', () => {
                animalToDelete = animal.name;
                deleteModal.show();
            });
            buttonCell.appendChild(deleteButton);

            const editLink = document.createElement('a');
            editLink.classList.add('btn', 'btn-primary', 'btn-sm', 'ms-2');
            editLink.innerHTML = '<i class="fas fa-edit"></i>';
            editLink.href = 'add.html?name=' + animal.name;
            editLink.setAttribute('data-bs-toggle', 'tooltip');
            editLink.setAttribute('title', 'Edit this animal');
            buttonCell.appendChild(editLink);
        });

        drawPagination(animals.length);
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

document.getElementById('confirmDelete').addEventListener('click', () => {
    animals = animals.filter(animal => animal.name !== animalToDelete);
    localStorage.setItem('animals', JSON.stringify(animals));
    drawAnimalTable(animals, currentPage);
    deleteModal.hide();
});

function drawPagination(totalItems) {
    const totalPages = Math.ceil(totalItems / animalsPerPage);
    pagination.innerHTML = '';

    if (totalPages <= 1) {
        pagination.classList.add('d-none');
    } else {
        pagination.classList.remove('d-none');
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            li.classList.toggle('active', i === currentPage);
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.href = '#';
            a.textContent = i;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                drawAnimalTable(animals, currentPage);
            });
            li.appendChild(a);
            pagination.appendChild(li);
        }
    }
}

drawAnimalTable(animals);
