import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
}

interface PriceData {
  quotes: {
    USD: {
      price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
    };
  };
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const PriceCard = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Value = styled.span<{ isPositive?: boolean }>`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.isPositive ? "#0be881" : "#ff3f34")};
`;

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["price", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <Container>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <PriceCard>
            <Label>Current Price:</Label>
            <Value>${data?.quotes.USD.price.toFixed(2)}</Value>
          </PriceCard>

          <PriceCard>
            <Label>Market Cap:</Label>
            <Value>${data?.quotes.USD.market_cap.toLocaleString()}</Value>
          </PriceCard>

          <PriceCard>
            <Label>24H Change:</Label>
            <Value isPositive={data?.quotes.USD.percent_change_24h! > 0}>
              {data?.quotes.USD.percent_change_24h.toFixed(2)}%
            </Value>
          </PriceCard>

          <PriceCard>
            <Label>7D Change:</Label>
            <Value isPositive={data?.quotes.USD.percent_change_7d! > 0}>
              {data?.quotes.USD.percent_change_7d.toFixed(2)}%
            </Value>
          </PriceCard>

          <PriceCard>
            <Label>30D Change:</Label>
            <Value isPositive={data?.quotes.USD.percent_change_30d! > 0}>
              {data?.quotes.USD.percent_change_30d.toFixed(2)}%
            </Value>
          </PriceCard>

          <PriceCard>
            <Label>1Y Change:</Label>
            <Value isPositive={data?.quotes.USD.percent_change_1y! > 0}>
              {data?.quotes.USD.percent_change_1y.toFixed(2)}%
            </Value>
          </PriceCard>
        </>
      )}
    </Container>
  );
}

export default Price;
