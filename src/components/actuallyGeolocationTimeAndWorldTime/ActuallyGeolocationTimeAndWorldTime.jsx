import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWorldTimeApi } from "../../features/appClockSlice/apiClockSlice";
import { getGeoIp } from "../../features/appClockSlice/apiClockSlice";
import { toggleDetailsInformationTimeAndHideQuote } from "../../features/appClockSlice/flagClockSlice";

export const ActuallyGeolocationTimeAndWorldTime = () => {
  const dispatch = useDispatch();
  const { geoLocation, successGeoLocation } = useSelector(
    (state) => state.geoLocationApi
  );
  const { worldTime, successWorldTime } = useSelector(
    (state) => state.worldTime
  );
  const detailsInformationTimeAndHideQuote = useSelector(
    (state) => state.toggleFlag.detailsInformationTimeAndHideQuote
  );
  const [actuallyHoursInWorldTime, setActuallyHoursInWorldTime] = useState(
    new Date().getHours()
  );
  const [
    showAndHideDetailsInformationText,
    setShowAndHideDetailsInformationText,
  ] = useState("more");

  useEffect(() => {
    dispatch(getGeoIp());
    dispatch(getWorldTimeApi());
  }, [dispatch]);

  useEffect(() => {
    detailsInformationTimeAndHideQuote
      ? setShowAndHideDetailsInformationText("less")
      : setShowAndHideDetailsInformationText("more");
  }, [detailsInformationTimeAndHideQuote]);

  const showDetailsInformation = () => {
    dispatch(toggleDetailsInformationTimeAndHideQuote());
  };

  const detailsInformationTime = (successWorldTime, worldTime) => {
    if (successWorldTime) {
      return (
        <div className="wrapper-detailsInformationTime">
          <div>
            <p>current timezone</p>
            <p>{worldTime.timezone}</p>
            <p>day of the year</p>
            <p>{worldTime.day_of_year}</p>
          </div>
          <div>
            <p>day of the week</p>
            <p>{worldTime.day_of_week}</p>
            <p>week number</p>
            <p>{worldTime.week_number}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <span>Loaaading</span>
        </div>
      );
    }
  };
  return (
    <main className="time">
      <div className="wrapper-time">
        <div className="actuallyTime">
          <div>
            {(successWorldTime && actuallyHoursInWorldTime >= 20) ||
            actuallyHoursInWorldTime <= 5 ? (
              <span>
                <img src="" alt="" />
                good evening, it's currently
              </span>
            ) : (
              <span>
                <span>
                  <img src="" alt="" />
                  good morning, it's currently
                </span>
              </span>
            )}
          </div>
          <div>
            <span>
              {successWorldTime &&
                (new Date().getHours(worldTime.datetime) < 10 ? "0" : "") +
                  new Date().getHours(worldTime.datetime)}{" "}
              :{" "}
              {successWorldTime &&
                (new Date().getMinutes(worldTime.datetime) < 10 ? "0" : "") +
                  new Date().getMinutes(worldTime.datetime)}{" "}
              {successWorldTime && worldTime.utc_offset}
            </span>
          </div>
          <div>
            <span>
              in {successGeoLocation && geoLocation.city},{" "}
              {successGeoLocation && geoLocation.country_code}
            </span>
          </div>
        </div>
        <div className="wrapper-button">
          <div>
            <button
              onClick={() => showDetailsInformation()}
              className="button-time"
            >
              {showAndHideDetailsInformationText}
            </button>
          </div>
        </div>
      </div>
      {detailsInformationTimeAndHideQuote &&
        detailsInformationTime(successWorldTime, worldTime)}
    </main>
  );
};
