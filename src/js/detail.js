import '../css/style.css'
import { idDetail } from '.';
window.idDetail = idDetail

const API_KEY = 'ec7d635fb241ea396c8c339ce5e776b2';
const base_url = 'https://api.themoviedb.org/3';

const movieIdData = document.querySelector('#movie-id-data')
const credits = document.querySelector('#credits')
const similarMovies = document.querySelector('#similar-movie')

const movieId = localStorage.getItem('id')
console.log(movieId);

const requestMovieId = async() => {
    const url = `${base_url}/movie/${movieId}?api_key=${API_KEY}`
    const request = await fetch(url)
    const data = request.json()
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    return data
}
requestMovieId().then(data  => renderMovieId(data)).catch(err => console.log(err.message))

const requestMovieData = async(fullData) => {
    const url = `${base_url}/movie/${movieId}/${fullData}?api_key=${API_KEY}`
    const request = await fetch(url)
    const data = request.json()
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    return data
}

requestMovieData('credits').then(data => renderCreditsData(data)).catch(err => err.message)

requestMovieData('similar').then(data => renderSimilar(data.results)).catch(err => err.message)

// REQUEST TRAILER VIDEOS
const requestTrailerVideos = async() => {
    const url = `${base_url}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`

    const request = await fetch(url)
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()

    return data

}
requestTrailerVideos().then(data => renderVideos(data.results))

function renderMovieId(object) {
    if(object) {
        movieIdData.innerHTML = ''
        movieIdData.innerHTML = `
        
        <div class="detail-img">
            <img src="https://www.themoviedb.org/t/p/w500/${object.poster_path || object.backdrop_path}" alt="">
        </div>
        <div class="detail-content">
            <div class="detail-title">${object.title}</div>
            <div class="detail-info">
            <div class="detail-rating">
                <img src="src/images/star.png" alt="">
                ${object.vote_average.toFixed(1)}
            </div>
          <div class="detail-continuity">${object.runtime}min</div>
          <div class="detail-date">${object.release_date.slice(0,4)}</div>
        </div>
        <div class="detail-genres">${object.genres.map(item => item.name)}</div>
        <div class="detail-desc">
          ${object.overview}
        </div>
      </div>
        
        `
    }
}

function renderCreditsData(object) {
    credits.innerHTML = ''
    object.cast.length > 10 ? object.cast = object.cast.slice(0, 10) : object.cast
    credits.innerHTML = `
    <div class="detail-actors">
    <div class="detail-starring">Starring</div>
    <div class="detail-starring__name">${object.cast.map(item => item.name)}
    </div>
    </div>
    <div class="detail-director">
        Directed By
    <div class="detail-directer__name">${object.crew[0].name}</div>
    </div>
    
    `
}

function renderSimilar(array) {
    if(array) {
        similarMovies.innerHTML = ''
        array.map(item => {
            item.title.length > 16 ? item.title = item.title.slice(0,16) + "..." : item.title
            similarMovies.innerHTML += `
            <a href="./detail.html" class="card" onclick="idDetail(${item.id})">
                <div class="card-img">
                <img src="https://www.themoviedb.org/t/p/w500/${item.poster_path || item.backdrop_path}" alt="">
                </div>
                <div class="card-title">${item.title}</div>
                <div class="card-info">
                <div class="card-rating">
                    <img src="src/images/star.png" alt="">
                    ${item.vote_average.toFixed(1)}
                </div>
                <div class="card-year">${item.release_date.slice(0,4)}</div>
                </div>
            </a>
            
            `
        })
    }
}

const clips = document.querySelector('#clips')
function renderVideos(array) {
    if(array) {
        clips.innerHTML = ''
        array.map(item => {
            clips.innerHTML += `
             <div>
              <iframe src="https://www.youtube.com/embed/${item.key}" frameborder="0" width="400" height="254"></iframe>
            </div> 
            
            `
        })
    }
}