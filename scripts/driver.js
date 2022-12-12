"use strict"

let usedAlbums = [];

const getRandomArrayIndex = arr => {
    return Math.floor(Math.random() * arr.length);
}



const getValidFileName = s => {
    const bad_chars = ['<','>',':','\"','/','\\','|','?','*'];
    return s.split("").filter(c => bad_chars.indexOf(c) === -1).join("");
}    

const getImage = album => {
    
    if (!album.hasOwnProperty("img")) {
        album.img = `./images/${getValidFileName(album.Artist + "-" + album.Title)}.jpg`;        
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
        getImage(selectedAlbum)
        usedAlbums.push(selectedAlbum);
        albumDisplay.innerHTML += 
        `<figure>
            <img src="${selectedAlbum.img}" alt="${selectedAlbum.Title} - ${selectedAlbum.Artist}">
            <p>${selectedAlbum.Title}</p>
            <p>${selectedAlbum.Artist}</p>
            <p>${selectedAlbum.Genre}</p>
            <p>${selectedAlbum.Decade}</p>
        </figure>`;                        	    
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
