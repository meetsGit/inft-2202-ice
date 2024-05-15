

const myContent = document.getElementById('my-content');
console.log(myContent);

const p = document.createElement('p');
p.textContent = 'I made this with javascript!';

myContent.append(p);

// create a new container
let container = document.createElement("div");

// create a new paragraph
let p2 = document.createElement("p");
p2.textContent = "new paragraph"

container.appendChild(p2);

let span = document.createElement("span");
span.textContent = "new span";

p2.before(span);
console.log(container.outerfill);

myContent.append(container)


const divbox2 = document.getElementById("div-02");
divbox2.remove();

// lets create a button
const button = document.createElement('button');
button.innerText ='Click Me!';
button.addEventListener('click', (event) => {
    alert('I was clicked!');
    console.log(event.target);

    const divbox1 = document.getElementById("div-01");

    divbox1.remove();
})
// add it to page
myContent.append(button);