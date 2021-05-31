import axios from 'axios';

export async function updateToken(tokenData) {
    if (tokenData) {
        const [refreshToken, expiresIn] = Object.values(tokenData);
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
            return newTokenData;
        }
        return tokenData;
    }
}