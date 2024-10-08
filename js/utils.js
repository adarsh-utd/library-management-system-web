
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

function isMember(userType) {
    console.log(userType)
    return userType == 'member';
}

function isDeleted(deleteStatus) {

    return deleteStatus == 'Deleted';
}

function isBorrwedUserCurrentUserSame(userId, BorrowerId, userType) {
    if (userType == 'member') {
        return true
    }
    console.log(userId, BorrowerId, userType);


    return userId != BorrowerId;
}

function logout(userData) {
    localStorage.removeItem("userData");
    window.location.href = 'index.html';
    return;

}