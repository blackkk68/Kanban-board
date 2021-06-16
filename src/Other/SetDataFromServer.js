import tokenDataStore from '../Store/tokenData';
import columnsStore from '../Store/columns';
import clientsStore from '../Store/clients';
import archiveStore from '../Store/archive';
import spacesStore from '../Store/spaces';
import { leastColumns } from './Data';
import axios from 'axios';

export async function setDataFromServer() {
    const columnsData = await axios
        .get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spacesStore.activeSpace.id}/columns.json?auth=${tokenDataStore.tokenData.token}`);
    const newColumns = columnsData.data ? columnsData.data : leastColumns;
    columnsStore.updateColumns(newColumns);

    const clientsData = await axios
        .get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spacesStore.activeSpace.id}/clients.json?auth=${tokenDataStore.tokenData.token}`);
    const newClients = clientsData.data ? clientsData.data : [];
    clientsStore.updateClients(newClients);

    const archiveData = await axios
        .get(`https://kanban-board-7c75b-default-rtdb.firebaseio.com/spaces/${spacesStore.activeSpace.id}/archive.json?auth=${tokenDataStore.tokenData.token}`);
    const newArchive = archiveData.data ? archiveData.data : [];
    archiveStore.updateArchive(newArchive);
}