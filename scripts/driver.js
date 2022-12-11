"use strict"

let usedAlbums = [];

const getRandomArrayIndex = arr => {
    return Math.floor(Math.random() * arr.length);
}

const getImage = async album => {
    
    if (!album.hasOwnProperty("img")) {
        album.img = await getAlbumImage(album.Artist, album.Title);
        
    }
}

    

const displayAlbums = () => {
    const displayCount = document.querySelector("#alb-count");
    const albumDisplay = document.querySelector("#alb-container");

    albumDisplay.innerHTML = "";

    if (albumBackLog.length < displayCount.value) {
        albumBackLog.push(...usedAlbums.slice());
        usedAlbums = [];
    }

    for (let i = 0; i < displayCount.value; i++) {
        const selectedAlbum = albumBackLog.splice(getRandomArrayIndex(albumBackLog), 1)[0];        
        getImage(selectedAlbum).then(() => {
            usedAlbums.push(selectedAlbum);
            albumDisplay.innerHTML += 
            `<figure>
                <img src="${selectedAlbum.img} alt="${selectedAlbum.Title} - ${selectedAlbum.Artist}">
                <p>${selectedAlbum.Title}</p>
                <p>${selectedAlbum.Artist}</p>
                <p>${selectedAlbum.Genre}</p>
                <p>${selectedAlbum.Decade}</p>
            </figure>`;
        });                        	    
    }

}

window.addEventListener("load", () => {
    const displayCount = document.querySelector("#alb-count");
    const displayBtn = document.querySelector("#show");

    for (let i = 1; i <= 5; i++) {
        displayCount.innerHTML += `<option value=${i}>${i}</option>`;
    }

    displayBtn.addEventListener("click", displayAlbums);

});