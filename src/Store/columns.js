import { makeAutoObservable } from "mobx";
import { updateToken } from '../Other/UpdateToken';
import tokenDataStore from './tokenData';
import spaces from './spaces';
import axios from 'axios';

class Columns {
    constructor() {
        makeAutoObservable(this);
    }

    columns = localStorage.getItem('columns') ? JSON.parse(localStorage.getItem('columns')) : [];

    addColumn(newColumn) {
        this.columns.push(newColumn);
        this.updateColumnsServerData();
    }

    removeColumn(columnId) {
        const newColumns = this.columns.filter(item => item.id !== columnId);
        this.columns = newColumns;
        this.updateColumnsServerData();
    }

    addTask(columnId, newTask) {
        const column = this.columns.find(item => item.id === columnId);
        if (!column.tasks) {
            column.tasks = [];
        }
        column.tasks.push(newTask);
        this.updateColumnsServerData();
    }

    removeTask(columnId, taskId) {
        const column = this.columns.find(item => item.id === columnId);
        const tasks = column.tasks;
        const taskIndex = tasks.findIndex(item => item.id === taskId);
        tasks.splice(taskIndex, 1);
        this.updateColumnsServerData();
    }

    updateColumns(newColumns) {
        this.columns = newColumns.slice();
        localStorage.setItem('columns', JSON.stringify(this.columns));
    }

    updateColumnsServerData = async (updatedColumns) => {
        try {
            updateToken();
            if (updatedColumns) {
                this.columns = updatedColumns;
            }
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spaces.activeSpace.id}/columns.json?auth=${tokenDataStore.tokenData.token}`, this.columns);
            localStorage.setItem('columns', JSON.stringify(this.columns));
        } catch (err) {
            console.error('err: ', err);
        }
    }
}

export default new Columns();