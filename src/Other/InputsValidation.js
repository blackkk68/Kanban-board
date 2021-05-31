export function nameValidation(name) {
    if (name.trim().length) {
        return true;
    } else {
        return false;
    }
}

export function surnameValidation(surname) {
    if (surname.trim().length) {
        return true;
    } else {
        return false;
    }
}

export function emailValidation(email) {
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regExp.test(String(email).toLowerCase())) {
        return true;
    } else {
        return false;
    }
}

export function passwordValidation(password) {
    if (password.trim().length >= 6) {
        return true;
    } else {
        return false;
    }
}

export function repeatPasswordValidation(repeatedPassword, password) {
    if (repeatedPassword === password) {
        return true;
    } else {
        return false;
    }
}