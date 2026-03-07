// login script

document.getElementById("login-btn")
    .addEventListener("click", () => {
        //1. get the name
        const nameInput = document.getElementById("input-name");
        const contactName = nameInput.value;
        console.log(contactName);
        //2. get the pin
        const passwordInput = document.getElementById("input-password");
        const contactPassword = passwordInput.value;
        console.log(contactPassword);
        // 3. match pin and name
        if (contactName === "admin" && contactPassword === "admin123") {
            // 3.1 true::> alert > home page
            alert("login success");
            window.location.assign("/home.html");
        } else {
            // 3.2 false::> alert > return
            alert("login fail");
            return;
        }
    })
















