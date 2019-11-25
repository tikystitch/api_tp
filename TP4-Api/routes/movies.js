var express = require('express');
var router = express.Router();

// Load the full build.
var _ = require('lodash');

const axios = require('axios');


const films = [{
    id: "0",
    movie: 'Wallah',
    yearOfRelease: 1998,
    duration: 230, // en minutes,
    actors: ['Louis', 'Samir'],
    poster: 'tata', // lien vers une image d'affiche,
    boxOffice: 12, // en USD$,
    rottenTomatoesScore: '4/5',
/*},
{
    id: "1",
    movie: 'Lea est Guiide Suprême ',
    yearOfRelease: 1998,
    duration: 230, // en minutes,
    actors: ['Lea', 'Samir'],
    poster: 'tata', // lien vers une image d'affiche,
    boxOffice: 12, // en USD$,
    rottenTomatoesScore: '4/5',
},
{
    id: "2",
    movie: 'Nugget',
    yearOfRelease: 1998,
    duration: 230, // en minutes,
    actors: ['nini', 'Louou'],
    poster: 'tata', // lien vers une image d'affiche,
    boxOffice: 12, // en USD$,
    rottenTomatoesScore: '4/5',
},
{
    id: "3",
    movie: 'Furube ',
    yearOfRelease: 1998,
    duration: 230, // en minutes,
    actors: ['Alexandre', 'Furubi'],
    poster: 'truc much', // lien vers une image d'affiche,
    boxOffice: 111, // en USD$,
    rottenTomatoesScore: '5/5',
*/
} ]; 


//Permet d'afficher toute la BDD 
router.get('/', (req, res)=> {
    res.status(200).json({
        films 
     });
}); 


//Permet de put un film de omdbapi dans la BDD
router.put('/', (req, res) => {
/* GET les datas de l'API */
const {name} = req.body;

    axios.get(
                `http://www.omdbapi.com/?t=${name}&apikey=b30c6c42` ).then(({data}) => {
                    // Get any response !!! pb 
                    //const data = response.data;
                    let id = _.uniqueId(); 
                    
                    let fromData= {
                        id: id,
                        titre: data.Title,
                        release: data.Released,
                        runtime:data.Runtime,
                        acteurs:data.Actors,
                        poster:data.Poster,
                        boxoffice: data.BoxOffice,
                        rate: data.Ratings[2].Value
                        
                    };
                    
                    films.push(fromData);
                    res.status(200).json({
                        films: films
                    });
                    });    
});

//Permete de modifier la BDD par une données de omdbapi
router.post('/:id', (req, res) => {
    const {name} = req.body;

        axios.get(
                    `http://www.omdbapi.com/?t=${name}&apikey=b30c6c42` ).then(({data}) => {
                        // Get any response !!! pb 
                        const {id} = req.params; 
                        //const data = response.data;
                        let unique = _.uniqueId(); 
                        
                        let fromData= {
                            id: unique,
                            titre: data.Title,
                            release: data.Released,
                            runtime:data.Runtime,
                            acteurs:data.Actors,
                            poster:data.Poster,
                            boxoffice: data.BoxOffice,
                            rate: data.Ratings[2].Value
                        };
                        
                        //Find in BDD
                        const userToUpdate = _.find(films, ["id", id]); 
                        //Permet de modifier la data (à modif selon usage)
                        userToUpdate.id = fromData.id;
                        userToUpdate.titre = fromData.titre;
                        userToUpdate.release = fromData.release;
                        userToUpdate.runtime = fromData.runtime;
                        userToUpdate.poster = fromData.poster;
                        userToUpdate.boxoffice = fromData.boxoffice;
                        userToUpdate.rate = fromData.rate;
                        
                        res.status(200).json({
                            message: `Just update ${id} with ${fromData}`,
                            films: films
                        });
                        });    
    });


/* GET by id. */
router.get('/:id', (req, res) => {
  
    //Get id in Param
    const {id} = req.params;
    //Find user in DB
    const truc = _.find(films, ["id", id]); 
    //Return user 
    res.status(200).json({
        message: 'Movie found', 
        movie:truc
     });
});

/*
router.put('/', (req, res) => {
    //Get data from request
    const {film} = this.movie;
    
    films.push({film});
    //Return message
    res.json({ 
        name: `${film}`,
        message: `Just added`,
    }); 
});
*/

/* PUT by id */ 
/*
router.put('/', (req, res) => {
    //Get data from request
    const {name} = req.body;
    //Create new unique id
    const id = _.uniqueId();
    //Insert it in array
    films.push({ name, id });
    //Return message
    res.json({ 
        name: `${name}`,
        message: `Just added ${id}`,
        films
    }); 
});
*/

/* UPDATE movie */
/*
router.post('/:id', (req, res) => {
    //Get id from url
    const {id} = req.params; 
    //get new data of movie we want to update
    const {movie} =req.body; 

    //Find in BDD
    const userToUpdate = _.find(films, ["id", id]); 
    //Update data with new data (js is by address)
    userToUpdate.movie = movie; 
    
    //Return message
    res.json({
        message: `Just update ${id} with ${movie}`
    }); 
}); 
*/


/* DELETE movie */ 
router.delete('/:id', (req, res) => {

    const {id} = req.params; 

    //Remove from BDD
    _.remove(films, ["id", id]); 

    //return message
    res.status(200).json({
        message: `just removed ${id}`,
        films
    }); 
}); 

module.exports = router;
