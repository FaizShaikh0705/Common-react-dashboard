import React, { useState, useEffect, useContext, useRef } from "react";
// import Axios from "axios";
// import { AuthContext } from '../context/Auth';

const Header = () => {
  return (
    <div className="row justify-content-start">
      <div className="col-lg-10">
        <div className="border p-4 shadow">
          <div className="d-flex justify-content-between mb-3">
            <h1 className="mb-4">Welcome to React Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;