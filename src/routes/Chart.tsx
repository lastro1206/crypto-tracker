import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

function Chart({ coinId, isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohicv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const candleData =
    data?.map((price) => ({
      x: new Date(price.time_open * 1000),
      y: [price.open, price.high, price.low, price.close],
    })) || [];

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type='candlestick'
          series={[
            {
              data: candleData,
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            yaxis: {
              show: false,

              tooltip: {
                enabled: true,
              },
            },
            xaxis: {
              type: "datetime",
              labels: {
                datetimeFormatter: {
                  year: "yyyy",
                  month: "MMM 'yy",
                  day: "dd MMM",
                },
              },
            },
            tooltip: {
              enabled: true,
              x: {
                format: "MMM dd",
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
