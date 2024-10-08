function clickSignup(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const userType = document.getElementById('usertype').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    fetch("http://127.0.0.1:8000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            address: address,
            user_type: userType
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