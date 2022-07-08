import "./ConnectWalletModal.css";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/globalContext";

import { useLocation } from "react-router-dom";

const ConnectWalletModal = () => {
  const location = useLocation();

  const [shouldUserConnect, setShouldUserConnect] = useState(false);

  const routesThatDonotNeedConnection = [
    "/",
    "/E_pad_list",
    "/admin",
    "/admin/pools",
    "/admin/promotions",
    "/admin/new"
  ]

  const doesLocationNeedConnection =  routesThatDonotNeedConnection.includes(location.pathname) == false  || location.pathname.includes("/launchPool")

  const { isUserConnected } = useContext(AppContext);

  useEffect(() => {
    if (doesLocationNeedConnection == true && isUserConnected == false) {
      setShouldUserConnect(true);
      document.body.style.overflow = "hidden";
    } else {
      setShouldUserConnect(false);
      document.body.style.overflowY = "scroll";
    }
    if (window.innerWidth < 900) {
      setModalWidth("100%");
    }
  }, [doesLocationNeedConnection, isUserConnected, location]);

  const [modalWidth, setModalWidth] = useState("calc(100% - 200px)");
  window.addEventListener("resize", () => {
    if (window.innerWidth < 900) {
      setModalWidth("100%");
    } else {
      setModalWidth("calc(100% - 200px)")
    }
  });
  return (
    <>
      {shouldUserConnect ? (
        <div className="cw-wp" style={{ width: `${modalWidth}` }}>
          Please connect your wallet to continue
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default ConnectWalletModal;
