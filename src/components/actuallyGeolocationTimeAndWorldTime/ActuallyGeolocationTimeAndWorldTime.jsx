import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getWorldTimeApi } from "../../features/appClockSlice/apiClockSlice";
import { getGeoIp } from "../../features/appClockSlice/apiClockSlice";
import { toggleDetailsInformationTimeAndHideQuote } from "../../features/appClockSlice/flagClockSlice";
import "./actuallyGeolocationTimeAndWorldTime.scss";

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

  useEffect(() => {
    if (
      (successWorldTime && actuallyHoursInWorldTime >= 20) ||
      actuallyHoursInWorldTime <= 5
    ) {
      document.body.classList.remove("day");
      document.body.classList.add("night");
    } else {
      document.body.classList.remove("night");
      document.body.classList.add("day");
    }
  }, [actuallyHoursInWorldTime, successWorldTime]);

  const detailsInformationTime = (successWorldTime, worldTime) => {
    if (successWorldTime) {
      return (
        <div
          className={
            detailsInformationTimeAndHideQuote
              ? "wrapper-detailsInformation"
              : ""
          }
        >
          <div>
            <p className="detailsInformation-categoryInfo">current timezone</p>
            <p className="detailsInformation-nameInfo">{worldTime.timezone}</p>
            <p className="detailsInformation-categoryInfo">day of the year</p>
            <p className="detailsInformation-nameInfo">
              {worldTime.day_of_year}
            </p>
          </div>
          <div>
            <p className="detailsInformation-categoryInfo">day of the week</p>
            <p className="detailsInformation-nameInfo">
              {worldTime.day_of_week}
            </p>
            <p className="detailsInformation-categoryInfo">week number</p>
            <p className="detailsInformation-nameInfo">
              {worldTime.week_number}
            </p>
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
    <>
      <main className="time">
        <div className="wrapper-time">
          <div className="actually-time">
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
              <p>
                {successWorldTime &&
                  (new Date().getHours(worldTime.datetime) < 10 ? "0" : "") +
                    new Date().getHours(worldTime.datetime)}{" "}
                :{" "}
                {successWorldTime &&
                  (new Date().getMinutes(worldTime.datetime) < 10 ? "0" : "") +
                    new Date().getMinutes(worldTime.datetime)}{" "}
                <span>{successWorldTime && worldTime.utc_offset}</span>
              </p>
            </div>
            <div>
              <p>
                in {successGeoLocation && geoLocation.city},{" "}
                {successGeoLocation && geoLocation.country_code}
              </p>
            </div>
          </div>
          <div className="wrapper-button">
            <div>
              <button
                onClick={() => showDetailsInformation()}
                className="button-time"
              >
                {showAndHideDetailsInformationText}{" "}
                <img
                  src={"/public/assets/desktop/icon-arrow-down.svg"}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        </div>
      </main>
      {detailsInformationTimeAndHideQuote &&
        detailsInformationTime(successWorldTime, worldTime)}
    </>
  );
};
