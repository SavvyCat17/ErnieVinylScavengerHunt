"use strict"

const apiKey = "c5be1569744291e7b9a825988daec85e";
const secret = "8b27459793a3b657cfcff8de38738fe3";
const baseURL = " http://ws.audioscrobbler.com/2.0/";

const getAlbumImage = async (artist, title) => {
    const method = "album.getinfo";
    const format = "json";
    const paramURL = `?method=${method}&api_key=${apiKey}&artist=${artist}&album=${title}&format=${format}`
    
    try {
	    const response = await fetch(baseURL + paramURL);
        const jsonResponse = await response.json();
        return jsonResponse.album.image[2]["#text"];
    } catch (error) {
        console.log(error.message);
        return null;
    }
}