import "../../App.css";
import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import "./ulk.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../../context/globalContext";
import { handleGetAllLPLocksForUser, handleGetAllNormalUserLocks } from "../../contractCalls/eLock";
import { toast, ToastContainer } from "react-toastify";
import { getTokenDetails } from "../../contractCalls/tokenCalls";
const User_lock = () => {
  const [userLockExists, setUserLockExists] = useState(false);
  

  const [allTokenDetails, setAllTokenDetails] =  useState([])

  const [locks, setLocks] =  useState([])


  const {userWallet, isUserConnected} =  useContext(AppContext)


  const handleTokenData =  async (addressDetailToFetch)=>{
    const promiseData = []

    addressDetailToFetch.map(eachAddress=>{
      promiseData.push(getTokenDetails(eachAddress))
    })

    try{
      const promiseResponse = await Promise.all(promiseData)


      console.log(promiseResponse)

      let tokenDetails = {

      }

      promiseResponse.map(eachTokenData=>{
        let tokenData = {
          name : eachTokenData.tokenName,
          symbol : eachTokenData.tokenSymbol,
          decimals : eachTokenData.tokenDecimals
        }

        tokenDetails[eachTokenData.tokenAddress] = tokenData
      })

      setAllTokenDetails({...tokenDetails})

      console.log(tokenDetails)

      // setAllTokenDetails([...promiseResponse])

    }
    catch(error){
      console.log(error)
    }


    

  }

  const handleGetUserLocks = async ()=>{
    
    console.log(userWallet)

    try{
      const userNormalLocks  = handleGetAllNormalUserLocks(userWallet)
      const userLpLocks =  handleGetAllLPLocksForUser(userWallet)

      const promiseData = await Promise.all([userNormalLocks, userLpLocks])

      console.log(promiseData)

      const allLocks = [...promiseData[0], ...promiseData[1]]

      console.log(allLocks)

      const allTokensToFetchData = []

      allLocks.map(eachLock=>{
        if(allTokensToFetchData.includes(eachLock.token)){
          return 
        }

        allTokensToFetchData.push(eachLock.token)

      })



      console.log(allTokensToFetchData)

      setLocks([...allLocks])

      if(allLocks.length > 0 ){
        handleTokenData(allTokensToFetchData)
        setUserLockExists(true)
      }


    }
    catch(error){
      console.log(error)
      toast("There was an error fetching your Locks")
    }



  }

  useEffect(()=>{
    if(userWallet.trim() !== "" ){
      handleGetUserLocks()
    }    
  },[userWallet])


  return (
    <main className="main">
      <ToastContainer position="top-right" />
      <div className="mc">
        <div className="mc-b user-lock">
          <div className="lk-wrp">
          <div className="lk-hdr">
                  <span>Token</span>
                  <span>Amount</span>
                </div>
            {userLockExists && locks.length > 0 ?             
            <div className="lk-wrp" >
              {
                locks.map((eachLock, index)=>{
                  return <div className="record" key={index} >
                  <div className="tk-n-s">
                    <div className="rtkn">{ allTokenDetails[eachLock.token] === undefined ? "" : allTokenDetails[eachLock.token].name}</div>
                    <div className="tk-symb"></div>
                  </div>
                  <div className="tk-amount"> { allTokenDetails[eachLock.token] === undefined ?  eachLock.amount.toString() : eachLock.amount.toString() / Math.pow(10, allTokenDetails[eachLock.token].decimals)}  { allTokenDetails[eachLock.token] === undefined ? "" : allTokenDetails[eachLock.token].name}</div>
                  <div className="vw-tk">
                    <Link to={`/lock_info/${eachLock.id}`} className="vw-lk">
                      {" "}
                      View
                    </Link>
                  </div>
                </div>
                })
              }
            </div>

            
: "" }


            {/* -------------------------------------------------------------- */}

            {(!userLockExists) && (
              <>
              <div className="nlwp">
                <span>
                  You have no lock
                </span>
              </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default User_lock;
