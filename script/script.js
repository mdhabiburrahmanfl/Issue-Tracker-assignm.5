const usernameInput = document.getElementById("input-name");
const passwordInput = document.getElementById("input-password");
const loginButton = document.getElementById("login-btn");

// Check the demo credentials and move the user to the home page.
function handleLogin() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "admin" && password === "admin123") {
        alert("Login successful");
        window.location.href = "./home.html";
        return;
    }

    alert("Invalid username or password");
}

loginButton.addEventListener("click", handleLogin);

// Let the user press Enter inside the password input.
passwordInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleLogin();
    }
});
