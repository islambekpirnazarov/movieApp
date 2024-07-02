import '../css/style.css'
import { genresMovies } from './api'
import { idDetail } from '.'
import { requestGenresList } from './api'
window.idDetail = idDetail
window.cardGenresClick = cardGenresClick
const genresList = document.querySelector('#genres-list')
const cardsGenres = document.querySelector('#cards-genres')

requestGenresList().then(data => renderGenresList(data.genres)).catch(err => err.message)

const loadMore = document.querySelector('#load-more')

let currentPage = 1;
genresMovies('28', currentPage)
  .then(data => renderCardsGenres(data.results))
  .catch(err => console.log(err.message))


function renderCardsGenres(array) {
  if (array) {
    array.map(item => {
      item.title.length > 16 ? item.title = item.title.slice(0, 15) + "..." : item.title
      cardsGenres.innerHTML += `
            
            <a href="../detail/detail.html" class="card card-genre" onclick="idDetail(${item.id})">
                <div class="card-img">
                    <img src="https://www.themoviedb.org/t/p/w500/${item.poster_path || item.backdrop_path}" alt="">
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-info">
                    <div class="card-rating">
                    <img src="../src/images/star.png" alt="">
                    ${item.vote_average.toFixed(1)}
                </div>
                <div class="card-year">${item.release_date.slice(0, 4)}</div>
                </div>
            </a>
            
            `
    })
  }
}

function renderGenresList(array) {
  if (array) {
    genresList.innerHTML = ''
    array.map(item => {
      genresList.innerHTML += `
        <li class="genre" onclick="cardGenresClick(${item.id})">${item.name}</li>
      `
    })
  }
}
let itemId = 28;
function cardGenresClick(id) {
  const genre = document.querySelector('.genre')
  genre.classList.add('active')
  cardsGenres.innerHTML = ''
  currentPage = 1;
  itemId = id
  genresMovies(id, currentPage)
    .then(data => renderCardsGenres(data.results))
    .catch(err => console.log(err.message))
  
}
loadMore.addEventListener('click', () => {
  currentPage++;
  genresMovies(itemId, currentPage)
    .then(data => renderCardsGenres(data.results))
    .catch(err => console.log(err.message))
})

