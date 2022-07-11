import { Link } from "react-router-dom";
import { useState, useRef, useContext, useEffect } from "react";
import React from "react";
import "./Navbar.css";

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";
import { AppContext } from "../../context/globalContext";
import {
  clearLocalStorage,
  createLocalStorage,
  readLocalStorage,
} from "../../utils/localStorage";
import { handleLogin, handleLogoutAPI } from "../../apiCalls/auth";
import { checkAdminAuthStatusAPI } from "../../apiCalls/admin";

const Navbar = ({ setNetModal, setWalModal, sidebar, setSidebar }) => {
  // const [showDrop, setShowDrop] = useState(false);
  const dropRef = useRef();

  const {
    isUserConnected,
    setIsUserConnected,
    userWallet,
    setUserWallet,
    isAdmin,
    setIsAdmin,
  } = useContext(AppContext);

  const loginWithServer = async (userAddress) => {
    await handleLogin(userAddress);
  };

  const checkAdminAuthStatus = async () => {
    const adminStatus = await checkAdminAuthStatusAPI();
    try {
      if (adminStatus.success) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.log(error);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    const userAccountDetails = readLocalStorage();
    console.log(userAccountDetails);
    if (userAccountDetails == null) {
      setIsUserConnected(false);
      return;
    }

    setIsUserConnected(userAccountDetails.connected);

    setUserWallet(userAccountDetails.userAddress);

    loginWithServer(userAccountDetails.userAddress);

    checkAdminAuthStatus();
  }, []);

  const handleClick = (e) => {
    window.scrollTo(0, 0);
    e.stopPropagation();
    dropRef.current.style.visibility = "hidden";
    // setShowDrop(false);
    // console.log(e)
  };

  const createClick = (e) => {
    dropRef.current.style.visibility = "visible";
    setTimeout(() => {
      dropRef.current.style.visibility = "hidden";
    }, 5000);
  };

  const hamClick = () => {
    const main = document.querySelector(".main");
    if (sidebar) {
      setSidebar(false);
      main.style.width = "100%";
    } else {
      setSidebar(true);
      if (!(window.innerWidth <= "900")) {
        main.style.width = "calc(100% - 200px)";
      }
    }
  };

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        qrcodeModalOptions: {
          mobileLinks: [
            "rainbow",
            "metamask",
            "argent",
            "trust",
            "imtoken",
            "pillar",
          ],
        },
      },
    },
  };

  const handlePopUpConnectionChoice = async () => {
    const web3Modal = new Web3Modal({
      network: "mainnet",
      theme: "light",
      cacheProvider: false,
      providerOptions: providerOptions,
    });

    web3Modal.clearCachedProvider();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    console.log(provider);
    const signer = provider.getSigner();
    console.log(signer);
    const userAccount = await signer.getAddress();
    console.log(userAccount);
    setUserWallet(userAccount);
    setIsUserConnected(true);
    createLocalStorage(userAccount, true);
  };

  const handleLogout = async () => {
    const logoutRes = await handleLogoutAPI();
    if (logoutRes.success == false) {
      return;
    }

    clearLocalStorage();
    setIsUserConnected(false);
    setUserWallet("");
  };

  return (
    <div className="nav">
      <Link to="/">
        <div className="ls" onClick={()=>window.scrollTo(0,0)}>
          <div className="logo-cont">
            <div className="logo">
              <img
                src={process.env.PUBLIC_URL+"images/argormo.png"}
                alt="Argormo Logo"
              />
            </div>
          </div>
        </div>
      </Link>
      {/* <svg stroke="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z" stroke="#C9C8C5" fill="#C9C8C5" stroke-width="0px"></path></svg> */}
      <div className="drop-wrpr">
          <div className="cr_bt" onClick={createClick}>
            <span className="fs">Create</span>
          </div>

          <div
            tabIndex="0"
            ref={dropRef}
            className="options"
            style={{ tabIndex: 0 }}
          >
            <ul>
              <li onClick={handleClick}>
                <Link to="create_epad" className="ul-link">
                  Launch Pad
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link to="fairlaunch" className="ul-link">
                  Fair Launch
                </Link>
              </li>
              <li onClick={handleClick}>
                <Link to="create_token" className="ul-link">
                  Token
                </Link>
              </li>
             
              <li onClick={handleClick}>
                <Link to="E_pad_list" className="ul-link">
                  E-pad
                </Link>
              </li>
            </ul>

          </div>
        </div>
        <div>
        <span className="fs">
        <Link to="E_pad_list" className="ul-link">
                  Explore
                </Link>
        </span>
        </div>

        <div>
        <span className="fs">
        <Link to="Staking" className="ul-link">
                  Staking
                </Link>
        </span>
        </div>
      
      <div className="rs">
        <div
          className="cn_bt"
          onClick={() => {
            if (isUserConnected) {
              handleLogout();
              return;
            }
            handlePopUpConnectionChoice();
          }}
        >
          {isUserConnected == false || userWallet.trim() === ""
            ? "Connect"
            : `${userWallet.slice(0, 4)}...${userWallet.slice(
                userWallet.length - 4,
                userWallet.length
              )}`}
        </div>

        
        <div
          className="b_bt"
          onClick={() => {
            setNetModal(true);
            setWalModal(false);
          }}
        >
          <div className="btimg">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/eth.svg?alt=media&token=e5f2d2c3-81f1-45dc-966b-d39792df27d1"
              alt="ETH LOGO"
            />
          </div>
          <span>ETH TESTNET</span>
        </div>
        <div className="ham" onClick={hamClick}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M904 160H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0 624H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8zm0-312H120c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
