import Navigo from 'navigo';
import 'bootstrap';
import './scss/styles.scss';

import FooterComponent from './app/components/footer/footer.js'
import  HomeComponent from './app/components/home/home.js'
import HeaderComponent from './app/components/header/header.js';
import AboutComponent from './app/components/about/about.js';

// window.addEventListener('load', () => {
//     HeaderComponent();
//     FooterComponent();
//     HomeComponent();
//     AboutComponent();
// })

export const router = new Navigo('/');

window.addEventListener('load', () => {
    HeaderComponent();
    FooterComponent();
    // HomeComponent();
    // AboutComponent();

    router
        .on('/',HomeComponent)
        .on('/about',AboutComponent)
        .resolve();
})