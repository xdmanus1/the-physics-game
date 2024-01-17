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