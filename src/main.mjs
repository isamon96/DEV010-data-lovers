import ghibli from './data/ghibli/ghibli.mjs';
import {
  getFilms,
  getPeopleNameAndImg,
  getLocationsNameAndImg,
  getVehiclesNameAndImg,
  orderScore,
  orderYear,
  getDirectorProducerAverages,
} from './data.mjs';

let currentArray = [];

//FUNCIONES IMPORTADAS DATA.MJS
const filmsArray = getFilms(ghibli);
const peopleArray = getPeopleNameAndImg(ghibli);
const locationsArray = getLocationsNameAndImg(ghibli);
const vehiclesArray = getVehiclesNameAndImg(ghibli);
const directorsAndProducersArray = getDirectorProducerAverages(ghibli);

//ELEMENTOS DEL DOM
const logoLi = document.getElementById("logoLi");
const animacionesLi = document.getElementById("animacionesLi");
const personajesLi = document.getElementById("personajesLi");
const directoresLi = document.getElementById("directoresLi");
const locacionesLi = document.getElementById("locacionesLi");
const vehiculosLi = document.getElementById("vehiculosLi");
const principalContainer = document.getElementById("prin");
const galleryContainer = document.getElementById("galery");
const titleContainer = document.getElementById("titleContainer");
const filterContainer = document.getElementById("filterContainer");
const cantidadNumber = document.getElementById("cantidadNumber");
const alphabeticalOrder = document.getElementById("alphabeticalOrder");
const scoreOrder = document.getElementById("scoreOrder");
const yearOrder = document.getElementById("yearOrder");
const scoreLabel = document.getElementById("scoreLabel");
const yearLabel = document.getElementById("yearLabel");
const invertirOrden = document.getElementById("invertirOrden");
const currentSection = document.getElementById("currentSection");

//MOSTRAR PAGINA PRINCIPAL
function showPricipalPage() {
  principalContainer.innerHTML = "";
  principalContainer.appendChild(titleContainer);
  principalContainer.appendChild(galleryContainer);
}

//ACTUALIZAR SECCION ACTUAL

function updateCurrentSection(section) {
  currentSection.textContent = section;
}


//CREAR TARJETAS 
function createCard(item) {
  const card = document.createElement("section");
  card.className = "card";
  
  const title = document.createElement("p");
  title.className = "cardTitle";
  title.textContent = item.name || item.title;

  const content = document.createElement("section");
  content.className = "cardContent";
  
  const img = document.createElement("img");
  img.src = item.img || item.poster;
  
  content.appendChild(img);
  card.appendChild(title);
  card.appendChild(content);


  if (currentArray === filmsArray) {
    const score = document.createElement("p");
    score.className = "cardSubtitle";
    score.textContent = `Puntaje: ${item.score}`;
    card.appendChild(score);

    const year = document.createElement("p");
    year.className = "cardSubtitle";
    year.textContent = `Año: ${item.year}`;
    card.appendChild(year);
  } 

  //CLICK EN TARJETA
  card.addEventListener("click", () => {
    const clickedIndex = currentArray.indexOf(item);
    showFilmCard(clickedIndex);});
  return card;
}

//CREAR TARJETAS DE PELICULAS


function createFilmCards(index) {

  const film = filmsArray[index];

  const filmCard = document.createElement("section");
  filmCard.className = "filmCard";

  const filmCardContentPoster = document.createElement("section");
  filmCardContentPoster.className = "filmCardContent";
  const filmCardImage = document.createElement("img");
  filmCardImage.className = "filmCardImage";
  filmCardImage.src = film.poster;
  filmCardImage.alt = film.title;
  filmCardContentPoster.appendChild(filmCardImage);

  const filmCardContentInfo = document.createElement("section");
  filmCardContentInfo.className = "filmCardContent";
  const filmCardTitle = document.createElement("h2");
  filmCardTitle.className = "filmCardTitle";
  filmCardTitle.textContent = film.title;
  const filmCardDescription = document.createElement("h3");
  filmCardDescription.className = "filmCardSubtitle";
  filmCardDescription.textContent = film.description;
  const filmCardDirector = document.createElement("h3");
  filmCardDirector.className = "filmCardSubtitle";
  filmCardDirector.textContent = `Director: ${film.director}`;
  const filmCardProducer = document.createElement("h3");
  filmCardProducer.className = "filmCardSubtitle";
  filmCardProducer.textContent = `Productor: ${film.producer}`;
  const filmCardScore = document.createElement("h3");
  filmCardScore.className = "filmCardSubtitle";
  filmCardScore.textContent = `Puntaje: ${film.score}`;
  const filmCardYear = document.createElement("h3");
  filmCardYear.className = "filmCardSubtitle";
  filmCardYear.textContent = `Año: ${film.year}`;
  filmCardContentInfo.appendChild(filmCardTitle);
  filmCardContentInfo.appendChild(filmCardDescription);
  filmCardContentInfo.appendChild(filmCardDirector);
  filmCardContentInfo.appendChild(filmCardProducer);
  filmCardContentInfo.appendChild(filmCardScore);
  filmCardContentInfo.appendChild(filmCardYear);


  const filmCardContentList = document.createElement("section");
  filmCardContentList.className = "filmCardContent";

  const createList = (label, items, idExpect) => {
    const labelElement = document.createElement("label");
    labelElement.className = "labelFilmExtra";
    labelElement.htmlFor = idExpect;
    labelElement.innerHTML = `<span class="filmExtraSection">${label}</span>`;

    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = idExpect;
    inputElement.className = "inputFilm";

    const listElement = document.createElement("ul");
    listElement.className = "filmListExtra";

    items.forEach((item) => {
      const listItem = document.createElement("li");
      const linkItem = document.createElement("a");
      linkItem.className = "elementFilmExtra";
      linkItem.href = "#";
      linkItem.textContent = item;
      listElement.appendChild(listItem);
      listItem.appendChild(linkItem);
    });

    filmCardContentList.appendChild(labelElement);
    filmCardContentList.appendChild(inputElement);
    filmCardContentList.appendChild(listElement);
  };

  createList("PERSONAJES", film.people,'peopleList');
  createList("LOCACIONES", film.locations, 'locationsList');
  createList("VEHICULOS", film.vehicles, 'vehiclesList');



  filmCard.appendChild(filmCardContentPoster);
  filmCard.appendChild(filmCardContentInfo);
  filmCard.appendChild(filmCardContentList);

  return filmCard;

}

  
  

