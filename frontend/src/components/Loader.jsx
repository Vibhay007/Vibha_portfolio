import "./Loader.css";
import Background from "./Background";   // adjust path if needed

const Loader = () => {
  return (
    <div className="loader">

      <Background />

      <h1 className="brand">Vibha Yadav</h1>

      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <p className="loading-text">Loading Portfolio</p>

    </div>
  );
};

export default Loader;