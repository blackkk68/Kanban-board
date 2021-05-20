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