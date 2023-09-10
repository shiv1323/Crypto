import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Marquee from "react-fast-marquee";
import axios from "axios";
import { CryptoState } from "../Contextapi/CryptoContext";
import { TrendingCoins } from "../config/api";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
  coinBox: {
    background: "#fafafa",
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    width: "160px",
    height: "160px",
    margin: "1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
    transition: "300ms ease-in-out",
  },
  skillBoxStyle: {
    background: "#161616",
    boxShadow: `0px 0px 20px "#545fc4"`,
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const skillBoxStyle = {
    background: "#161616",
  };

  const { currency, symbol } = CryptoState();

  //   fetching api

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <div className={classes.carousel}>
      <Marquee
        gradient={false}
        speed={80}
        pauseOnHover={true}
        pauseOnClick={true}
        delay={0}
        play={true}
        direction="left"
      >
        {trending.map((coin, index) => {
          let profit = coin?.price_change_percentage_24h >= 0;
          return (
            <>
              <Link to={`/coins/${coin.id}`} className={classes.carouselItem}>
                <div
                  style={skillBoxStyle}
                  className={classes.coinBox}
                  key={index}
                >
                  <img
                    src={coin?.image}
                    alt={coin.name}
                    loading="lazy"
                    style={{
                      marginBottom: 10,
                      pointerEvents: "none",
                      height: "50px",
                    }}
                  />
                  <span>
                    {coin?.symbol} &nbsp;
                    <span
                      style={{
                        color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                        fontWeight: 500,
                      }}
                    >
                      {profit && "+"}
                      {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                  </span>
                  <span style={{ fontSize: 20, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                  </span>
                </div>
              </Link>
            </>
          );
        })}
      </Marquee>
    </div>
  );
};

export default Carousel;
