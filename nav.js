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