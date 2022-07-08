import "./A.css";
import Listing from "../Listing/Listing";
import { useEffect, useState, useContext } from "react";

import React from "react";
import { approveToken, getTokenBalance, getTokenDetails } from "../../contractCalls/tokenCalls";
import { AppContext } from "../../context/globalContext";
import { AIRDROP_CONTRACT_ADDRESS } from "../../constants/contract.config";
import { ToastContainer, toast } from "react-toastify";
import { handleCreateAirdrop } from "../../contractCalls/airDrop";
import 'react-toastify/dist/ReactToastify.css';


/* global BigInt */

/*
0xADe6D20dF8f1B395B28696D4D89869963f7293Dc,500
0xc9c58d608103B5a9bEf09EA643A2Abbd78BCD7Cf,400
*/



const Airdrop = () => {
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [distributionList, setDistributionList] = useState("")
  const [tokencontractDetails, setTokenContractDetails] = useState(null)

  const [listOfAddress, setListOfAddress] =  useState([])

  const [listOfValue, setListOfValues] =  useState([])

  const [hasUserApproved, setHasUserApproved] = useState(false)

  const [totalNumberOfTokenToAirdrop, setTotalNumberOfTokenToAirdrop] = useState(0)


  const LENGTH_OF_CONTRACT_ADDRESS =  42


  const {userWallet,isUserConnected} =  useContext(AppContext)



  const getContractDetails = async (tokenAddress)=>{

    try{
      
    const tokenDetails = await getTokenDetails(tokenAddress)

    console.log(tokenDetails)

    setTokenContractDetails({...tokenDetails})
    }
    catch(error){
      alert("There was an error fetching token details ")
    }
  }


  const getUserBalance = async(tokenAddress)=>{
    try{
    
      const userBalance = await getTokenBalance(tokenAddress, userWallet)
      setBalance(userBalance)
    }
    catch(error){
      console.log(error)
    }


  }




  const handleApprove = async ()=>{


    const listOfAddressAndValues = distributionList.split("\n") // Split by line

    if(distributionList.length === 0 ){
      toast("No Values in distribution list  yet")
      return 
    }

    const approveloading =  toast.loading("Approving Tokens.... ")


    const listOfAddresses = []
    
    const listOfValues = []

    let sumOfAmountsToAirdrop =  0

    for (const row  of listOfAddressAndValues){
      const addressAndValue = row.split(",")
      console.log(addressAndValue)
      listOfValues.push(BigInt (addressAndValue[1] * Math.pow(10, tokencontractDetails.tokenDecimals)))
      listOfAddresses.push(addressAndValue[0])
      sumOfAmountsToAirdrop+=Number(addressAndValue[1])
    }

    try{

      console.log(listOfAddresses, listOfValues)
      
       await approveToken(AIRDROP_CONTRACT_ADDRESS, sumOfAmountsToAirdrop,address)

      toast.update(approveloading, {autoClose:1000, render: "Airdrop tokens approved ", isLoading:false, type:"success"})

      setHasUserApproved(true)

      setTotalNumberOfTokenToAirdrop(sumOfAmountsToAirdrop)

      setListOfAddress([...listOfAddresses])
      setListOfValues([...listOfValues])
    }
    catch(error){

      toast.update(approveloading, {autoClose:1000, render: "An issue occured while approving tokens ", isLoading:false, type:"error"})

    }   
  }

  const handleAirdrop  = async ()=>{
    
    const aidropLoading  = toast.loading("Running Airdrop ......")

    try { 
      await handleCreateAirdrop(address, listOfAddress, listOfValue) 

      toast.update(aidropLoading, {autoClose:1000, render: "Airdrop Completed ", isLoading:false, type:"success"})

    } 
    catch(error){
      console.log(error )
      toast.update(aidropLoading, {autoClose:1000, render: "An issue occured while running airdrop ", isLoading:false, type:"error"})

    }
   


  }



  useEffect(()=>{
    if(address.length === LENGTH_OF_CONTRACT_ADDRESS){
      getContractDetails(address)
      getUserBalance(address)
    } 

}, [address])

  return (
    <main className="main">
      <ToastContainer position="top-right" />
\      <div className="mc">
        <div className="ard-b">
          <div className="ardb-t">
            <div className="ard-r1">
              <div className="ard-sn-l">
                <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/bnb.svg?alt=media&token=b29ffb4f-ec5f-4b0d-ba56-66ab350a15db" alt="" />
              </div>
              <span>SmartChain Network</span>
            </div>
          </div>

          <div className="ard-r2">
            <div className="announcement">
              <span className="an-ct">
                Use E-Drop to airdrop your token to all your users with the
                click of a button!
              </span>

              <div className="ad-ins">
                <span className="ad-i-t">Airdrop Instructions:</span>

                <span>-Airdrop tokens to as many users as desired</span>
                <span>
                  -If you are running a sale, make sure tokens are not
                  airdropped until after.
                </span>
                <span>-Enter your token address first</span>
                <span>
                  -Enter a list of users to airdrop followed by amount (comma
                  separated)
                </span>
                <span>
                  YOU MUST seperate each row (address, value) by a new line
                </span>
              </div>
            </div>

            <div className="ard-e-t">
              <div className="ad-dta">
                <div className="ad-fs">Airdrop Fees: 0.25BNB</div>

                <div className="enter-t-ad">
                  <span>Enter Token Address</span>
                  <input type="text" name="" id="" placeholder="Enter here" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                </div>

                <div className="t-bl">
                  <div className="tbl-r">
                    <span>Token Name:</span>
                    <span className="tbpr">{tokencontractDetails !== null ? tokencontractDetails.tokenName :  ""}</span>
                  </div>

                  <div className="tbl-r">
                    <span>Your Balance:</span>
                    <span className="tbpr">{balance.toLocaleString('en-US')}</span>
                  </div>
                </div>
              </div>


              <div className="ent-d-l">
                <textarea
                  name=""
                  id=""
                  disabled={hasUserApproved}
                  placeholder={`Enter DistributionListribution List \n e.g 0xB71b214Cb885500844365E95CD9942C7276E7fD8,500 \n0x6d6247501b822FD4Eaa76FCB64bAEa360279497f,600
                  `}
                  cols="30"
                  rows="10"
                  value={distributionList}
                   onChange={(e)=>setDistributionList(e.target.value)}
                ></textarea>
                <span className="warning">
                  For best results we recommend you do a maximum of 500
                  Adressdresses at a time!
                </span>

                <span>Total tokens being airdropped: {totalNumberOfTokenToAirdrop}</span>
              </div>
            </div>

            <div className="btns ard-b">
              {
                hasUserApproved == false ?   <button onClick={handleApprove} >Approve</button>
: ""
              }

              {
                hasUserApproved ===  true  ? <button className="ard-bt" onClick={handleAirdrop } >Airdrop</button> : ""
              }
              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Airdrop;
