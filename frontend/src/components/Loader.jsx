import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <p>Loading Portfolio...</p>
    </div>
  );
};

export default Loader;
