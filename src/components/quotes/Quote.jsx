import React, { useEffect, useState } from "react";
import { getQuotesApi } from "../../features/appClockSlice/apiClockSlice";
import { useSelector, useDispatch } from "react-redux";
import "./quote.scss";

export const Quote = () => {
  const dispatch = useDispatch();
  const { quotes, success } = useSelector((state) => state.quotes);
  const detailsInformationTimeAndHideQuote = useSelector(
    (state) => state.toggleFlag.detailsInformationTimeAndHideQuote
  );
  const [randomElementInQuotes, setRandomElementInQuotes] = useState(0);

  useEffect(() => {
    dispatch(getQuotesApi());
  }, [dispatch]);

  const selectQuote = () => {
    if (success) {
      return (
        <div
          className={
            detailsInformationTimeAndHideQuote
              ? "wrapper-quote-none"
              : "wrapper-quote"
          }
        >
          <div>
            <p>{quotes[randomElementInQuotes]["en"]}</p>
            <p>{quotes[randomElementInQuotes]["author"]}</p>
          </div>
          <div>
            <button
              onClick={() => randomQuote()}
              className="button-refresh__quote"
            >
              <img src={"/assets/desktop/icon-refresh.svg"} alt="refresh" />
            </button>
          </div>
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
