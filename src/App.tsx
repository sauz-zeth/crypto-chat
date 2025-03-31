import {useEffect, useState} from 'react';
import Table from './Components/Table';
import TablePagination from './Components/TablePagination';
import { Coin } from './types/Coin';
import { fetchCoins } from './api/fetchCoins';
import { sortCoins } from './utils/sortCoins';
import Header from './Components/Header';

type SortOrder = {
  key: keyof Coin;
  order: 'asc' | 'desc';
  order_symbol: '▲' | '▼';
};

function App() {
  const [coins, setCoins] = useState<Coin[] | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    key: 'market_cap_rank',
    order: 'asc',
    order_symbol: '▲',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSortOrderChange = (key: string) => {
    setSortOrder((prev) => ({
      key: key as keyof Coin, // <- приведение типа
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
      order_symbol: prev.key === key && prev.order === 'asc' ? '▼' : '▲',
    }));
  };

  const handleCurrentPageChange = (page: number) => {

    if (page < 1) {
      page = 1;
    }
    if (page > 344) {
      page = 344;
    }

    setCurrentPage(page);
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCoins(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCoins(data);
      } catch (error) {
        console.error(error);
        setCoins(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [currentPage]);

  const sortedCoins = coins ? sortCoins(coins, sortOrder) : [];

  return (
      <div className="flex flex-col items-center justify-center mx-auto max-w-[90vw] py-15">
        <Header />

        {coins ? (
            <Table
                coins={sortedCoins}
                handleSortOrderChange={handleSortOrderChange}
                sortOrder={sortOrder}
                isLoading={isLoading}
            />
        ) : (
            <p>Ошибка загрузки</p>
        )}

        <TablePagination
            currentPage={currentPage}
            handleCurrentPageChange={handleCurrentPageChange}
            pageCount={344}
        />
      </div>
  );
}

export default App;