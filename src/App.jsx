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
    
  });

  window.addEventListener("resize", () => {
    const main = document.querySelector(".main");
    if (window.innerWidth < 900) {
      main.style.width = "100%";
    } else {
    }
  });
  
 

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
