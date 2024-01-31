function checkPassword() {
    var enteredPassword = prompt('Addgyj jelszot');
    var correctPassword = 'devModeActivate'; //! I know, not the best way to do this, but I don't really care lol

    if (enteredPassword === correctPassword) {
      // Redirect to the locked site (change 'locked-site.html' to your desired URL)
      window.location.href = 'dev.html';
    } else {
      alert('Hibás jelszó.');
    }
}