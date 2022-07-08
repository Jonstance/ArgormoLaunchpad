import "../../App.css";
import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import "../Create_elock/Create_elock.css";
import React, { useState } from "react";

const Edit_lock = () => {
    const [token, setToken] = useState(null)
    const [amount, setAmount] = useState(null)
    const [time, setTime] = useState(null)
    const [balance, setBalance] = useState(237)
    return (
      <main className="main">
        <div className="mc">
          <div className="mc-b elock">
            <div className="rw1">
              <span>Edit your lock</span>
            </div>
    
            <div className="certified">
              <span>Argormo is certified by Certik:</span>
            </div>
    
            <div className="text-row ltr">
              <div className="title elt">
                <label htmlFor="ta" className="l2">
                  Token or LP Token address
                </label>
                <span className="l2s">*</span>
              </div>
              <input type="text" placeholder="Enter token or LP token address" onChange={(e)=>setToken(e.target.value)} value={token}/>
            </div>
    
            <div className="text-row ltr">
              <div className="title elt">
                <label htmlFor="ta" className="l2">
                  Amount
                </label>
                <span className="l2s">*</span>
              </div>
              <div className="input-wp rdv">
                <input type="text" placeholder="Enter Amount" onChange={(e)=>setAmount(e.target.value)} value={amount}/>
                <div className="max" onClick={()=>setAmount(balance)}>MAX</div>
              </div>
            </div>
    
            <div className="lock-time">
              <div>
                <span className="lt-title">Lock Until (UTC time)</span>
                <span className="ast">*</span>
              </div>
              <input type="datetime-local" name="" id="" onChange={(e)=>setTime(e.target.value)} value={time}/>
            </div>
    
            <div className="l-it">
              <span>
                Please exclude E-locks lockup address 0x7ee0584
                20e5937496fsa984038caA77121ef70cc from fees, rewards, max tx
                amount to start locking tokens.{" "}
              </span>
    
              <span className="inl">We dont support rebase tokens.</span>
            </div>
    
            <div className="lsp">You will pay: 0 BNB</div>
    
            <button className="lb" onClick={()=>console.log(token, time, amount)}>Lock</button>
          </div>
        </div>
        <Footer />
      </main>
    );
}

export default Edit_lock