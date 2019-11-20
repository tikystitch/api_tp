var express = require('express');
var router = express.Router();

// Load the full build.
var _ = require('lodash');

const films = [{
    id: "0",
    movie: 'Wallah',
    yearOfRelease: 1998,
    duration: 230, // en minutes,
    actors: ['Louis', 'Samir'],
    poster: 'tata', // lien vers une image d'affiche,
    boxOffice: 12, // en USD$,
    rottenTomatoesScore: '4/5',
},
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
} ]; 


router.get('/', (req, res)=> {
    res.status(200).json({
        message: 'tout', 
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
        truc: truc
     });
});

/* PUT by id */ 
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

/* UPDATE movie */
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

/* DELETE movie */ 
router.delete('/:id', (req, res) => {

    const {id} = req.params; 

    //Remove from BDD
    _.remove(films, ["id", id]); 

    //return message
    res.json({
        message: `just removed ${id}`
    }); 
}); 

module.exports = router;
