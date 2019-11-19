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
    id: "1",
    movie: 'Lea est Guiide Suprême ',
    yearOfRelease: 1998,
    duration: 230, // en minutes,
    actors: ['Lea', 'Samir'],
    poster: 'tata', // lien vers une image d'affiche,
    boxOffice: 12, // en USD$,
    rottenTomatoesScore: '4/5',
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

module.exports = router;
