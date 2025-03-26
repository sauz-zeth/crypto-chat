import { Coin } from '../types/Coin';

type SortOrder = {
    key: keyof Coin;
    order: 'asc' | 'desc';
};

export const sortCoins = (coins: Coin[], sortOrder: SortOrder) => {
    return [...coins].sort((a, b) => {
        const valueA = a[sortOrder.key];
        const valueB = b[sortOrder.key];

        if (typeof valueA === 'number' && typeof valueB === 'number') {
            return sortOrder.order === 'asc' ? valueA - valueB : valueB - valueA;
        }
        return 0;
    });
};