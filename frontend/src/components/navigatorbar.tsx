import "./navigator.css";

// Navigator.tsx
import React from "react";

import { Link } from "react-router-dom";

const Navigator: React.FC = () => {
  return (
    <div className="navigator">
      <Link to="/" className="nav-button">
        Home
      </Link>
      <Link to="/transactions" className="nav-button">
        History
      </Link>
    </div>
  );
};

export default Navigator;
