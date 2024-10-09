function clickSave(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    var userData = localStorage.getItem("userData");
    var userData = JSON.parse(userData);

    fetch("https://library-management-system-4hmcxkvn4-adarsh-ks-projects-44e5e3c6.vercel.app/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData.access_token}`
        },
        body: JSON.stringify({
            name: name,
            description: description,
            author: author,
            genre: genre

        }),
    })
        .then((response) => {
            if (response.status == 401) {
                localStorage.removeItem("userData");
                window.location.href = 'index.html';
                return;
            }
            return response.json().then((result) => {
                console.log(response)
                if (response.ok) {

                    alert(result.message);
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