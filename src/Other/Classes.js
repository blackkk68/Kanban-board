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
    constructor(name, surname, email, password, id) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
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