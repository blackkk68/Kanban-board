import axios from 'axios';

export function updateToken(tokenData) {
    if (tokenData) {
        const [refreshToken, expiresIn] = Object.values(tokenData);
        if (new Date().getTime() >= expiresIn) {
            update(refreshToken);
        }
        return tokenData;
    }
}

async function update(refreshToken) {
    const apiKey = 'AIzaSyAwu9n1vxYzjojiWKrVsrkhLQZllm3uOAQ';
    const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
        refreshToken: refreshToken,
        grantType: "refresh_token"
    });

    console.log('Hey');

    const newTokenData = {
        token: response.data['id_token'],
        refreshToken: response.data['refresh_token'],
        expiresIn: new Date().getTime() + response.data['expires_in'] * 1
    }
    return newTokenData;
}