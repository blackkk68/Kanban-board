export class Space {
    constructor(title, description, users, creatorId, isDeletable = true) {
        this.title = title;
        this.description = description;
        this.id = Math.random().toString(36).substr(2, 9) + new Date().getTime();
        this.users = [users];
        this.creatorId = creatorId;
        this.isDeletable = isDeletable;
    }
}

export class UserDataServer {
    constructor(name, surname, email, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.id = id;
    }
}

export class UserDataLocal {
    constructor(name, surname, id) {
        this.name = name;
        this.surname = surname;
        this.id = id;
    }
}
export class Task {
    constructor(options) {
        this.heading = options.taskHeading;
        this.text = options.taskText;
        this.comment = options.taskComment;
        this.id = new Date().getTime();
        this.client = options.client;
        this.priority = options.priority;
    }
}

export class Column {
    constructor(heading, newColIndex) {
        this.id = new Date().getTime();
        this.heading = heading;
        this.tasks = [];
        this.index = newColIndex;
        this.deletable = true;
    }
}

export class Client {
    constructor(options) {
        this.companyTitle = options.companyTitle;
        this.contact = options.contact;
        this.phone = options.phone;
        this.email = options.email;
        this.address = options.address;
        this.comment = options.comment;
        this.id = new Date().getTime();
    }
}