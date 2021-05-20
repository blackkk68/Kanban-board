import { makeAutoObservable } from "mobx"

class UserData {
    constructor() {
        makeAutoObservable(this);
    }

    userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};

    updateUserData(newUserData) {
        this.userData = newUserData;
        localStorage.setItem('userData', JSON.stringify(newUserData));
    }
}

export default new UserData();