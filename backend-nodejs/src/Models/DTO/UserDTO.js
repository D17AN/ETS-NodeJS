class UserDTO{
    userId;
    userName;
    userEmail;

    constructor(userId, userName, userEmail){
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
    }
}

module.exports = UserDTO;
