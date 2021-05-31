import { makeAutoObservable } from "mobx";
import { updateToken } from '../Other/UpdateToken';
import tokenDataStore from './tokenData';
import userDataStore from './userData';
import axios from 'axios';

class Spaces {
    constructor() {
        makeAutoObservable(this);
    }

    spaces = localStorage.getItem('spaces') ? JSON.parse(localStorage.getItem('spaces')) : [];
    activeSpace = localStorage.getItem('activeSpace') ? JSON.parse(localStorage.getItem('activeSpace')) : {};

    updateActiveSpace(newActiveSpace) {
        this.activeSpace = newActiveSpace;
        localStorage.setItem('activeSpace', JSON.stringify(newActiveSpace));
    }

    updateSpaces(updatedSpaces) {
        this.spaces = updatedSpaces.slice();
        localStorage.setItem('spaces', JSON.stringify(updatedSpaces));
    }

    deleteSpace = async (spaceId) => {
        await axios.delete(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spaceId}.json?auth=${tokenDataStore.tokenData.token}`);
    }

    updateSpacesServerData = async (updatedSpaces, newActiveSpace) => {
        try {
            updateToken();
            const filteredUpdatedSpaces = updatedSpaces.filter(item => item && item.users.find(item => item.id === userDataStore.userData.id));
            this.updateSpaces(filteredUpdatedSpaces);
            if (newActiveSpace) {
                this.updateActiveSpace(newActiveSpace);
            }
            const userSpaceData = [];
            for (let space of updatedSpaces) {
                if (space) {
                    if (space.users.find(item => item.id === userDataStore.userData.id)) {
                        userSpaceData.push({ id: space.id, isActive: space.id === this.activeSpace.id });
                    }
                    await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${space.id}/spaceData.json?auth=${tokenDataStore.tokenData.token}`, space);
                }
            }
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/users/${userDataStore.userData.id}/spaces.json?auth=${tokenDataStore.tokenData.token}`, userSpaceData);
        } catch (err) {
            console.error('err: ', err);
        }
    }
}

export default new Spaces();