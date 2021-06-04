import axios from 'axios';
import tokenDataStore from '../Store/tokenData';

export async function updateToken() {
    const [, refreshToken, expiresIn] = Object.values(tokenDataStore.tokenData);
    if (new Date().getTime() >= expiresIn) {
        const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
        const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
            refreshToken: refreshToken,
            grantType: "refresh_token"
        });

        const newTokenData = {
            token: response.data['id_token'],
            refreshToken: response.data['refresh_token'],
            expiresIn: new Date().getTime() + response.data['expires_in'] * 1000
        }
        tokenDataStore.updateTokenData(newTokenData);
    }
}