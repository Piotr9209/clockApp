import React, { useState, useEffect } from "react";
import { getWorldTimeApi } from "../../features/appClockSlice/appClockSlice";
import { useSelector, useDispatch } from "react-redux";

export const ActuallyWorldTime = () => {
  const dispatch = useDispatch();
  const { worldTime, success } = useSelector((state) => state.worldTime);

  useEffect(() => {
    dispatch(getWorldTimeApi());
    console.log(success && worldTime, "<-- worldTime");
    console.log(
      new Date().getHours("2022-04-10T17:17:51.628570+02:00"),
      "<--- date"
    );
  }, [dispatch, success]);
};
