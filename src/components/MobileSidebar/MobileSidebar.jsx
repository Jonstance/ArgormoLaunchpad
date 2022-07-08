import "./Ms.css";
import Sidebar from "../Sidebar/Sidebar";

import React from "react";


const MobileSidebar = ({ sidebar, setSidebar, lightTheme, darkTheme }) => {
  return (
    <>
      {sidebar && (
        <div
          className="ms"
          onClick={(e) => {
            if (e.currentTarget !== e.target) {
              return;
            } else {
              setSidebar(false);
            }
          }}
        >
          <Sidebar
            setSidebar={setSidebar}
            lightTheme={lightTheme}
            darkTheme={darkTheme}
          />
        </div>
      )}
    </>
  );
};

export default MobileSidebar;
