import TableRow from '../TableRow';
import { Coin } from '../../types/Coin.ts';
import Styles from './Table.module.css';

import {
  TableUI,
  TableBodyUI,
  TableHeadUI,
  TableRowUI,
  TableHeaderUI,
} from "@/Components/ui/table"

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
    "price_change_percentage_1h_in_currency",
    "price_change_percentage_24h_in_currency",
    "price_change_percentage_7d_in_currency",
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

  return (
      <TableUI className={Styles.table}>
        <TableHeaderUI>
          <TableRowUI>
            {allowedKeys.map((ObjKey) => (
                <TableHeadUI className="w-52" key={ObjKey}>
                  <p className={Styles.threadButton} onClick={() => handleSortOrderChange(ObjKey)}>
                    {columnNames[ObjKey]} <span className={Styles.orderDirection}>{sortOrder.order_symbol}</span>
                  </p>
                </TableHeadUI>
            ))}
          </TableRowUI>
        </TableHeaderUI>

        <TableBodyUI>
          {coins.map((coin, index) => (
              <TableRow key={index} coin={coin} allowedKeys={allowedKeys} isLoading={isLoading} />
          ))}
          {/*{Array.from({length: 50 - coins.length}, (_, i) => (*/}
          {/*    <TableRowUI key={i}> kal </TableRowUI>*/}
          {/*))}*/}

        </TableBodyUI>
      </TableUI>
  );
};

export default Table;