import { makeAutoObservable } from "mobx";
import { updateToken } from '../Other/UpdateToken';
import tokenDataStore from './tokenData';
import spaces from './spaces';
import axios from 'axios';

class Archive {
    constructor() {
        makeAutoObservable(this);
    }

    archive = localStorage.getItem('archive') ? JSON.parse(localStorage.getItem('archive')) : [];

    addTask(task) {
        this.archive.push(task);
        this.updateArchiveServerData();
    }

    removeTask(taskIndex) {
        this.archive.splice(taskIndex, 1);
        this.updateArchiveServerData();
    }

    updateArchive(newArchive) {
        this.archive = newArchive.slice();
        localStorage.setItem('archive', JSON.stringify(this.archive));
    }

    updateArchiveServerData = async (updatedArchive) => {
        try {
            await updateToken();
            if (updatedArchive) {
                this.archive = updatedArchive;
            }
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spaces.activeSpace.id}/archive.json?auth=${tokenDataStore.tokenData.token}`, this.archive);
            localStorage.setItem('archive', JSON.stringify(this.archive));
        } catch (err) {
            console.error('err: ', err);
        }
    }
}

export default new Archive();