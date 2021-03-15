const getMovieHtml = movie => {
    return  `
        <div class="movie" onclick="getMovieDetailed(${movie.id})">
            <h3>${movie.title}</h3>
            <img src="http://image.tmdb.org/t/p/w185${movie.poster_path}" alt="picture of the movie">
        </div>
    `
};

const getMovieDetailedHtml = movie => {
    return  `
        <div class="movie" onclick="getMovieDetailed(${movie.id})">
            <h3>${movie.title}</h3>
            <img src="http://image.tmdb.org/t/p/w300${movie.poster_path}" alt="picture of the movie">
            <br/>
            <span>Popularity: ${movie.popularity}</span>
            <p>Description: ${movie.overview}</p>
        </div>
    `
};

const renderMovies = movies => {
    document.querySelector('.movies').innerHTML = ''
    for (const movie of movies) {
        document.querySelector('main.movies').innerHTML += getMovieHtml(movie)
    }
};
const getMovieDetailed = movie_id => {
    axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US`)
    .then(res => {
        const movie = res.data;
    document.querySelector('main.movies').innerHTML = getMovieDetailedHtml(movie)
    })
    .catch(console.error)
}


//With axios
getLatestMovies = async () => {
    try {
       const res = await axios.get('https://api.themoviedb.org/3/movie/upcoming?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US');
       const movies = res.data.results;
        renderMovies(movies);
    } catch (error) {
        console.error(error);
    }
};


//With fetch
const getPopularMovies = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=79a61f5dc13e3e9e4834fadbf4f326c7&language=en-US')
    .then(res=>res.json()) //Here parseamos el dato
    .then(res=> {
        const movies = res.results;
        renderMovies(movies);
    })
    .catch(error0=> console.error(error))
}