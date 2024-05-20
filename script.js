const audios = [
    { 
        name: "1.mp3",
        number: [1830, 745],
        text: "Vuonna 1830 seurassa oli jo 745 jäsentä...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "2.mp3",
        number: [1794],
        text: "Vuonna 1794...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "3.mp3",
        number: [1785],
        text: "Vuonna 1785...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "4.mp3",
        number: [1805],
        text: "Parkinson hoiti museota vuoteen 1805...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
];

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }
}

const searchParams = new URLSearchParams(window.location.search);
const difficulty = searchParams.get("difficulty");

const audioDOM = document.querySelector("#audio");
const audioTextDOM = document.querySelector("#audio-text");
const numberInputDOM = document.querySelector("#number-input");
const submitButtonDOM = document.querySelector("#submit-button");
const revealTextDOM = document.querySelector("#reveal-text");
const leftArrowDOM = document.querySelector("#left-arrow");
const rightArrowDOM = document.querySelector("#right-arrow");
const sourceDOM = document.querySelector("#source");
const playAudioDOM = document.querySelector("#play-audio");
const cardDOM = document.querySelector(".card-container");

const createResources = (difficulty) => {
    if (difficulty === "beginner") {
        let testAudios = audios.filter(audio => audio.number.length === 1);
        shuffle(testAudios);
        return testAudios;    
    } else if (difficulty === "intermediate") {}
}

const fillPage = (audioObj) => {
    audioDOM.src = "assets/audio/" + audioObj.name;
    audioTextDOM.innerHTML = audioObj.text;
    sourceDOM.innerHTML = audioObj.source;
    audioTextDOM.parentElement.style.display = "none";
    numberInputDOM.value = "";
}

const startPage = (audioObj) => {
    fillPage(audioObj);
    audioDOM.play();
}

const resources = createResources(difficulty);
let resourceNumber = 0;

playAudioDOM.addEventListener("click", () => {
    audioDOM.play();
});

rightArrowDOM.addEventListener("click", () => {
    resourceNumber++;
    if (!resources[resourceNumber]) {
        resourceNumber = 0;
    }
    startPage(resources[resourceNumber]);
});

leftArrowDOM.addEventListener("click", () => {
    resourceNumber--;
    if (!resources[resourceNumber]) {
        resourceNumber = resources.length - 1;
    }
    startPage(resources[resourceNumber]);
})

revealTextDOM.addEventListener("click", () => {
    audioTextDOM.parentElement.style.display = "flex";
});

startPage(resources[resourceNumber]);

if (difficulty === "beginner") {
    submitButtonDOM.addEventListener("click", () => {
        if (+numberInputDOM.value === resources[resourceNumber].number[0]) {
            audioTextDOM.parentElement.style.display = "flex";
            // numberInputDOM.style.border = "2px solid #28a745";
            cardDOM.style.backgroundColor = "#28a74547";
        } else {
            cardDOM.style.backgroundColor = "#dc354547";
        }
    });
}