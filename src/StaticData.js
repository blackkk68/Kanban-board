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
    constructor(title, description, users, isActive) {
        this.title = title;
        this.description = description;
        this.id = Math.random().toString(36).substr(2, 9) + new Date().getTime();
        this.users = [users];
        this.isActive = isActive;
    }
}

export class UserDataServer {
    constructor(name, surname, sex, email, password, id) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.email = email;
        this.password = password;
        this.id = id;
    }
}

export class UserDataLocal {
    constructor(name, surname, sex, id) {
        this.name = name;
        this.surname = surname;
        this.sex = sex;
        this.id = id;
    }
}