import TableRow from '../TableRow';
import { Coin } from '../../types/Coin.ts';

import { TableUI, TableBodyUI, TableHeadUI, TableRowUI, TableHeaderUI, TableCellUI } from '@/Components/ui/table';
import { Skeleton } from '@/Components/ui/skeleton.tsx';

type TableProps = {
  coins: Coin[];
  sortOrder: {
    key: string;
    order: string;
    order_symbol: string;
  };
  handleSortOrderChange: (key: string) => void;
  isLoading: boolean;
};

const Table = ({ coins, sortOrder, handleSortOrderChange, isLoading }: TableProps) => {
  const allowedKeys: (keyof typeof columnNames)[] = [
    'market_cap_rank',
    'name',
    'current_price',
    'price_change_percentage_1h_in_currency',
    'price_change_percentage_24h_in_currency',
    'price_change_percentage_7d_in_currency',
    'market_cap',
  ];

  const columnNames = {
    market_cap_rank: '#',
    name: 'Монета',
    current_price: 'Цена (USD)',
    price_change_percentage_1h_in_currency: '1h',
    price_change_percentage_24h_in_currency: '24h',
    price_change_percentage_7d_in_currency: '7d',
    market_cap: 'Рыночная капитализация',
  };

  if (isLoading) {
    return (
      <TableUI>
        <TableHeaderUI>
          <TableRowUI>
            <TableCellUI colSpan={allowedKeys.length}>
              <Skeleton className="h-4 w-full" />
            </TableCellUI>
          </TableRowUI>
        </TableHeaderUI>

        <TableBodyUI>
          {coins.map((coin, index) => (
            <TableRow key={index} coin={coin} allowedKeys={allowedKeys} isLoading={true} />
          ))}
        </TableBodyUI>
      </TableUI>
    );
  } else {
    return (
      <TableUI>
        <TableHeaderUI>
          <TableRowUI>
            {allowedKeys.map((ObjKey) => (
              <TableHeadUI key={ObjKey}>
                <p className="cursor-pointer select-none group" onClick={() => handleSortOrderChange(ObjKey)}>
                  {columnNames[ObjKey]}{' '}
                  <span className="text-[7px] opacity-0 transition-opacity duration-100 ease-in group-hover:opacity-100">
                    {sortOrder.order_symbol}
                  </span>
                </p>
              </TableHeadUI>
            ))}
          </TableRowUI>
        </TableHeaderUI>

        <TableBodyUI>
          {coins.map((coin, index) => (
            <TableRow key={index} coin={coin} allowedKeys={allowedKeys} isLoading={false} />
          ))}
        </TableBodyUI>
      </TableUI>
    );
  }
};

export default Table;
