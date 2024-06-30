import '../css/style.css'

import { tvShows } from './api'
import { idDetail } from '.'
window.idDetail = idDetail


const airingTodayCards = document.querySelector('#airing-today-cards')
const onTheAirCards = document.querySelector('#on-air-cards')
const popularTvCards = document.querySelector('#popular-tv-cards')
const topRatedTvCards = document.querySelector('#top-rated-tv-cards')
tvShows('airing_today')
    .then(data => renderTvshows(data.results, airingTodayCards))
    .catch(err => console.log(err.message))

tvShows('on_the_air')
    .then(data => renderTvshows(data.results, onTheAirCards))
    .catch(err => console.log(err.message))

tvShows('popular')
    .then(data => renderTvshows(data.results, popularTvCards))
    .catch(err => console.log(err.message))

tvShows('top_rated')
    .then(data => renderTvshows(data.results, topRatedTvCards))
    .catch(err => console.log(err.message))


function renderTvshows(array, cards) {
    if(array) {
        cards.innerHTML = ''
        array.forEach(item => {
            item.name.length > 16 ? item.name = item.name.slice(0, 15) + "..." : item.title
            cards.innerHTML += `
                <div class="card" onclick="idDetail(${item.id})">
                    <div class="card-img">
                    <img src="https://www.themoviedb.org/t/p/w500/${item.poster_path || item.backdrop_path}" alt="">
                    </div>
                    <div class="card-title">${item.name}</div>
                    <div class="card-info">
                    <div class="card-rating">
                        <img src="../images/star.png" alt="">
                        ${item.vote_average.toFixed(1)}
                    </div>
                    <div class="card-year">${item.first_air_date.slice(0,4)}</div>
                    </div>
                </div>
            `
            
        })
    }
}