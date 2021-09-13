const music_list = [{
    title: "_Kaise_Mujhe__Ghajini_",
    artist: "A.R._Rahman",
    Image: "jacinto-1"
}, {
    title: "_Musafir_Song_",
    artist: "Palash_Muchhal",
    Image: "jacinto-2"
}, {
    title: "_Tum_Hi_Aana_(Sad_Version)_",
    artist: "Jubin_Nautiyal",
    Image: "jacinto-3"
}, {
    title: "_tumi_chole_geco_onek_dure",
    artist: "Unknown",
    Image: "metric-1"
}]



// get the audio element
const audioElement = document.querySelector('#main-audio');
const playButton = document.querySelector("#play")
const image = document.getElementById("image")
const title = document.getElementById("title")
const artist = document.getElementById("artist")
const prevButton = document.getElementById("prev")
const nextButton = document.getElementById("next")
const currenttime = document.getElementById("current-time")
const duration = document.getElementById("duration")
const progress = document.getElementById("progress")
const progresscontainer = document.getElementById("progress-container")
const repeatButton = document.getElementById("repeat-plist")
// set some variable
let isplaying = false
let songIndex = 1
let repeateActive = false
// play song function


function currentTime() {
    // avoiding the NaN problem
    if (audioElement.duration) {
        let formattedcrntTime = `${Math.floor(audioElement.currentTime / 60)} : ${Math.floor(audioElement.currentTime % 60)} `
        let formattedDrtn = `${Math.floor(audioElement.duration / 60)} : ${Math.floor(audioElement.duration % 60)} `
        currenttime.innerText = formattedcrntTime
        duration.innerText = formattedDrtn
        progress.style.width = `${audioElement.currentTime / audioElement.duration * 100}%`
    }
}
// adding event to audio  
audioElement.addEventListener("timeupdate", currentTime)


// // setting title,artist,song source etc
function addingSrc(index) {
    audioElement.src = `music/${music_list[index - 1].title}.mp3`
    artist.innerText = music_list[index - 1].artist
    image.src = `img/${music_list[index - 1].Image}.jpg`
    title.innerText = music_list[index - 1].title
}
// play song function
async function playSong() {
    playButton.innerText = "pause"
    audioElement.play()
    isplaying = true
}
// pause song function
function pauseSong() {
    playButton.innerText = "play_arrow"
    audioElement.pause()
    isplaying = false
}

// adding event to play button
playButton.addEventListener("click", () => {
    isplaying ? pauseSong() : playSong()
})
// next song function
function nextSong() {
    songIndex >= music_list.length ? songIndex = 1 : songIndex++
    console.log(songIndex);
    addingSrc(songIndex)
    playSong()
}
// prev song function
function prevSong() {
    songIndex <= 1 ? songIndex = music_list.length : songIndex--
    console.log(songIndex);
    addingSrc(songIndex)
    playSong()
}
// adding event to next button
nextButton.addEventListener("click", nextSong)
// // adding event to prev button
prevButton.addEventListener("click", prevSong)

// progress function
function progres(e) {
    audioElement.currentTime = e.offsetX / progresscontainer.clientWidth * audioElement.duration
    progress.style.width = `${(e.offsetX / progresscontainer.clientWidth) * 100}%`
    playSong()
}

// progress bar functioanality
progresscontainer.addEventListener("click", progres)

// repeating song 
function repeate() {
    if (repeateActive) {
        repeatButton.innerText = "repeat"
        audioElement.loop = false
        repeateActive = false
    } else {
        repeatButton.innerText = "repeat_one"
        audioElement.loop = true
        repeateActive = true
    }
}
repeatButton.addEventListener("click", repeate)




//default function after window load
function windowLoad() {
    addingSrc(songIndex)
}
// adding event to window
window.addEventListener("load", windowLoad())