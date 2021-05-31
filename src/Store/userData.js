import { makeAutoObservable } from "mobx";
import { updateToken } from '../Other/UpdateToken';
import tokenDataStore from './tokenData';
import axios from 'axios';
class UserData {
    constructor() {
        makeAutoObservable(this);
    }

    userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};

    updateUserData(newUserData) {
        this.userData = newUserData;
        localStorage.setItem('userData', JSON.stringify(newUserData));
    }

    updateUserServerData = async (newUserData) => {
        try {
            updateToken();
            await axios.patch(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${this.userData.id}.json?auth=${tokenDataStore.tokenData.token}`, newUserData);
            this.updateUserData(newUserData);
        } catch (error) {
            console.error('error: ', error);
        }
    }
}

export default new UserData();