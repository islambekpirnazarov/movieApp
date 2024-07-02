import '../css/style.css'
import { searchMovies } from './api'
import { searchMoviesDefault } from './api'
import { idDetail } from '.'
window.idDetail = idDetail

const formSearch = document.querySelector('#formSearch')

const cardsSearch = document.querySelector('#cards-search')
searchMoviesDefault()
        .then(data => renderSearchMovies(data.results))
        .catch(err => err.message)


formSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = e.target.inputSearch.value
    if(value.trim().length > 1) {
        searchMovies(value)
        .then(data => renderSearchMovies(data.results))
        .catch(err => err.message)
    }
})


function renderSearchMovies(array) {
    if(array && array.length > 0) {
        cardsSearch.innerHTML = ''
        array.map(item => {
            item.title.length > 16 ? item.title = item.title.slice(0, 15) + "..." : item.title
            cardsSearch.innerHTML += `
            
            <a href="../detail/detail.html" class="card card-genre" onclick="idDetail(${item.id})">
                <div class="card-img">
                    <img src="https://www.themoviedb.org/t/p/w500/${item.poster_path}" alt="">
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-info">
                    <div class="card-rating">
                    <img src="../src/images/star.png" alt="">
                    ${item.vote_average.toFixed(1)}
                </div>
                <div class="card-year">${item.release_date.slice(0,4)}</div>
                </div>
            </a>
            
            `
        })
    }
}