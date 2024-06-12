import { getAnimals, saveAnimal, updateAnimal } from "./animal.service.js";

const param = new URL(document.location).searchParams;
const data = param.get("name");

if (data) {
    const dname = document.getElementById("name");
    dname.value = data;
    dname.disabled = true;

    document.getElementById("addForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const breed = document.getElementById("breed").value;
        const legs = document.getElementById("legs").value;
        const eyes = document.getElementById("eyes").value;
        const sound = document.getElementById("sound").value;
        const formmm = document.getElementById("addForm");

        try {
            const valid = validateaddform(formmm);

            if (valid) {
                console.log("Name:", name);
                console.log("Breed:", breed);
                console.log("Legs:", legs);
                console.log("Eyes:", eyes);
                console.log("Sound:", sound);

                try {
                    updateAnimal({
                        name,
                        breed,
                        legs,
                        eyes,
                        sound
                    });

                    formmm.reset();
                    window.location.href = 'list.html';
                } catch (error) {
                    console.error("Error updating animal:", error);
                }
            }
        } catch (error) {
            console.error("Validation failed:", error);
        }
    });

    function validateaddform(form) {
        let valid = true;

        const eleNameError = document.getElementById('name-error');
        const eleBreedError = document.getElementById('breed-error');
        const eleLegsError = document.getElementById('legs-error');
        const eleEyesError = document.getElementById('eyes-error');
        const eleSoundError = document.getElementById('sound-error');

        try {
            if (form.name.value === "") {
                valid = false;
                eleNameError.classList.remove("d-none");
                eleNameError.textContent = "You must name this animal.";
                throw new Error("Name is required.");
            } else {
                eleNameError.classList.add("d-none");
            }

            if (form.breed.value === "") {
                valid = false;
                eleBreedError.classList.remove("d-none");
                eleBreedError.textContent = "You must name this animal.";
                throw new Error("Breed is required.");
            } else {
                eleBreedError.classList.add("d-none");
            }

            if (form.legs.value === "") {
                valid = false;
                eleLegsError.classList.remove("d-none");
                eleLegsError.textContent = "You must name this animal.";
                throw new Error("Legs are required.");
            } else {
                eleLegsError.classList.add("d-none");
            }

            if (form.eyes.value === "") {
                valid = false;
                eleEyesError.classList.remove("d-none");
                eleEyesError.textContent = "You must name this animal.";
                throw new Error("Eyes are required.");
            } else {
                eleEyesError.classList.add("d-none");
            }

            if (form.sound.value === "") {
                valid = false;
                eleSoundError.classList.remove("d-none");
                eleSoundError.textContent = "You must name this animal.";
                throw new Error("Sound is required.");
            } else {
                eleSoundError.classList.add("d-none");
            }

        } catch (error) {
            console.error("Validation error:", error);
        }

        return valid;
    }
}
