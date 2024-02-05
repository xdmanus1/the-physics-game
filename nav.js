document.getElementById('checkbox1').addEventListener('change', function () {
    var myLinks = document.getElementById('myLinks');
    if (this.checked) {
        myLinks.classList.add('show');
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
        myLinks.classList.remove('show');
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const popSound = document.getElementById("popSound");
    const loseSound = document.getElementById("loseSound");
    const winSound = document.getElementById("winSound");
    const muteButton = document.getElementById("muteButton");
    const muteIcon = document.getElementById("muteIcon");

    // Check if there is a stored mute state
    const isMuted = localStorage.getItem("isMuted") === "true";
    setMuteState(isMuted);

    // Toggle mute state on button click
    muteButton.addEventListener("click", function () {
        const newMuteState = !popSound.muted;
        setMuteState(newMuteState);
    });

    // Function to set mute state and update button text
    function setMuteState(isMuted) {
        popSound.muted = isMuted;
        loseSound.muted = isMuted;
        winSound.muted = isMuted;

        // Update the mute button icon based on the mute state
        muteIcon.className = isMuted ? "fas fa-volume-up" : "fas fa-volume-mute";

        // Store mute state in local storage
        localStorage.setItem("isMuted", isMuted);
    }
});


const dialog = document.getElementById("passwordDialog");
const showDialogButton = document.getElementById("showDialogButton");
const closeButton = document.querySelector("#passwordDialog .close");

// Initially hide the dialog
dialog.style.display = "none";

// Function to open the dialog
function openModal() {
    dialog.style.display = "flex";
}

// Function to close the modal
function closeModal() {
    dialog.style.display = "none";
}

// Event listener for the "Open Dialog" button
showDialogButton.addEventListener("click", openModal);

// "Close" button closes the dialog
closeButton.addEventListener("click", closeModal);

// Function to check the password
function checkPassword() {
    var password = document.getElementById('passwordInput').value;
    // Replace 'yourPassword' with the actual password you want to use
    if (password === 'test') {
        // Redirect to another page
        window.location.href = 'dev.html';
    } else {
        alert('Incorrect password. Please try again.');
    }
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

document.querySelector("h1").onmouseover = event => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return event.target.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)]
            })
            .join("");

        if (iteration >= event.target.dataset.value.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}
document.getElementById('checkbox1').addEventListener('change', function () {
    var myLinks = document.getElementById('myLinks');
    if (this.checked) {
        myLinks.classList.add('show');
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
        myLinks.classList.remove('show');
    }
});

