import { makeAutoObservable } from "mobx";
import { updateToken } from '../Other/UpdateToken';
import tokenDataStore from './tokenData';
import spaces from './spaces';
import axios from 'axios';

class Clients {
    constructor() {
        makeAutoObservable(this);
    }

    clients = localStorage.getItem('clients') ? JSON.parse(localStorage.getItem('clients')) : [];

    addClient(newClient) {
        this.clients.push(newClient);
        this.clients.sort((a, b) => a.companyTitle > b.companyTitle);
        this.updateClientsServerData();
    }

    removeClient(removedClient) {
        const index = this.clients.findIndex(item => item.id === removedClient.id);
        this.clients.splice(index, 1);
        this.updateClientsServerData();
    }

    updateClient(updatedClient) {
        this.clients.forEach(item => {
            if (item.id === updatedClient.id) {
                item = updatedClient;
            }
        })
        this.updateClientsServerData();
    }

    updateClients(newClients) {
        this.clients = newClients.slice();
        localStorage.setItem('clients', JSON.stringify(this.clients));
    }

    updateClientsServerData = async () => {
        try {
            updateToken();
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spaces.activeSpace.id}/clients.json?auth=${tokenDataStore.tokenData.token}`, this.clients);
            localStorage.setItem('clients', JSON.stringify(this.clients));
        } catch (err) {
            console.error('err: ', err);
        }
    }
}

export default new Clients();