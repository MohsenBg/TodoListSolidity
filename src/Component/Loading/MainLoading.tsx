import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../../assets/other/Gear-0.3s-200px.svg";
import { initialState } from "../../Redux/store";
import "./MainLoading.scss";
const MainLoading = () => {
  const [dotCount, setDotCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      if (dotCount < 3) {
        setDotCount(dotCount + 1);
      } else {
        setDotCount(0);
      }
    }, 800);
  }, [dotCount]);

  const loading = useSelector(
    (state: typeof initialState) => state.Loading.Loading
  );
  return (
    <>
      {loading ? (
        <div className="BackgroundLoading">
          <img src={Loading} alt="MainLoading" />
          <span className="textLoading">
            Loading
            {dotCount === 1
              ? "."
              : dotCount === 2
              ? ".."
              : dotCount === 3
              ? "..."
              : null}
          </span>
        </div>
      ) : null}
    </>
  );
};

export default MainLoading;
