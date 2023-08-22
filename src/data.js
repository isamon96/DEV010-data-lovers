const getFilms = (obj) => {
  //getFilms recibe un objeto con la propiedad films y devuelve un array de objetos con las porpiedades que queremos mostrar.
  //.map toma cada elemento del array y lo transforma en un objeto con las propiedades que queremos mostrar.
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

function getDirectorProducerAverages(obj) {
  const directorProducerMap = {};

  obj.films.forEach((film) => {
    const director = film.director;
    const producer = film.producer;
    const rating = parseInt(film.rt_score);

    if (!(director in directorProducerMap)) {
      //Utilizar in para comprobar si una propiedad existe en un objeto.
      directorProducerMap[director] = {
        name: director,
        films: [film],
        totalRating: rating,
      };
    } else {
      directorProducerMap[director].films.push(film);
      directorProducerMap[director].totalRating += rating;
    }

    if (!(producer in directorProducerMap)) {
      directorProducerMap[producer] = {
        name: producer,
        films: [film],
        totalRating: rating,
      };
    } else {
      directorProducerMap[producer].films.push(film);
      directorProducerMap[producer].totalRating += rating;
    }
  });

  const averages = [];

  for (const key in directorProducerMap) {
    const { name, films, totalRating } = directorProducerMap[key]; //Destructurar un objeto.
    const averageRating = parseInt(totalRating / films.length);
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
  return array.reduce((flatArray, subArray) => flatArray.concat(subArray), []); //Concatenar arrays.
  //flatArray es el array vacío que se va a ir llenando con los elementos de subArray.
  //subArray es el array que se va a ir concatenando a flatArray.
  //reduce itera y retorna un único valor.
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

const orderScore = (array, property) => {
  //Ordena de mayor a menor
  const newArray = array.sort((a, b) => b[property] - a[property]); //Si el valor es positivo, b va antes que a. Si es negativo, a va antes que b. Si es 0, no se mueve.
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
  orderScore,
  orderYear,
  getDirectorProducerAverages,
};
