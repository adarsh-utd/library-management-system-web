
function clickLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch("https://library-management-system-api-35083192508e.herokuapp.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            username: username,
            password: password
        }),
    })
        .then((response) => {
            return response.json().then((result) => {
                console.log(response)
                if (response.ok) {
                    localStorage.setItem("userData", JSON.stringify(result));
                    console.log(result);
                    alert("You are logged in.");
                    window.location.href = 'book.html';
                } else {
                    alert(result.detail);
                }

            })
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
}