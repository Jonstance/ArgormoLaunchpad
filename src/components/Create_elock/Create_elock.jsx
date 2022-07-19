import "../../App.css";
import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import "./Create_elock.css";
import { useState, useContext, useEffect } from "react";

import React from "react";
import { approveToken, getTokenBalance } from "../../contractCalls/tokenCalls";


import {AppContext} from '../../context/globalContext'

import 'react-toastify/dist/ReactToastify.css';

import moment from 'moment'


import { toast, ToastContainer } from "react-toastify";
import { handleCreateLock } from "../../contractCalls/eLock";
import { E_LOCK_CONTRACT_ADDRESS } from "../../constants/contract.config";


const Create_elock = () => {
  const [token, setToken] = useState("")
  const [amount, setAmount] = useState(0)
  const [time, setTime] = useState("")
  const [balance, setBalance] = useState(null)
  const [isLiquidtyToken, setIsLiquidityToken] = useState(false)

  const {userWallet,isUserConnected} =  useContext(AppContext)


  useEffect(()=>{

  },[userWallet])


  const handleSetMaxBalance = async ()=>{


    if(balance !== null){
      setAmount(balance)
      return 
    }

    const loadingToast  = toast.loading("Loading Balance....")

    if(token.trim() === ""  || userWallet.trim() === "" || isUserConnected == false ){
      alert("You need to put in token address first / you are not connected ")
      return 
    }

    try{
      const userBalance = await getTokenBalance(token, userWallet)
      toast.update(loadingToast, {isLoading:false, autoClose:100})
      setBalance(userBalance)
      setAmount(userBalance)
    }
    catch(error){
      console.log(error)
    }

  }

  const handleCreateLockClick = async ()=>{


    if (token.trim() === "" ){
      toast("Token Field is empty")
      return 
    }

    if(amount <= 0 ){
      toast("Amount cannot O or below ")
      return 
    }

    if (userWallet.trim() === "" || isUserConnected === false ){
      toast("You're not connected..., please connect your wallet")
      return 
    }

    if(time.trim() === "" ){
      toast("Time is invalid, please change the time ")
      return 
    }

    console.log(time)

    const loadingToast  = toast.loading("Approving Tokens for Stake ....")


    try{



    const approveTokenRes =  await approveToken(E_LOCK_CONTRACT_ADDRESS, amount, token)

    console.log("Approve Res:",  approveTokenRes)


    toast.update(loadingToast, {render : "Staking...", autoClose:1200, isLoading:true} )

    const unixTime =  new Date(time).getTime() / 1000

    console.log(unixTime)


      const eLockRes =  await handleCreateLock(token, userWallet, isLiquidtyToken, amount, unixTime, "First Stake", approveTokenRes[1])



      toast.update(loadingToast, {autoClose:1000, render: "Staked", isLoading:false, type:"success"})

    }

    catch(error){
      console.log(error)
      toast.update(loadingToast, {autoClose:1000, render: "An issue occured while staking ", isLoading:false, type:"error"})

    }




  }


  return (
    <main className="main">
            <ToastContainer position="top-right" />

      <div className="mc">
        <div className="mc-b elock">
          <div className="rw1">
            <span>Stake</span>
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
              <div className="max" onClick={()=>handleSetMaxBalance()}>MAX</div>
            </div>
          </div>

          <div className="lock-time">
            <div>
              <span className="lt-title">Stake Until (UTC time)</span>
              <span className="ast">*</span>
            </div>
            <input type="datetime-local" name="" id="" onChange={(e)=>setTime(e.target.value)} value={time}/>
          </div>
          <div  style={{display:'flex', paddingTop:20, paddingBottom : 20,  gap:10, flexDirection:'row', alignItems:'center', width:'100%'}} >
          <label htmlFor="lpToken"
          style={{
          color: "var(--font-black)"
        }}
          >Is Liquidity Pool Token ?</label>
            {/* <div>
              <span className="lt-title" style={{
                color: "var(--font-black)"
              }} ></span>
            </div> */}
            <input type="checkbox" name="" value={isLiquidtyToken} id="lpToken" onChange={(e)=>setIsLiquidityToken(e.target.checked)} />
          </div>

          <div className="l-it">
            <span>
              Please exclude Argormo Launchpad staking address 0x7ee0584
              20e5937496fsa984038caA77121ef70cc from fees, rewards, max tx
              amount to start staking tokens.{" "}
            </span>

            <span className="inl">We dont support rebase tokens.</span>
          </div>

          <div className="lsp">You will pay: 0 ETH</div>

          <button className="lb" onClick={()=>handleCreateLockClick()}
          >Stake</button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Create_elock;
