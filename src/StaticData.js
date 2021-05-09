export const leastColumns = [
    {
        id: 123456789,
        heading: 'В работу',
        tasks: null,
        index: 1,
        deletable: false
    },
    {
        id: 1234567890,
        heading: 'Выполнено',
        tasks: null,
        index: 2,
        deletable: false
    }
];

export class Space {
    constructor(isActive, title, description = '') {
        this.isActive = isActive;
        this.title = title;
        this.description = description;
        this.id = Math.random().toString(36).substr(2, 9) + new Date().getTime();
    }
}