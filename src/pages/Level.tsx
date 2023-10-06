import React from "react";
import NavBar from "../components/NavBar";

const Level = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="level">
        <a href="/level/easy" className="glass">Easy</a>
        <a href="/level/normal" className="glass">Normal</a>
        <a href="/level/expert" className="glass">Expert</a>
      </div>
    </React.Fragment>
  );
}

export default Level;