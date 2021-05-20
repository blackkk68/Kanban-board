import { makeAutoObservable } from "mobx"

class TokenData {
    constructor() {
        makeAutoObservable(this);
    }

    tokenData = localStorage.getItem('tokenData') ? JSON.parse(localStorage.getItem('tokenData')) : {};

    updateTokenData(newTokenData) {
        this.tokenData = newTokenData;
        localStorage.setItem('tokenData', JSON.stringify(newTokenData));
    }
}

export default new TokenData();