const API_KEY = 'ec7d635fb241ea396c8c339ce5e776b2';
const base_url = 'https://api.themoviedb.org/3';

import { loadingMovies } from "./loading";


// REQUEST BEST MOVIES
export const requestMoviesTheBest = async (theBestMovies) => {
    loadingMovies(true)
    const url = `${base_url}/movie/${theBestMovies}?api_key=${API_KEY}`
    const request = await fetch(url);
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    loadingMovies(false)
    return data
}

export const requestTrendingMovies = async () => {
    
    const url = `${base_url}/trending/movie/week?api_key=${API_KEY}`
    const request = await fetch(url);
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    return data
}

// GENRES REQUEST

export const genresMovies = async (genreId, page) => {
    
    const url = `${base_url}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    const request = await fetch(url)
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    return data
}

// REQUEST TVSHOWS 
export const tvShows = async (tv) =>{
    loadingMovies(true)
    const url = `${base_url}/tv/${tv}?api_key=${API_KEY}&language=en-US`
    const request = await fetch(url)

    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    loadingMovies(false)
    return data
}

// REQUEST SEARCH MOVIES

export const searchMovies = async (value) => {
    
    const url = `${base_url}/search/movie?api_key=${API_KEY}&query=${value}`
    const request = await fetch(url)
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    
    return data
}

export const searchMoviesDefault = async () => {

    const url = `${base_url}/discover/movie?api_key=${API_KEY}`
    const request = await fetch(url)
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    return data
}

// REQUEST GENRES LIST

export const requestGenresList = async() => {
    const url = `${base_url}/genre/movie/list?api_key=${API_KEY}`
    const request = await fetch(url) 
    if(!request.ok) {
        throw new Error(`Error ${request.status}`)
    }
    const data = await request.json()
    return data
}