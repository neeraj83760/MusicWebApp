//  Check Audio/Video Documentation from W3schools for better userstanding of events and
//  Event handling 

const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')

const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration') 
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')


// Music 

const songs = [

    {
        name:'bawla',
        displayName:'bawla by Badshah',
        artist:'Badshah',
    },
    {
        name:'Interstellar',
        displayName:'3:00 AM Sessions',
        artist:'By Badshah',
    },
    {
        name:'3AM',
        displayName:'Punya Paap',
        artist:'Divine',
    },
    {
        name:'Jugnu',
        displayName:'Jugnu by Badshah',
        artist:'Badshah'
    }
]

// Check if playing 

let isPlaying = false;

// Play

function playSong(){
    isPlaying= true;
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title','Pause');
    music.play();
}

// Pause

function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title','Play');
    music.pause();
}

// Play and Pause Event listener

playBtn.addEventListener('click', ()=> (isPlaying ? pauseSong() : playSong()))


// Update DOM

function loadSong(song){

    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}


// Current Song
let songIndex = 0;

// Prev song function 

function prevSong(){

    songIndex--;
    if(songIndex < 0){

    songIndex = songs.length - 1; 
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}

// Next song function 

function nextSong(){

    songIndex++;
    if(songIndex > songs.length - 1){

        songIndex = 0;
    }
    // console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}


// Onload select first song

loadSong(songs[songIndex]);

// Update Progress Bar and Time

function updateprogressBar(e){

if(isPlaying)
{
    // console.log(e);
    const {duration , currentTime} = e.srcElement;
    console.log(duration, currentTime)

    // Update the progressBar Width
    const progressPercent = (currentTime / duration) * 100; 
    // console.log(progressPercent) 

    progress.style.width = `${progressPercent}%`

    // Calculate the display for the duration
    
    const durationMinutes = Math.floor(duration/ 60);
    console.log('minutes'+ durationMinutes)

    let durationSeconds = Math.floor(duration % 60);
   

    if(durationSeconds < 10){

        durationSeconds= `0${durationSeconds}`;
    }
    console.log('seconds'+ durationSeconds)

    // durationEl.textContent = `${durationMinutes}:${durationSeconds}`

    // Delay Switching duration Element to avoid NAN
    if(durationSeconds)
    {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`
    }

        // Calculate the display for the current


    const currentMinutes = Math.floor(currentTime/ 60);
    console.log('minutes'+ currentMinutes)

    let currentSeconds = Math.floor(currentTime % 60);
   

    if(currentSeconds < 10){

        currentSeconds= `0${currentSeconds}`;
    }
    console.log('seconds'+ currentSeconds)
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}` 
}

}

// set Progress Bar

function setProgressBar(e){

    console.log(e);
    const width = this.clientWidth;
    // console.log('Width:' + width);
    const clickX = e.offsetX; 
    // console.log('clickX:' + clickX)

    const {duration} = music;
    // console.log(clickX/width)
    // console.log((clickX / width) * duration);

    music.currentTime = (clickX / width) * duration;

}


// Event Listeners 

prevBtn.addEventListener('click',prevSong)
nextBtn.addEventListener('click',nextSong)
// We also need to fire an event once the song is Ended 
music.addEventListener('ended', nextSong)

music.addEventListener('timeupdate', updateprogressBar)

progressContainer.addEventListener('click', setProgressBar)



