import React, { useEffect } from "react";
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
  const { detailsInformationTimeAndHideQuote } = useSelector(
    (state) => state.toggleFlag.detailsInformationTimeAndHideQuote
  );
  useEffect(() => {
    dispatch(getGeoIp());
    dispatch(getWorldTimeApi());
  }, [dispatch]);

  return (
    <main className="time">
      <div className="wrapper-time">
        <div className="actuallyTime">
          <div>
            {(successWorldTime &&
              new Date().getHours(worldTime.datetime) >= 20) ||
            new Date().getHours(worldTime.datetime) <= 5 ? (
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
              onClick={() =>
                dispatch(toggleDetailsInformationTimeAndHideQuote())
              }
              className="button-time"
            >
              more
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
