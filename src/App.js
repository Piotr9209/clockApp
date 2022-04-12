import { Quote } from "./components/quotes/Quote";
import { ActuallyGeolocationTimeAndWorldTime } from "./components/actuallyGeolocationTimeAndWorldTime/ActuallyGeolocationTimeAndWorldTime.jsx";
import "./reset.scss";

function App() {
  return (
    <>
      <Quote />
      <ActuallyGeolocationTimeAndWorldTime />
    </>
  );
}

export default App;
