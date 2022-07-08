import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Redirect } from "react-router-dom";
import Home from "./components/Home/Home";
import LP from "./components/LaunchPool/LP";
import CreateToken from "./components/Create_token/CreateToken";
import Create_epad from "./components/Create_epad/Create_epad";
import Create_elock from "./components/Create_elock/Create_elock";
import E_pad_list from "./components/E_pad_list/E_pad_list";
import "./App.css";
import React, { useState, useEffect } from "react";
import Connect_network from "./components/Connect_network/Connect_network";
import Connect_wallet from "./components/Connect_wallet/Connect_wallet";
import Staking from "./components/Staking/Staking";
import Airdrop from "./components/Airdrop/Airdrop";
import GlobalContext from "./context/globalContext";
import Lock_info from "./components/lock_info/Lock_info";
import Edit_Lock from "./components/Edit_lock/Edit_lock";
import User_lock from "./components/User_lock/User_lock";
import Login from "./components/Login/Login";
import FairLaunch from "./components/Fairlaunch/FairLaunch";
import AdminPools from "./components/AdminPools/AdminPools";
import Promotions from "./components/Promotions/Promotions/Promotions";
import New_Promotions from "./components/New_promotion/New_promotion";
import ConnectWalletModal from "./components/ConnectWalletModal/ConnectWalletModal";

function App() {
  const [netModal, setNetModal] = useState(true);
  const [walModal, setWalModal] = useState(true);

  const [shouldUserConnect, setShouldUserConnect] = useState(true);
  setInterval(() => {
    const main = document.querySelector(".main");
    if (
      window.location.href == "https://Argormo.finance/" 
    ) {
      if(window.innerWidth<900){
      main.style.width = "100%";
      } else {
      }
    }
  }, 30);
  
  useEffect(() => {
    const main = document.querySelector(".main");
    if (window.innerWidth > 900) {
    }
    let theme = localStorage.getItem("theme");
    if (theme == null) {
      return;
    } else {
      theme == "light" ? lightTheme() : darkTheme();
    }
  });

  window.addEventListener("resize", () => {
    const main = document.querySelector(".main");
    if (window.innerWidth < 900) {
      main.style.width = "100%";
    } else {
    }
  });
  const darkTheme = () => {
    const root = document.querySelector(":root");
    root.style.setProperty("--bg-white", "rgb(37, 37, 37)");
    root.style.setProperty("--bg-black", "white");
    root.style.setProperty("--font-white", "black");
    root.style.setProperty("--font-black", "white");
    root.style.setProperty("--card-light-bg", "rgb(94, 93, 93)");
    root.style.setProperty("--pc-border", "none");
    root.style.setProperty("--nav-bt-white-bg", "rgb(94, 93, 93)");
    root.style.setProperty("--nav-bt-blue-font", "white");
    root.style.setProperty("--modal-font", "white");
    root.style.setProperty("--modal-top", "rgb(65, 65, 65)");
    root.style.setProperty("--input-border", "black");
    root.style.setProperty("--input-bg", "rgb(65, 65, 65)");
    root.style.setProperty("--warn-1-border", "#b9b9b9");
    root.style.setProperty("--warn-1-bg", "#1313138a");
    root.style.setProperty("--cert-bg", "#D4A838");
    root.style.setProperty("--e-list-s-font", "#87ff4f");
    root.style.setProperty("--l-c-l-bg", "rgb(94, 93, 93)");
    root.style.setProperty("--v-lt", "#fffc2f");
    root.style.setProperty("--list-font", "rgb(174, 200, 252)");
    localStorage.setItem("theme", "dark");
  };

  const lightTheme = () => {
    const root = document.querySelector(":root");
    root.style.setProperty("--bg-black", "black");
    root.style.setProperty("--bg-white", "white");
    root.style.setProperty("--font-black", "black");
    root.style.setProperty("--font-white", "white");
    root.style.setProperty("--card-light-bg", "#e9f3f9");
    root.style.setProperty("--pc-border", "1px solid #45b4ff");
    root.style.setProperty("--nav-bt-white-bg", "white");
    root.style.setProperty("--nav-bt-blue-font", "#D4A838");
    root.style.setProperty("--modal-font", "#D4A838");
    root.style.setProperty("--modal-top", "white");
    root.style.setProperty("--input-border", "#D4A838");
    root.style.setProperty("--input-bg", "white");
    root.style.setProperty("--warn-1-border", "#FFF5A3");
    root.style.setProperty("--warn-1-bg", "#FDFAE1");
    root.style.setProperty("--cert-bg", "#DDFFF1");
    root.style.setProperty("--e-list-s-font", "silver");
    root.style.setProperty("--l-c-l-bg", "white");
    root.style.setProperty("--v-lt", "#ff2f2f");
    root.style.setProperty("--list-font", "#0366a8");
    localStorage.setItem("theme", "light");
  };

  // if(!sidebar) document.querySelector(".main").style.width="100%"
  return (
    <BrowserRouter>
      <GlobalContext>
        
        <Navbar
          setNetModal={setNetModal}
          setWalModal={setWalModal}
        />
        {netModal && !walModal && <Connect_network setNetModal={setNetModal} />}
        {walModal && !netModal && <Connect_wallet setWalModal={setWalModal} />}

        <ConnectWalletModal
          shouldUserConnect={shouldUserConnect}
          setShouldUserConnect={setShouldUserConnect}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Launchpool" element={<LP />} /> */}
          <Route path="/Launchpool/:id" element={<LP />} />
          <Route path="/create_token" element={<CreateToken />} />
          <Route path="/create_epad" element={<Create_epad />} />
          <Route path="/create_elock" element={<Create_elock />} />
          <Route path="/E_pad_list" element={<E_pad_list />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/airdrop" element={<Airdrop />} />
          <Route path="/lock_info/:id" element={<Lock_info />} />
          <Route path="/edit_lock" element={<Edit_Lock />} />
          <Route path="/user_lock" element={<User_lock />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/fairlaunch" element={<FairLaunch />} />
          <Route path="/admin/pools" element={<AdminPools />} />
          <Route path="/admin/promotions" element={<Promotions />} />
          <Route path="/admin/new" element={<New_Promotions />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </GlobalContext>
    </BrowserRouter>
  );
}

export default App;
