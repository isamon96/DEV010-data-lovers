import ghibli from './data/ghibli/ghibli.js';
import {
  getFilms,
  getPeopleNameAndImg,
  getLocationsNameAndImg,
  getVehiclesNameAndImg,
  orderScore,
  orderYear,
  getDirectorProducerAverages,
} from './data.js';

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
  } else if (currentArray === directorsAndProducersArray) {
    const score = document.createElement("p");
    score.className = "cardSubtitle";
    score.textContent = `Puntaje promedio: ${item.averageRating}`;
    card.appendChild(score);
  }

  //CLICK EN TARJETA
  if (currentArray === filmsArray) {
    card.addEventListener("click", () => {
      const clickedIndex = currentArray.indexOf(item);
      showFilmCard(clickedIndex);});
  } 
  return card;
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
  if (currentArray === filmsArray) {
    scoreLabel.style.display = "flex";
    yearLabel.style.display = "flex";
  } else if (currentArray === directorsAndProducersArray) {
    scoreLabel.style.display = "flex";
    yearLabel.style.display = "none";
  }
  else {
    scoreLabel.style.display = "none";
    yearLabel.style.display = "none";
  }
  addCardsToContainer(array);
  countCards(array);
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
  filmCardContentList.id = "filmCardContentList";

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
    
    if (items.length === 0) {
      const listItem = document.createElement("li");
      listItem.className = "elementFilmExtra";
      listItem.textContent = "No hay elementos";
      listElement.appendChild(listItem);
    }

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

  const buttonsContainer = document.createElement("section");
  buttonsContainer.className = "containerBaby";
  buttonsContainer.id = "buttonsContainer";
  filmCardContentList.appendChild(buttonsContainer);

  const listButtons = document.createElement("ul");
  listButtons.id = "buttonsContainerUl";
  buttonsContainer.appendChild(listButtons);


  const anteriorButtonli = document.createElement("li");
  const siguienteButtonli = document.createElement("li");
  listButtons.appendChild(anteriorButtonli);
  listButtons.appendChild(siguienteButtonli);

  const anteriorButton = document.createElement("button");
  anteriorButton.className = "buttonFilmExtra";
  anteriorButton.textContent = "ANTERIOR";
  anteriorButton.id = "anteriorButton";
  anteriorButtonli.appendChild(anteriorButton);

  const siguienteButton = document.createElement("button");
  siguienteButton.className = "buttonFilmExtra";
  siguienteButton.textContent = "SIGUIENTE";
  siguienteButton.id = "siguienteButton";
  siguienteButtonli.appendChild(siguienteButton);

  const regresarButton = document.createElement("button");
  regresarButton.className = "buttonFilmExtra";
  regresarButton.textContent = "REGRESAR";
  regresarButton.id = "regresarButton";
  buttonsContainer.appendChild(regresarButton);

  regresarButton.addEventListener("click", () => {
    updateCurrentSection('ANIMACIONES');
    showCards(filmsArray);});

  filmCard.appendChild(filmCardContentPoster);
  filmCard.appendChild(filmCardContentInfo);
  filmCard.appendChild(filmCardContentList);
  
  //CLICK EN BOTON SIGUIENTE

  siguienteButton.addEventListener("click", () => {
    const currentIndex = currentArray.indexOf(film);
    showNextFilmCard(currentIndex);
  });

  //CLICK EN BOTON ANTERIOR

  anteriorButton.addEventListener("click", () => {
    const currentIndex = currentArray.indexOf(film);
    showPreviousFilmCard(currentIndex);
  });

  return filmCard;

}

//MOSTRAR TARJETA DE PELICULA
function showFilmCard(index) {
  const filmCard = createFilmCards(index);
  principalContainer.innerHTML = ""; 
  principalContainer.appendChild(filmCard); 
}

//MOSTRAR TARJETA SIGUIENTE
function showNextFilmCard(currentFilmIndex) {
  if (currentFilmIndex < currentArray.length - 1) {
    currentFilmIndex++;
  } else {
    currentFilmIndex = 0;
  }
  showFilmCard(currentFilmIndex);
}

//MOSTRAR TARJETA ANTERIOR
function showPreviousFilmCard(currentFilmIndex) {
  if (currentFilmIndex > 0) {
    currentFilmIndex--;
  } else {
    currentFilmIndex = currentArray.length - 1;
  }
  showFilmCard(currentFilmIndex);
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
  if (currentArray === filmsArray) {
    currentArray = orderScore(filmsArray, 'score');
  } else if (currentArray === directorsAndProducersArray){
    currentArray = orderScore(directorsAndProducersArray, 'averageRating');
  }
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


