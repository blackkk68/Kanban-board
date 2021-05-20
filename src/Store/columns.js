import { makeAutoObservable } from "mobx";
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
        const index = this.columns.findIndex(item => item.id === columnId);
        this.columns.splice(index, 1);
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

    updateColumns(newColumns) {
        this.columns = newColumns.slice();
        localStorage.setItem('columns', JSON.stringify(this.columns));
    }

    updateColumnsServerData = async (updatedColumns) => {
        try {
            if (updatedColumns) {
                this.columns = updatedColumns;
            }
            localStorage.setItem('columns', JSON.stringify(this.columns));
            await axios.put(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spaces.activeSpace.id}/columns.json`, this.columns);
        } catch (err) {
            console.error('err: ', err);
        }
    }
}

export default new Columns();