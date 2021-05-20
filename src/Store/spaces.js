import { makeAutoObservable } from "mobx";
import userDataStore from './userData';
import axios from 'axios';

class Spaces {
    constructor() {
        makeAutoObservable(this);
    }

    spaces = localStorage.getItem('spaces') ? JSON.parse(localStorage.getItem('spaces')) : [];
    activeSpace = localStorage.getItem('activeSpace') ? JSON.parse(localStorage.getItem('activeSpace')) : {};

    addSpace(newSpace) {
        this.spaces.push(newSpace);
    }

    updateActiveSpace() {
        const active = this.spaces.filter(item => item.isActive === true);
        this.activeSpace = active[0];
        localStorage.setItem('activeSpace', JSON.stringify(this.activeSpace));
    }

    updateSpaces(updatedSpaces) {
        this.spaces = updatedSpaces.slice();
        localStorage.setItem('spaces', JSON.stringify(updatedSpaces));
        this.updateActiveSpace();
    }

    updateSpacesServerData = async (updatedSpaces) => {
        try {
            this.updateSpaces(updatedSpaces);
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userDataStore.userData.id}/spaces.json`, updatedSpaces);
        } catch (err) {
            console.error('err: ', err);
        }
    }
}



export default new Spaces();