const userStorageData = localStorage.getItem("userData");
const userData = JSON.parse(userStorageData);
const userType = userData.user_type

function updateMember(e, memberId) {
    e.preventDefault();
    window.location.href = "update-member.html?member_id=" + memberId;
}
function deleteMember(e, memberId) {
    console.log(memberId);


    fetch("https://library-management-system-api-35083192508e.herokuapp.com/members/" + memberId, {
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
                window.location.href = 'member.html';
            }
            return response.json();
        })

}

function getAllMembers(e) {
    e.preventDefault();

    console.log(userData);

    fetch("https://library-management-system-api-35083192508e.herokuapp.com/members", {
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

            const membersEleId = document.getElementById("members");
            membersEleId.innerHTML = ""
            if (result.members.length != 0) {
                result.members.forEach(member => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                            
                            <td>${member.username}</td>
                            <td>${member.status}</td>
                            
                            <td class="${isDeleted(member.status) ? 'visually-hidden' : ''}"><button class="btn btn-info  text-white  "  onClick=updateMember(event,'${member.id}')>Update</button> 
                                <button class="btn btn-danger  text-white"  onClick=deleteMember(event,'${member.id}')>Delete</button>
                                <button class="btn btn-secondary  text-white"  onClick=history(event,'${member.id}')>History</button>
                               
                           </td>
                           
                           
                        `;
                    membersEleId.appendChild(row);

                });
            } else {
                console.log(result.books);
                const noDataRow = document.createElement("tr");
                noDataRow.innerHTML = `
                            
                           <td colspan="4" class="text-center">No Data Available</td>
                           
                        `;
                membersEleId.appendChild(noDataRow);
            }

        })
        .catch((error) => {
            console.error('Error:', error);
            alert("An error occurred. Please try again.");
        });
}
document.addEventListener("DOMContentLoaded", getAllMembers);

function addMember(e) {
    e.preventDefault();
    window.location.href = 'add-member.html';
}
function history(e, memberId) {
    e.preventDefault();
    window.location.href = 'book-history.html?member_id=' + memberId;
}

const headers = `
    <th scope="col">Name</th>
                   <th scope="col">Status</th>
   
   <th scope="col" class="${isMember(userType) ? 'visually-hidden' : ''}">Action</th>
`;

document.getElementById('table-headers').innerHTML = headers;
if (isMember(userType)) {
    document.getElementById('membersId').classList.add('visually-hidden');
    document.getElementById('add-button').classList.add('visually-hidden');
}

