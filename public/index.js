const baseURL = 'https://api.unsplash.com/search/photos?';
//
const key = 'Eo0LRdSjIA3ii1VZUzXXRsEK6P1h9Ha6G6i2p8qSNBU';
let url; 
const searchTerm = document.querySelector('.search'); 
const searchForm = document.querySelector('form'); 
const submitBtn = document.querySelector('.submit');
const colorTerm = document.querySelector('.color');
const container = document.querySelector('#test');
searchForm.addEventListener('submit', wallpapers);



async function wallpapers(e) {
    e.preventDefault();
    const search = searchTerm.value;
    const color = colorTerm.value;
    url = `${baseURL}query=${search}&color=${color}&client_id=${key}`;
    await fetch(url) 
    .then( async function (result) {
        let results = await result.json();
        console.log(results) 
        return results;
    })
    .then(function (json) {
        console.log(json);
       displayWallpaper(json);
    })
}

function displayWallpaper(json)   {

    //console.log('Display Results:', json);
    /* while (container.firstChild) { //debating just doing the little clear loop at the end?
        container.removeChild(container.firstChild);
    } */
    let wallpapers = json.results;


    if (wallpapers.length == 0) { 
        console.log('No results');
    } else { 
        for (let i = 0; i < wallpapers.length; i++) {
            let images = document.createElement('img');
            images.setAttribute('class', 'col-lg-4 col-md-6 mb-4'); 

            let current = wallpapers[i].urls.small;
            console.log(current);
            images.src = current;
            container.appendChild(images);

            searchForm.addEventListener('submit', () => {
                console.log('oh hi mark')
                container.removeChild(images);
                wallpapers();
            })
        }
    }

}
