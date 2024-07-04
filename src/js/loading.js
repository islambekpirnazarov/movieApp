export const cards = document.querySelectorAll('.cards')


export const loadingMovies = (loading) => {
    if(loading) {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
            cards.innerHTML += `
                <div class="card">
                    <div class="card-img"> 
                        <div>
                        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        </div
                    </div>
                    <div class="card-title"></div>
                    <div class="card-info">
                    <div class="card-rating">
                    </div>
                    <div class="card-year"></div>
                    </div>
                </div>
            `
        })
    }
    // else{
    //     cards.innerHTML = ''
    // }
}