import { getAnimals, deleteAnimal } from './animal.service.mock.js';

const messageBox = document.getElementById('message-box');
const animalTable = document.getElementById('animals-list');
const tbody = animalTable.querySelector('tbody');

const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));

let currentPage = 1;
const animalsPerPage = 5;
let animalToDelete = null;



function drawAnimalTable(animals, page = 1) {
    if (animals.length === 0) {
        messageBox.classList.remove('d-none');
        animalTable.classList.add('d-none');
    } else {
        messageBox.classList.add('d-none');
        animalTable.classList.remove('d-none');
        const start = (page - 1) * animalsPerPage;
        const end = start + animalsPerPage;

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
    deleteAnimal(animalToDelete); 
    animals = getAnimals(); 
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
                drawAnimalTable(animals, currentPage);
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
                drawAnimalTable(totalItems, currentPage);
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
                drawAnimalTable(animals, currentPage);
            }
        });
        nextLi.appendChild(nextA);
        pagination.appendChild(nextLi);
    }
}







//xhrAnimals();

fetchAnimalsAsync();

function xhrAnimals()
{
    const req = new XMLHttpRequest();
    /* req.addEventListener("readystatechange", event => {
        const response = event.target;
        console.log(response);
        if (response.readyState === 4){
            console.log("done")
            console.log(JSON.parse(response.responseText));
        }
    }); */

    req.addEventListener("load", event => {
        const response = event.target;
        console.log(response);
        console.log("done")
        const data = JSON.parse(response.responseText);
        console.log(data);

        drawAnimalTable(data);

        document.getElementById("spinner").classList.add('d-none');
    });
    req.open("GET", "./data/animals.json");
    req.send();    
}



function fetchAnimalsPromise(){
    const url = new URL('./data/animals.json', window.location.href)
    const headers = new Headers({

        'Content-Type': 'application/json'
    });
    const request = new Request(url, {
        headers,
        method: 'GET'
    });

    fetch(request)
    .then(response =>  {
        console.log(response)
        const data = response.json();
        console.log(data);


    })
    .catch(error => {
        console.log(error);
        
    })
}

async function fetchAnimalsAsync() {
    try {
        const response = await fetch('./data/animals.json');

        const data = await response.json();
        console.log(data);
        drawAnimalTable(data);
        document.getElementById("spinner").classList.add('d-none');
    } catch (error) {
        console.error("Error fetching animals:", error);
        document.getElementById("spinner").classList.add('d-none');
    }
}