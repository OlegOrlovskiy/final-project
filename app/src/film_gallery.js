let sortFilmsBy = 'popularity.desc';
const sortFilms = document.querySelector('#sort-film');
const filmList = document.querySelector('.content__list');

const imgPath = "https://image.tmdb.org/t/p/w500";
let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=8a54ea2542532ca8dab51c8cb31f897d&language=en-US&sort_by=${sortFilmsBy}&include_adult=false&include_video=false&page=`;

sortFilms.onchange = function() {
  sortFilmsBy = this.value;
  apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=8a54ea2542532ca8dab51c8cb31f897d&language=en-US&sort_by=${sortFilmsBy}&include_adult=false&include_video=false&page=`;
  showFilms(apiUrl);
};


showFilms(apiUrl);
function showFilms(url){
    fetch(url).then(res => res.json())
    .then(function(data){
    filmList.innerHTML = '';
    data.results.forEach(element => {
        const el = document.createElement('li');
        const rating = element.vote_average;
        const releaseDate = element.release_date;
        let filmImgPath;        
        const filmTitle = element.title;

        if (element.poster_path === null) {
          filmImgPath = '/img/noimage.jpg';
        } else {
          filmImgPath = imgPath + element.poster_path;
        }

        el.classList.add('film-item');
        el.innerHTML = `
          <div class="film__short-info">
            <span class="film__date">Date: <span>${releaseDate}</span></span>
            <span class="film__rating">Rating: <span>${rating}</span></span>
          </div>
          <a href="#" class="film__link">
            <img src="${filmImgPath}" class="film__img" alt="The preview poster for film '${filmTitle}'">
          </a>          
          <h2 class="film__title">${filmTitle}</h2>          
        `;
        
        filmList.appendChild(el);
    }); 
});
}




const pageNumbers = (total, max, current) => {
  const half = Math.floor(max / 2);
  let to = max;
  
  if(current + half >= total) {
    to = total;
  } else if(current > half) {
    to = current + half ;
  }
  
  let from = to - max;

  return Array.from({length: max}, (_, i) => (i + 1) + from);
}

function PaginationButton(totalPages, maxPagesVisible = 10, currentPage = 1) {
  let pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
  let currentPageBtn = null;
  const buttons = new Map();
  const disabled = {
    start: () => pages[0] === 1,
    prev: () => currentPage === 1,
    end: () => pages.slice(-1)[0] === totalPages,
    next: () => currentPage === totalPages
  }
  const frag = document.createDocumentFragment();
  const paginationButtonContainer = document.createElement('div');
  paginationButtonContainer.className = 'pagination-buttons';
  
  const createAndSetupButton = (label = '', cls = '', disabled = false, handleClick) => {
    const buttonElement = document.createElement('button');
    buttonElement.textContent = label;
    buttonElement.className = `page-btn ${cls}`;
    buttonElement.disabled = disabled;
    buttonElement.addEventListener('click', e => {
      handleClick(e);
      this.update();
      paginationButtonContainer.value = currentPage;

      showFilms(apiUrl+paginationButtonContainer.value);



      paginationButtonContainer.dispatchEvent(new Event('change'));
    });
    
    return buttonElement;
  }
  
  const onPageButtonClick = e => currentPage = Number(e.currentTarget.textContent);
  
  const onPageButtonUpdate = index => (btn) => {
    btn.textContent = pages[index];
    
    if(pages[index] === currentPage) {
      currentPageBtn.classList.remove('active');
      btn.classList.add('active');
      currentPageBtn = btn;
      currentPageBtn.focus();
    }
  };
  
  buttons.set(
    createAndSetupButton('first', 'start-page', disabled.start(), () => currentPage = 1),
    (btn) => btn.disabled = disabled.start()
  )
  
  buttons.set(
    createAndSetupButton('prev', 'prev-page', disabled.prev(), () => currentPage -= 1),
    (btn) => btn.disabled = disabled.prev()
  )
  
  pages.map((pageNumber, index) => {
    const isCurrentPage = currentPage === pageNumber;
    const button = createAndSetupButton(
      pageNumber, isCurrentPage ? 'active' : '', false, onPageButtonClick
    );
    
    if(isCurrentPage) {
      currentPageBtn = button;
    }
    
    buttons.set(button, onPageButtonUpdate(index));
  });
  
  buttons.set(
    createAndSetupButton('next', 'next-page', disabled.next(), () => currentPage += 1),
    (btn) => btn.disabled = disabled.next()
  )
  
  buttons.set(
    createAndSetupButton('last', 'end-page', disabled.end(), () => currentPage = totalPages),
    (btn) => btn.disabled = disabled.end()
  )
  
  buttons.forEach((_, btn) => frag.appendChild(btn));
  paginationButtonContainer.appendChild(frag);
  
  this.render = (container = document.body) => {
    container.appendChild(paginationButtonContainer);
  }
  
  this.update = (newPageNumber = currentPage) => {
    currentPage = newPageNumber;
    pages = pageNumbers(totalPages, maxPagesVisible, currentPage);
    buttons.forEach((updateButton, btn) => updateButton(btn));
  }
  
  this.onChange = (handler) => {
    paginationButtonContainer.addEventListener('change', handler);
  }
}

const paginationButtons = new PaginationButton(10, 5);

paginationButtons.render();