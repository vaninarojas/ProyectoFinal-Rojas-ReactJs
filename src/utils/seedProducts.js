import {addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const products = [ 
    { name: "Aros Cindy", img:"/img/aros.png" , price: 2000, category: "aros", description: "Plata 925", stock: 20 },
    { name: "Aros Mariposa", img: "/img/arosmariposa.jpg", price: 2500, category: "aros", description: "Plata 925", stock: 19 },
    { name: "Aros Corazones", img: "/img/aroscorazones.jpg", price: 2500, category: "aros", description: "Plata 925", stock: 18 },
    { name: "Pulsera Brazalete", img: "/img/pulsera.jpg", price: 6800, category: "pulseras", description: "Plata 925", stock: 8 },
    { name: "Pulsera Cristales", img: "/img/pulsera2.jpg", price: 25000, category: "pulseras", description: "Plata 925", stock: 5 },
    { name: "Pulsera Piedras", img: "/img/pulsera3.jpg", price: 10000, category: "pulseras", description: "Plata 925", stock: 3 },
   {  name: "Cadena Flor", img: "/img/cadena.jpg", price: 5000, category: "cadenas", description: "Plata 925", stock: 15 },
   {  name: "Cadena Cisne", img: "/img/cadena1.jpg", price: 34800, category: "cadenas", description: "Plata 925", stock: 13 },
   {  name: "Cadena Gota", img: "/img/cadena2.jpg", price: 32000, category: "cadenas", description: "Plata 925", stock: 9 },
   {  name: "Anillo Piedra", img: "/img/anillo.png", price: 3600, category: "anillos", description: "Plata 925", stock: 7 },
   {  name: "Anillo Colibrí", img: "/img/anillo1.jpg", price: 5000, category: "anillos", description: "Plata 925", stock: 6 },
   {  name: "Anillo Infinito", img: "/img/anillo2.jpg", price: 4500, category: "anillos", description: "Plata 925", stock: 4 },
  ];


export const seedProducts = () => {

products.forEach(product => {
    addDoc(collection(db, "products"), product)
});

};