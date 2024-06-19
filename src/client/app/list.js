import { getAnimals, deleteAnimal } from './animal.service.js';

const messageBox = document.getElementById('message-box');
const animalTable = document.getElementById('animals-list');
const tbody = animalTable.querySelector('tbody');
const pagination = document.getElementById('pagination');
const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
const spinner = document.getElementById('spinner');
const perPageDropdown = document.getElementById('perPageDropdown');

let animals = [];
let currentPage = 1;
let animalsPerPage = 5;
let animalToDelete = null;
let totalCount = 0;

perPageDropdown.addEventListener('change', (event) => {
    animalsPerPage = parseInt(event.target.value, 10);
    currentPage = 1; // Reset to the first page when perPage changes
    updateURLParams();
    loadPageData();
});

function drawAnimalTable() {
    tbody.innerHTML = ''; // Clear the table

    if (animals.length === 0) {
        messageBox.classList.remove('d-none');
        animalTable.classList.add('d-none');
    } else {
        messageBox.classList.add('d-none');
        animalTable.classList.remove('d-none');

        const columns = ['name', 'breed', 'legs', 'eyes', 'sound'];

        animals.forEach(animal => {
            const row = tbody.insertRow();
            columns.forEach(key => {
                const cell = row.insertCell();
                cell.textContent = animal[key] ?? '';
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

        drawPagination();
        enableTooltips();
    }
}


document.getElementById('confirmDelete').addEventListener('click', async () => {
    try {
        await deleteAnimal(animalToDelete);
        loadPageData();
        deleteModal.hide();
    } catch (error) {
        console.error("Error deleting animal:", error.message);
    }
});

function drawPagination() {
    const totalPages = Math.ceil(totalCount / animalsPerPage);
    pagination.innerHTML = '';

    if (totalPages <= 1) {
        pagination.classList.add('d-none');
    } else {
        pagination.classList.remove('d-none');

        const prevLi = document.createElement('li');
        prevLi.classList.add('page-item');
        if (currentPage === 1) {
            prevLi.classList.add('disabled');
        }
        const prevA = document.createElement('a');
        prevA.classList.add('page-link');
        prevA.href = '#';
        prevA.textContent = 'Previous';
        prevA.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                currentPage--;
                updateURLParams();
                loadPageData();
            }
        });
        prevLi.appendChild(prevA);
        pagination.appendChild(prevLi);

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
                updateURLParams();
                loadPageData();
            });
            li.appendChild(a);
            pagination.appendChild(li);
        }

        const nextLi = document.createElement('li');
        nextLi.classList.add('page-item');
        if (currentPage === totalPages) {
            nextLi.classList.add('disabled');
        }
        const nextA = document.createElement('a');
        nextA.classList.add('page-link');
        nextA.href = '#';
        nextA.textContent = 'Next';
        nextA.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage < totalPages) {
                currentPage++;
                updateURLParams();
                loadPageData();
            }
        });
        nextLi.appendChild(nextA);
        pagination.appendChild(nextLi);
    }
}

function enableTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

function showSpinner() {
    spinner.classList.remove('d-none');
    animalTable.classList.add('d-none');
    messageBox.classList.add('d-none');
}

function hideSpinner() {
    spinner.classList.add('d-none');
    animalTable.classList.remove('d-none');
}

function updateURLParams() {
    const params = new URLSearchParams(window.location.search);
    params.set('page', currentPage);
    params.set('perPage', animalsPerPage);
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
}

async function loadPageData() {
    showSpinner();
    try {
        const data = await getAnimals(currentPage, animalsPerPage);
        animals = data.records;
        totalCount = data.pagination.count;
        drawAnimalTable();
    } catch (error) {
        console.error('Error loading animals:', error.message);
        // Handle error message display
    } finally {
        hideSpinner();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    currentPage = parseInt(params.get('page')) || 1;
    animalsPerPage = parseInt(params.get('perPage')) || 5;
    perPageDropdown.value = animalsPerPage;
    loadPageData();
});
