
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

function isBorrwedUserCurrentUserSame(userId, BorrowerId, userType, borrowStatus) {
    if (userType == 'member') {
        if (borrowStatus == "BORROWED") {
            console.log(userId, BorrowerId);

            if (userId != BorrowerId) {
                return false;
            } else {
                return true;
            }
        }
        else {
            return true;
        }

    }
    else {
        return false;
    }

}

function logout(userData) {
    localStorage.removeItem("userData");
    window.location.href = 'index.html';
    return;

}