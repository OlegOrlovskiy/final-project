const apiUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=8a54ea2542532ca8dab51c8cb31f897d&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
const IMGPATH = "https://image.tmdb.org/t/p/w500";

const list = document.querySelector('.content__list');

showMovies(apiUrl);
function showMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    console.log(data.results);
    data.results.forEach(element => {
        const el = document.createElement('li');
        const rating = element.vote_average;
        const releaseDate = element.release_date;
        const filmImgPath = IMGPATH + element.poster_path;
        const filmTitle = element.title;

        el.classList.add('film-item');
        el.innerHTML = `
          <div class="film__short-info">
            <span class="film__date">Date: <span>${releaseDate}</span></span>
            <span class="film__rating">Rating: <span>${rating}</span></span>
          </div>
          <a href="#" class="film__link">
            <img src="${filmImgPath}" class="film__img">
            <h2 class="film__title">${filmTitle}</h2>
          </a>          
        `;
        
        list.appendChild(el);
    }); 
});
}