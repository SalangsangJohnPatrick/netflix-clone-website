const sliders = document.querySelector(".carousel-box"); 
var scrollPerClick; 
var imagePadding = 20; 

showMovieData(); 

var scrollAmount = 0;

function sliderLeft() {
    sliders.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });

    if(scrollAmount < 0) {
        scrollAmount = 0;
    }
}

function sliderRight() {
    if(scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
        sliders.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth",
        })
    }
}

async function showMovieData() { 
    const api_key = "a42a5b3385f09b1faaee0c1c7eba6c02"; 
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`
        ); 

        const results = response.data.results;
        if (results && Array.isArray(results)) {
            results.forEach((cur, index) => { 
                if (cur.poster_path) {
                    sliders.insertAdjacentHTML( 
                        "beforeend",
                        `<img class="img-${index} slider-img" src="https://image.tmdb.org/t/p/w185/${cur.poster_path}" />`
                    ); 
                }
            }); 

            const firstImage = document.querySelector(".slider-img");
            if (firstImage) {
                scrollPerClick = firstImage.clientWidth + imagePadding; 
            }
        } else {
            console.error("No results found or invalid data structure");
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
    }
}