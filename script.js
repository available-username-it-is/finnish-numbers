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
    { 
        name: "5.mp3",
        number: [65000000],
        text: "Noin 65 miljoonaa vuotta kestänyttä kautta...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "6.mp3",
        number: [1715],
        text: "Ehdottamalla vuonna 1715...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "7.mp3",
        number: [168000],
        text: "168 000 vuotta...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "8.mp3",
        number: [306662400],
        text: "306 662 400 vuotta...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "9.mp3",
        number: [22],
        text: "22-vuotiaana hän palasi Glasgow’hun...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "10.mp3",
        number: [53],
        text: "53 vuotta...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "11.mp3",
        number: [83],
        text: "Hän kuoli vasta 83-vuotiaana...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "12.mp3",
        number: [1907],
        text: "Vuonna 1907...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "13.mp3",
        number: [661],
        text: "Hän kirjoitti 661 artikkelia...",
        source: "Lyhyt historia lähes kaikesta, Bill Bryson"
    },
    { 
        name: "14.mp3",
        number: [69],
        text: "Sai 69 patenttia...",
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
    cardDOM.style.backgroundColor = "#F8F9FA";
}

const startPage = (audioObj) => {
    fillPage(audioObj);
    setTimeout(() => audioDOM.play(), 700);
}

const resources = createResources(difficulty);
let resourceNumber = 0;

playAudioDOM.addEventListener("click", () => {
    audioDOM.play();
});

function slideAnimation(container, outClass, inClass, callback) {
    container.classList.add(outClass);
    
    container.addEventListener('animationend', function() {
        container.classList.remove(outClass);
        
        if (callback) {
            callback();
        }
        
        container.classList.add(inClass);
        
        container.addEventListener('animationend', function() {
            container.classList.remove(inClass);
        }, { once: true });
    }, { once: true });
}

function isMobile() {
    const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(navigator.userAgent);
}





let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
    const questionContainer = document.getElementById('question-container');

    if (touchEndX < touchStartX) {
        // Swipe left (next question)
        slideAnimation(questionContainer, 'slide-out', 'slide-in', function() {
            resourceNumber++;
            if (!resources[resourceNumber]) {
                resourceNumber = 0;
            }
            startPage(resources[resourceNumber]);
        });
    }
    
    if (touchEndX > touchStartX) {
        // Swipe right (previous question)
        slideAnimation(questionContainer, 'slide-out-reverse', 'slide-in-reverse', function() {
            resourceNumber--;
            if (!resources[resourceNumber]) {
                resourceNumber = resources.length - 1;
            }
            startPage(resources[resourceNumber]);
        });
    }
}

document.addEventListener('touchstart', function(event) {
    touchStartX = event.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', function(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleGesture();
}, false);






// cardDOM.addEventListener("swipe", (event) => {
//     if (event.deltaX > event.deltaY) {
//         const questionContainer = document.getElementById('question-container');
    
//         slideAnimation(questionContainer, 'slide-out', 'slide-in', function() {
//             resourceNumber++;
//             if (!resources[resourceNumber]) {
//                 resourceNumber = 0;
//             }
//             startPage(resources[resourceNumber]);
//         });
//     }
// });

rightArrowDOM.addEventListener("click", () => {
    const questionContainer = document.getElementById('question-container');
    
    slideAnimation(questionContainer, 'slide-out', 'slide-in', function() {
        resourceNumber++;
        if (!resources[resourceNumber]) {
            resourceNumber = 0;
        }
        startPage(resources[resourceNumber]);
    });
});

leftArrowDOM.addEventListener("click", () => {
    const questionContainer = document.getElementById('question-container');
    slideAnimation(questionContainer, 'slide-out-reverse', 'slide-in-reverse', function() {
        resourceNumber--;
        if (!resources[resourceNumber]) {
            resourceNumber = resources.length - 1;
        }
        startPage(resources[resourceNumber]);
    });
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