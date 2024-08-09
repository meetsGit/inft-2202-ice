import tmplHome from './home.ejs';
import "../../../img/horse.jpg";
import "../../../img/Turtle.jpg";
import "../../../img/Cheetah.jpg";

export default async () => {
    const strHome = tmplHome();

    document.getElementById('app')
        .insertAdjacentHTML("afterbegin", strHome);
    
}