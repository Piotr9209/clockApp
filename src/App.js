import { Quote } from "./components/quotes/Quote";
import { ActuallyGeolocationTimeAndWorldTime } from "./components/actuallyGeolocationTimeAndWorldTime/ActuallyGeolocationTimeAndWorldTime.jsx";
import "./style/reset.scss";

function App() {
  return (
    <>
      <Quote />
      <ActuallyGeolocationTimeAndWorldTime />
    </>
  );
}

export default App;
