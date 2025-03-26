import axios from 'axios';
import { Coin } from '../types/Coin';

export const fetchCoins = async (page: number): Promise<Coin[]> => {
    const coinsPerPage = 50;
    const url = 'https://api.coingecko.com/api/v3/coins/markets?price_change_percentage=1h%2C24h%2C7d';

    const options = {
        method: 'GET',
        url,
        params: {
            vs_currency: 'usd',
            per_page: coinsPerPage,
            page,
            sparkline: 'false',
        },
        headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': 'CG-k9cLLsPjzzAePzEKXiAwK4oE',
        },
    };

        const response = await axios.request<Coin[]>(options);
        return response.data;
};