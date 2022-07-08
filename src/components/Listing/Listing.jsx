import "./Listing.css";
import { Link } from "react-router-dom";

import React from "react";


const Listing = ({listings}) => {
  return (
    <div className="List_wrapper">
      <div className="icon">
        <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/listings.svg?alt=media&token=c6a85f40-8cd6-4ba6-bb80-de607688dcae" />
      </div>

      {/* All the listing links should be mapped below. This ones are hardcoded */}
      {
        listings.length > 0 ? <div className="listings">
        {
          listings.map((eachList, index)=>{
            return  <div className="listing-link">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="id">#{index + 1}</span>
              <span className="link">{eachList.projectSymbol}</span>
            </Link>
          </div>
          })
        }
  
      </div> : ""
      }
     
    </div>
  );
};

export default Listing;
