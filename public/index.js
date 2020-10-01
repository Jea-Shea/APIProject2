const baseURL = 'https://api.unsplash.com/search/photos?';
//
const key = 'Eo0LRdSjIA3ii1VZUzXXRsEK6P1h9Ha6G6i2p8qSNBU';
let url; 
const searchTerm = document.querySelector('.search'); 
const searchForm = document.querySelector('form'); 
const submitBtn = document.querySelector('.submit');
const colorTerm = document.querySelector('.color');
const container = document.querySelector('#container');
const body = document.querySelector('body');
searchForm.addEventListener('submit', wallpapers);



async function wallpapers(e) {
    e.preventDefault();
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const search = searchTerm.value;
    const color = colorTerm.value;                 //customized results
    url = `${baseURL}query=${search}&color=${color}&per_page=30&orientation=landscape&client_id=${key}`;
    await fetch(url)  //left on await for additional function
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

    let wallpapers = json.results;


    if (wallpapers.length == 0) { 
        console.log('No results');
    } else { 
        for (let i = 0; i < wallpapers.length; i++) {
            //some users tag their images wrong so they pop up like ads
            if (wallpapers[i].user.username == 'boxedwater' || wallpapers[i].user.username == "windows") continue; //continue operates like a "skip"
            let link = document.createElement('a');
            link.setAttribute('href', '')
            link.href = wallpapers[i].links.download; //need to assign link to each result
            container.appendChild(link);




            let images = document.createElement('img');
            let current = wallpapers[i].urls.small; //then grab the images themselves
            console.log(current);
            images.src = current;
            body.style.marginTop = '5em';
            link.appendChild(images);
            images.setAttribute('class', 'col-lg-4 col-md-6 mb-4'); 


        }
    }

}

/* submitBtn.addEventListener('click', () => {
    //consider adding a while loop from NYT to remove

    displayWallpaper();
})


  while (container.firstChild) {
    container.removeChild(container.firstChild);
} */