const userStorageData = localStorage.getItem("userData");
const userData = JSON.parse(userStorageData);
const userType = userData.user_type

function updateBook(e, book_id) {
    e.preventDefault();
    window.location.href = "update-book.html?book_id=" + book_id;
}
function deleteBook(e, book_id) {
    console.log(book_id);


    fetch("https://library-management-system-api-35083192508e.herokuapp.com/books/" + book_id, {
        method: "delete",
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
            else {
                window.location.href = 'book.html';
            }
            return response.json();
        })

}

function getAllBooks(e) {
    e.preventDefault();

    console.log(userData);

    fetch("https://library-management-system-api-35083192508e.herokuapp.com/books", {
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

            const bookId = document.getElementById("books");
            bookId.innerHTML = ""
            if (result.books.length != 0) {
                result.books.forEach(book => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                    
                    <td>${book.name}</td>
                    <td>${book.status}</td>
                     <td class="${isMember(userType) ? '' : 'visually-hidden'}">${book.borrowed_by}</td>
                    <td class="${isMember(userType) ? '' : 'visually-hidden'}">${book.borrowed_ts != 0 ? formatTimestamp(book.borrowed_ts) : ""}</td>
                    <td class="${isMember(userType) ? '' : 'visually-hidden'}">${book.returned_ts != 0 ? formatTimestamp(book.returned_ts) : ""}</td>
                    <td class="${isMember(userType) ? 'visually-hidden' : ''}"><button class="btn btn-info  text-white  "  onClick=updateBook(event,'${book.id}')>Update</button> 
                        <button class="btn btn-danger  text-white"  onClick=deleteBook(event,'${book.id}')>Delete</button>
                       
                   </td>
                    <td class="${isBorrwedUserCurrentUserSame(userData.id, book.borrow_by_id, userType) ? 'visually-hidden' : ''} ">
                        <button class="btn btn-success  text-white"  onClick=deleteBook(event,'${book.id}')>${book.status == "BORROWED" ? "Return" : "Borrow"}</button>
                       
                   </td>
                   
                `;
                    bookId.appendChild(row);

                });
            } else {
                console.log(result.books);
                const noDataRow = document.createElement("tr");
                noDataRow.innerHTML = `
                    
                   <td colspan="4" class="text-center">No Data Available</td>
                   
                `;
                bookId.appendChild(noDataRow);
            }

        })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
}
document.addEventListener("DOMContentLoaded", getAllBooks);

function addBook(e) {
    e.preventDefault();
    window.location.href = 'add-book.html';
}



function deleteMyAccount() {

    fetch("https://library-management-system-api-35083192508e.herokuapp.com/members/delete-my-account", {
        method: "DELETE",
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
            return response.json().then((result) => {
                console.log(response)
                if (response.ok) {

                    localStorage.removeItem("userData");
                    window.location.href = 'index.html';
                    return;
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
