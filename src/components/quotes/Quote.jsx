import React, { useEffect, useState } from "react";
import { getQuotesApi } from "../../features/appClockSlice/apiClockSlice";
import { useSelector, useDispatch } from "react-redux";
import "./quote.scss";
export const Quote = () => {
  const dispatch = useDispatch();
  const { quotes, success } = useSelector((state) => state.quotes);
  const [randomElementInQuotes, setRandomElementInQuotes] = useState(0);

  useEffect(() => {
    dispatch(getQuotesApi());
  }, [dispatch]);

  const selectQuote = () => {
    if (success) {
      return (
        <div>
          <div>
            <p>{quotes[randomElementInQuotes]["en"]}</p>
            <p>{quotes[randomElementInQuotes]["author"]}</p>
          </div>
          <button onClick={() => randomQuote()}>Obrazek</button>
        </div>
      );
    } else {
      return (
        <div>
          <p>Loaading</p>
        </div>
      );
    }
  };
  const randomQuote = () => {
    if (success) {
      return setRandomElementInQuotes(
        Math.floor(Math.random() * quotes.length)
      );
    }
  };

  return <div>{selectQuote()}</div>;
};
