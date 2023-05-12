const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    let url = 'https://api.themoviedb.org/3/movie/550898?api_key=06ecdb2da1f423bb0cc12e1add4173d3';
    axios.get(url)
    .then((response) => {
        let data = response.data;
        let releaseDate = new Date(data.release_date).getFullYear();

        let genreToDisplay = '';
        data.genres.forEach(genre => {
            genreToDisplay = genreToDisplay + `${genre.name}, `;
        });
        let genresUpdated = genreToDisplay.slice(0, -2) + '.';
        let posterUrl = `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.poster_path}`;


        let currentYear = new Date().getFullYear();

        res.render('index', {
            dataToRender: data, 
            year: currentYear,
            releaseYear: releaseDate,
            genres: genresUpdated,
            poster: posterUrl
        });
    });

});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});
