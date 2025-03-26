import { Coin } from '../../types/Coin.ts';
import Styles from './TableRow.module.css';
import {
  TableRowUI,
  TableCellUI,
} from "@/Components/ui/table";
import { Skeleton } from "@/Components/ui/skeleton";

interface CoinCardProps {
  coin: Coin;
  allowedKeys: (keyof Coin)[];
  isLoading?: boolean; // <-- добавим флаг загрузки
}

export default function TableRow({ coin, allowedKeys, isLoading = false }: CoinCardProps) {
  if (isLoading) {
    return (
        <TableRowUI className="h-12">
          <TableCellUI colSpan={allowedKeys.length}>
            <Skeleton className="h-4 w-full" />
          </TableCellUI>
        </TableRowUI>
    );
  }

  return (
      <TableRowUI className="h-12">
        {allowedKeys.map((key, index) => {
          // if (isLoading) {
          //   return (
          //       <TableCellUI key={index}>
          //         <Skeleton className="h-4 w-[100px]" />
          //       </TableCellUI>
          //   );
          // }

          if (key === 'name') {
            return (
                <TableCellUI key={index}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className={Styles.coinImg} src={coin.image} alt={coin[key]} />
                    {coin[key]}
                  </div>
                </TableCellUI>
            );
          }

          if (
              (key === 'current_price' ||
                  key === 'market_cap' ||
                  key === 'high_24h' ||
                  key === 'price_change_24h') &&
              typeof coin[key] === 'number'
          ) {
            return (
                <TableCellUI key={index}>
                  ${(coin[key] as number).toLocaleString('de-DE')}
                </TableCellUI>
            );
          }

          if (
              (key === "price_change_percentage_1h_in_currency" ||
                  key === "price_change_percentage_24h_in_currency" ||
                  key === "price_change_percentage_7d_in_currency") &&
              typeof coin[key] === 'number'
          ) {
            const value = coin[key] as number;
            const color = value >= 0 ? 'green' : 'red';
            return (
                <TableCellUI key={index} style={{ color }}>
                  {value.toFixed(2)}%
                </TableCellUI>
            );
          }

          return <TableCellUI key={index}>{coin[key]}</TableCellUI>;
        })}
      </TableRowUI>
  );
}