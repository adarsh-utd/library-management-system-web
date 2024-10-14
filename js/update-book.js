const userStorageData = localStorage.getItem("userData");
var userData = JSON.parse(userStorageData);
const pathQ = window.location.href.split("=");
const bookId = pathQ[pathQ.length - 1];
function getBookById(event) {

    fetch(`https://library-management-system-api-35083192508e.herokuapp.com/books/${bookId}"`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userData.access_token}`
        },

    })
        .then((response) => {
            if (response.status == 401) {
                localStorage.removeItem("userData");
                window.location.href = 'index.html';
                return;
            }

            if (!response.ok) {
                console.log(response);
                alert("Something went wrong");
            }
            return response.json();
        })
        .then((result) => {
            document.getElementById('name').value = result.book.name || '';
            document.getElementById('description').value = result.book.description || '';
            document.getElementById('author').value = result.book.author || '';
            document.getElementById('genre').value = result.book.genre || '';
        })
}
function clickUpdate(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    var userData = localStorage.getItem("userData");
    var userData = JSON.parse(userData);

    fetch(`https://library-management-system-api-35083192508e.herokuapp.com/members/${memberId}`, {
        method: "PUT",
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
document.addEventListener("DOMContentLoaded", getBookById);