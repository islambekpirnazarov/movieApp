import '../css/style.css'
import { requestMoviesTheBest } from './api'
import { requestTrendingMovies } from './api'

window.idDetail = idDetail
const bannerSliderItems = document.querySelector('#banner-slider__items')

const topRatedCards = document.querySelector('#top-rated-cards')
const popularCards = document.querySelector('#popular-cards')
const upcomingCards = document.querySelector('#upcoming-cards')
// THIS WEEK TRENDING MOVIES
requestTrendingMovies()
    .then(data => renderTrendingMovies(data.results))
    .catch(err => console.log(err.message))
// TOP RATED MOVIES
requestMoviesTheBest('top_rated')
.then(data => renderTheBestMovies(data.results, topRatedCards))
.catch(err => console.log(err.message))

// THIS WEEK POPULAR MOVIES
requestMoviesTheBest('popular')
    .then(data => renderTheBestMovies(data.results, popularCards))
    .catch(err => err.message)

// UPCOMING MOVIES
requestMoviesTheBest('upcoming')
    .then(data => renderTheBestMovies(data.results, upcomingCards))
    .catch(err => console.log(err.message))





// RENDER MOVIES
function renderTheBestMovies(array, cards) {
    if(array) {
        cards.innerHTML = ''
        array.forEach(item => {
            item.title.length > 16 ? item.title = item.title.slice(0, 15) + "..." : item.title
            cards.innerHTML += `
                <a href="detail/detail.html" class="card" onclick='idDetail(${item.id})'">
                    <div class="card-img">
                    <img src="https://www.themoviedb.org/t/p/w342/${item.poster_path || item.backdrop_path}" alt="">
                    </div>
                    <div class="card-title">${item.title}</div>
                    <div class="card-info">
                    <div class="card-rating">
                        <i class='bx bxs-star' class="star" ></i>
                        ${item.vote_average.toFixed(1)}
                    </div>
                    <div class="card-year">${item.release_date.slice(0,4)}</div>
                    </div>
                </a>
            `
            
            
        })
    }
    
}
export function idDetail(id) {
    localStorage.setItem('id', id)
}

function renderTrendingMovies(array) {
    if(array && array.length > 0) {
        bannerSliderItems.innerHTML = ''
        array.forEach(item => {
            item.overview.length > 200 ? item.overview = item.overview.slice(0, 200) + "..." : item.overview
            bannerSliderItems.innerHTML += `
                <div class="swiper-slide banner-slider__item" style="background-image : url(https://www.themoviedb.org/t/p/w1280/${item.backdrop_path})">
                    <div class="slider-item__title">${item.title}</div>
                    <div class="slider-item__info">
                        <div class="slider-item__year">${item.release_date.slice(0,4)}</div>
                        <div class="slider-item__rating">${item.vote_average.toFixed(1)}</div>
                    </div>
                    
                    <div class="slider-item__desc">${item.overview}</div>
                    <div>
                        <a href="detail/detail.html" class="btn btn-solid" onclick="idDetail(${item.id})">
                            <i class='bx bx-play-circle'></i>
                            Watch Now
                        </a>
                    </div>
                </div> 
            `
        })
    }
}