function showFilmCard(index) {
  const filmCard = createFilmCards(index); // Crear la tarjeta de película completa
  principalContainer.innerHTML = ""; // Limpiar el contenedor principal
  principalContainer.appendChild(filmCard); // Mostrar la tarjeta de película completa
}


//AGREGAR TARJETAS AL CONTENEDOR
function addCardsToContainer(array) {
  array.forEach((item) => {
    const card = createCard(item);
    principalContainer.appendChild(card);
  });
}

//CONTAR TARJETAS
function countCards(array) {
  cantidadNumber.textContent = array.length;
}

//MOSTRAR TARJETAS
function showCards(array) {
  principalContainer.innerHTML = "";
  principalContainer.appendChild(filterContainer);
  filterContainer.style.display = "inline-flex";
  currentArray = array;
  if (currentArray !== filmsArray) {
    scoreLabel.style.display = "none";
    yearLabel.style.display = "none";
  } else {
    scoreLabel.style.display = "flex";
    yearLabel.style.display = "flex";
  }
  addCardsToContainer(array);
  countCards(array);
}




//ORDENAR ALFABETICAMENTE
function orderAlphabetically() {
  if (currentArray === filmsArray) {
    currentArray.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else {
        return -1;
      }
    });
  } else {
    currentArray.sort((a, b) => {
      if (a.name> b.name) {
        return 1;
      } else {
        return -1;
      }
    });
  }
  principalContainer.innerHTML = "";
  principalContainer.appendChild(filterContainer);
  showCards(currentArray);
}

//ORDENAR POR PUNTAJE
function orderByScore() {
  currentArray = orderScore(filmsArray);
  principalContainer.innerHTML = "";
  principalContainer.appendChild(filterContainer);
  showCards(currentArray);
}

//ORDENAR POR AÑO
function orderByYear() {
  currentArray = orderYear(filmsArray);
  principalContainer.innerHTML = "";
  principalContainer.appendChild(filterContainer);
  showCards(currentArray);
}

//INVERTIR ORDEN
function inverseOrder() {
  currentArray.reverse();
  principalContainer.innerHTML = "";
  principalContainer.appendChild(filterContainer);
  showCards(currentArray);
}



//EVENTOS
logoLi.addEventListener("click", showPricipalPage);
animacionesLi.addEventListener("click", () => {
  updateCurrentSection('ANIMACIONES');
  showCards(filmsArray);});
personajesLi.addEventListener("click", () => {
  updateCurrentSection('PERSONAJES');
  showCards(peopleArray);});
directoresLi.addEventListener("click", () => {
  updateCurrentSection('DIRECTORES Y PRODUCTORES');
  showCards(directorsAndProducersArray);});
locacionesLi.addEventListener("click", () => {
  updateCurrentSection('LOCACIONES');
  showCards(locationsArray);});
vehiculosLi.addEventListener("click", () => {
  updateCurrentSection('VEHÍCULOS');
  showCards(vehiclesArray);});
alphabeticalOrder.addEventListener("click", orderAlphabetically);
invertirOrden.addEventListener("click", inverseOrder);
scoreOrder.addEventListener("click", orderByScore);
yearOrder.addEventListener("click", orderByYear);


