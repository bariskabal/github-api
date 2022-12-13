class Storage {
    
    static getSearchedUsersFromStorage() {
        console.log('storage')
        let users;
        let storageUsers = localStorage.getItem('searched');
        console.log(storageUsers)
        if(storageUsers === null) {
            users = []
        }
        else {
            users = JSON.parse(storageUsers)
        }
        return users;
    }
    static addSearchedUserToStorage(username) {
        console.log(username)
        let users = this.getSearchedUsersFromStorage();

        // IndexOf
        if(users.indexOf(username) === -1) {
            users.push(username);
        }
        localStorage.setItem('searched',JSON.stringify(users))
    }
    static clearAllSearchedUsersFromStorage() {
        localStorage.removeItem('searched')
    }
}