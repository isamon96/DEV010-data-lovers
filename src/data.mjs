//import ghibli from './data/ghibli/ghibli.mjs';

const getFilms = (obj) => {
  const array = obj.films.map((film) => {
    const peopleNames = film.people.map((person) => person.name);
    const locationsNames = film.locations.map((location) => location.name);
    const vehiclesNames = film.vehicles.map((vehicle) => vehicle.name);
    return {
      title: film.title,
      description: film.description,
      director: film.director,
      producer: film.producer,
      poster: film.poster,
      score: film.rt_score,
      year: film.release_date,
      i_d: film.id,
      people: peopleNames,
      locations: locationsNames,
      vehicles: vehiclesNames,
    };
  });
  return array;
};


function getDirectorProducerAverages(data) {
  const directorProducerMap = {};

  data.films.forEach((film) => {
    const director = film.director;
    const producer = film.producer;
    const rating = parseInt(film.rt_score);

    if (director in directorProducerMap) {
      directorProducerMap[director].films.push(film);
      directorProducerMap[director].totalRating += rating;
    } else {
      directorProducerMap[director] = {
        name: director,
        films: [film],
        totalRating: rating,
      };
    }

    if (producer in directorProducerMap) {
      directorProducerMap[producer].films.push(film);
      directorProducerMap[producer].totalRating += rating;
    } else {
      directorProducerMap[producer] = {
        name: producer,
        films: [film],
        totalRating: rating,
      };
    }
  });

  const averages = [];

  for (const key in directorProducerMap) {
    const { name, films, totalRating } = directorProducerMap[key];
    const averageRating = parseInt((totalRating / films.length)); 

    const theirFilms = films.map((film) => film.title);

    averages.push({ name, averageRating, theirFilms });
  }

  return averages;
}


const getPeopleNameAndImg = (obj) => {
  const array = obj.films.map((film) =>
    film.people.map((person) => {
      return {
        name: person.name,
        img: person.img,
        gender: person.gender,
        age: person.age,
        eye_color: person.eye_color,
        hair_color: person.hair_color,
        specie: person.specie,
      };
    })
  );
  return array.reduce((flatArray, subArray) => flatArray.concat(subArray), []);
};


const getLocationsNameAndImg = (obj) => {
  const array = obj.films.map((film) =>
    film.locations.map((location) => {
      return {
        name: location.name,
        img: location.img,
        climate: location.climate,
        terrain: location.terrain,
        surface_water: location.surface_water,
      };
    })
  );
  return array.reduce((flatArray, subArray) => flatArray.concat(subArray), []);
};

const getVehiclesNameAndImg = (obj) => {
  const array = obj.films.map((film) =>
    film.vehicles.map((vehicle) => {
      return {
        name: vehicle.name,
        img: vehicle.img,
        description: vehicle.description,
        vehicle_class: vehicle.vehicle_class,
        length: vehicle.length,
      };
    })
  );
  return array.reduce((flatArray, subArray) => flatArray.concat(subArray), []);
};


const orderAlphabetically = (array) => {
  const newArray = array.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 0;
    }});
  return newArray;
};

const orderScore = (array) => {
  const newArray = array.sort((a, b) => b.score - a.score);
  return newArray;
};

const orderYear = (array) => {
  const newArray = array.sort((a, b) => b.year - a.year);
  return newArray;
};



   
export {
  getFilms,
  getPeopleNameAndImg,
  getLocationsNameAndImg,
  getVehiclesNameAndImg,
  orderAlphabetically, 
  orderScore,
  orderYear,
  getDirectorProducerAverages,
};