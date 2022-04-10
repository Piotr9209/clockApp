import React, { useEffect } from "react";
import { getGeoIp } from "../../features/appClockSlice/apiClockSlice";
import { useSelector, useDispatch } from "react-redux";

export const ActuallyGeolocationTime = () => {
  const dispatch = useDispatch();
  const { geoLocation, success } = useSelector((state) => state.geoLocationApi);

  useEffect(() => {
    dispatch(getGeoIp());
    console.log(success && geoLocation, "<--- geoLocation API");
  }, [dispatch, success]);
  return <div>Hello Geolocation</div>;
};
