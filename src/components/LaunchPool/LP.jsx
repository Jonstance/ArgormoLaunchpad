import "./LP.css";
import "../../App.css";
import React, {useEffect, useState, useContext} from 'react'
import Listing from "../Listing/Listing";
import Footer from "../Footer/Footer";
import { getOneLaunchPadData } from "../../apiCalls/launchPad";
import { useParams } from "react-router-dom";
import moment from "moment";
import Countdown from "react-countdown";
import { approveToken, getTokenBalance } from "../../contractCalls/tokenCalls";
import { AppContext } from "../../context/globalContext";

import {ToastContainer, toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { BUSD_CONTRACT_ADDRESS } from "../../constants/tokens.config";
import { claimTokensLaunchPad, getLaunchPadContractDetails, handleBuyTokensWithBNB, handleBuyTokensWithBUSD, handlePresaleFinalize } from "../../contractCalls/launchPad";
import { getAllPromotions } from "../../apiCalls/promotions";




const LP = () => {

  const {id} =  useParams()

  const {userWallet, isUserConnected} = useContext(AppContext)


  const [launchPadData, setLaunchPadData] = useState({})

  const [userBalance, setUserBalance] =  useState(null)

  const [amountToBuy, setAmountToBuy]  =  useState(null)

  const [isOwner, setIsOwner]  =  useState(false)

  const [isLaunchPadEndTimeOver, setIsLaunchPadEndTimeOver] =  useState(false)

  const [launchPadContractDetails,setLaunchPadContractDetails] =  useState(null)


  const [promotionsBanner, setPromotionBanner] = useState([])

  const [promotiomHashTag, setPromotionHashTag] =  useState([])

  const getLauncPadData = async ()=>{

    const launchPadDataRes = await getOneLaunchPadData(id)

    if(launchPadDataRes.success){
      setLaunchPadData({...launchPadDataRes.data})
    }
  }

  const handleGetLaunchPadContract = async()=>{
    const launchPadDataRes =  await getLaunchPadContractDetails(launchPadData.presaleAddress, launchPadData.launchPadType)
    console.log(launchPadDataRes)
    setLaunchPadContractDetails({...launchPadDataRes})

  }


  useEffect(()=>{
    if(launchPadData.adminAddress  === userWallet){
      setIsOwner(true)
    }
  }, [launchPadData, userWallet])


  useEffect(()=>{
    handleGetLaunchPadContract()
  },[launchPadData])

  const handleSetMaxBalance = async ()=>{

    if (userBalance !== null){
      setAmountToBuy(userBalance)
      return 
    }

    const loadingToast  = toast.loading("Loading Balance....")

    if( userWallet.trim() === "" || isUserConnected == false ){
      alert("you are not connected ")
      return 
    }

    try{
      const userBalance = await getTokenBalance(BUSD_CONTRACT_ADDRESS, userWallet)
      toast.update(loadingToast, {isLoading:false, autoClose:100})
      setUserBalance(userBalance)
      setAmountToBuy(userBalance)
    }
    catch(error){
      console.log(error)
    }

  }

  const handleBuyTokenBusd = async ()=>{
    if(amountToBuy == null){
      toast(`You have to specify how much${launchPadData.launchPadType} You want to spend`)
      return 
    }


    const loadingToast = toast.loading("Buying Token Presale... ")

    try{
      console.log(launchPadData)
      const tokenPurchaseRes  =  await handleBuyTokensWithBUSD(amountToBuy, launchPadData.presaleAddress)

      console.log(tokenPurchaseRes)
  
      toast.update(loadingToast, {render : "Token Purchased Successfully", isLoading : false, type :'success', autoClose:1500})
    }
    catch(error){
      console.log(error)
      toast.update(loadingToast, {render : "An Error Occured", isLoading : false, type :'error', autoClose:1500})

    }
  }

  const handleBuyTokenBNB = async ()=>{
    if(amountToBuy == null){
      toast(`You have to specify how much${launchPadData.launchPadType} You want to spend`)
      return 
    }


    const loadingToast = toast.loading("Buying Token Presale... ")

    try{
      const tokenPurchaseRes  =  await handleBuyTokensWithBNB(amountToBuy, launchPadData.presaleAddress)

      console.log(tokenPurchaseRes)
  
      toast.update(loadingToast, {render : "Token Purchased Successfully", isLoading : false, type :'success', autoClose:1500})
    }
    catch(error){
      console.log(error)
      toast.update(loadingToast, {render : "An Error Occured", isLoading : false, type :'error', autoClose:1500})

    }
  }


  const handleFinalize = async()=>{
    const loadingToast = toast.loading("Finalizing Presale... ")

    try{
      const finalizeRes = await handlePresaleFinalize(launchPadData.presaleAddress)
      toast.update(loadingToast, {render : "Presale Finalized Successfully", isLoading : false, type :'success', autoClose:1500})
    }

    catch(error){
      console.log(error)
      toast.update(loadingToast, {render : "An Error Occured", isLoading : false, type :'error', autoClose:1500})

    }

  }


  const handleApproveTokenForPurchase = async()=>{

    return new Promise(async(resolve, reject)=>{

      const approveloading =  toast.loading("Approving Tokens.... ")
    
    try{
      
       await approveToken(launchPadData.presaleAddress, amountToBuy, BUSD_CONTRACT_ADDRESS)

      toast.update(approveloading, {autoClose:1000, render: "Presale  tokens approved ", isLoading:false, type:"success"})

    resolve(true)

    }
    catch(error){

      toast.update(approveloading, {autoClose:1000, render: "An issue occured while approving tokens ", isLoading:false, type:"error"})

      reject(false)
    } 

    })
        

  }

  const handleClaimTokens = async()=>{

    return new Promise(async(resolve, reject)=>{

      const approveloading =  toast.loading("Claiming Tokens.... ")
    
    try{
      
       await claimTokensLaunchPad(launchPadData.presaleAddress)

      toast.update(approveloading, {autoClose:1000, render: "Presale  tokens claimed ", isLoading:false, type:"success"})

    resolve(true)

    }
    catch(error){

      toast.update(approveloading, {autoClose:1000, render: "An issue occured while claiming tokens ", isLoading:false, type:"error"})

      reject(false)
    } 

    })
        

  }

  const handleWithdrawContribution = async()=>{

    return new Promise(async(resolve, reject)=>{

      const approveloading =  toast.loading("Withdrawing Contributions.... ")
    
    try{
      
       await claimTokensLaunchPad(launchPadData.presaleAddress)

      toast.update(approveloading, {autoClose:1000, render: "Contributions  withdrawn ", isLoading:false, type:"success"})

    resolve(true)

    }
    catch(error){

      toast.update(approveloading, {autoClose:1000, render: "An issue occured while withdrawing contributions ", isLoading:false, type:"error"})

      reject(false)
    } 

    })
        

  }

  const buyToken = async ()=>{

    if (launchPadData.launchPadType === "BUSD"){
      await handleApproveTokenForPurchase()
      handleBuyTokenBusd()
    }
    else{
      handleBuyTokenBNB()
    }
  }


  useEffect(()=>{
    getLauncPadData()
  },[])


 




  const handleGetPromotions = async ()=>{

    try{
      const promotionsData =  await getAllPromotions()
      if(promotionsData.success){
        const promotionInView = promotionsData.data.filter(eachPromotion=>{
          return eachPromotion.promotionType.trim() === "Banner".trim()
        })

        const hashPromotions  = promotionsData.data.filter(eachPromotion=>{
          return eachPromotion.promotionType.trim() === "Hashtags".trim()
        })

        setPromotionBanner([...promotionInView])
        setPromotionHashTag([...hashPromotions])
      }
    }

    catch(error){
      console.log(error)
    }

  }

  useEffect(()=>{
    handleGetPromotions()
  },[])


  const renderer = (data) => {
    const{ days, hours, minutes, seconds, completed } = data
    if (completed) {
      if(isLaunchPadEndTimeOver === false){
        setIsLaunchPadEndTimeOver(true)
      }
    } 
      // Render a countdown

      return <div className="countdown">
      <div className="t">{days}</div>
      <div className="t">{hours}</div>
      <div className="t">{minutes}</div>
      <div className="t">{seconds}</div>
    </div>    
  };



  return (
    <main className="main mlp">
      <ToastContainer position="top-right" /> 
      {(promotiomHashTag.length>0) && <Listing listings={promotiomHashTag} />}
      <div className="mc lpmc">
        <div className="lct">
          <div className="lct-t">
            <div className="tl">
              <div className="tl-cr">
                {
                 launchPadContractDetails !== null && launchPadData.projectLogoUrl !== "" ? <img src={launchPadData.projectLogoUrl}  style={{
                  height:'50px',
                  width : '50px'
                }} alt="" /> : ""
                }
                
              </div>
              {
                launchPadData.presaleEndTime > Date.now() ?  <div className="sale-status">
                <div className="bullet"></div>
                <span>Sale ongoing</span>
              </div> :  <div className="sale-status" style={{
                backgroundColor  : "red"
              }} >
                <div className="bullet"></div>
                <span>Sale Ended</span>
              </div>
              }
             
            </div>
            {
              launchPadData !== null ? <div className="tr">
              {
                   launchPadData.auditVerified ?   <div className="audit">Audit</div>      : ""
              }

              {
               launchPadData.kycVerified ?  <div className="tr-kyc">KYC</div> : ""
              }
             
            </div>   : ""
            }
            
          </div>

          <div className="project-name">
            <span> {launchPadData.tokenName}  </span>
          </div>

          <div className="project-desc">
            <span>
             {launchPadData.description}
            </span>
          </div>

          <div className="metadata-sect">
            <ul>
              <li>
                <div className="li-l">
                  <span>Presale adresss</span>
                </div>
                <div className="li-r">
                  <span className="add">{launchPadData.presaleAddress}</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Token Name</span>
                </div>
                <div className="li-r">
                  <span> {launchPadData.tokenName} </span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Token Symbol</span>
                </div>
                <div className="li-r">
                  <span>{launchPadData.tokenSymbol} </span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Token Decimals</span>
                </div>
                <div className="li-r">
                  <span>{launchPadData.tokenDecimals} </span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Token Address</span>
                </div>
                <div className="li-r">
                  <span className="add">{launchPadData.tokenAddress} </span>
                  <span className="wr">
                    (Do not send BNB to the token address!)
                  </span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Token Supply</span>
                </div>
                <div className="li-r">
                  <span>{launchPadData.tokenSupply !== undefined ?  launchPadData.tokenSupply.toLocaleString('en-US') : launchPadData.tokenSupply} {launchPadData.tokenSymbol}</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Tokens For Presale</span>
                </div>
                <div className="li-r">
                  <span>{/* Render value here */}HDG</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Min Buy</span>
                </div>
                <div className="li-r">
                  <span>{/* Render value here */}</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Soft Cap</span>
                </div>
                <div className="li-r">
                  <span>{launchPadData.softCap}{launchPadData.launchPadType}</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Presale Start Time</span>
                </div>
                <div className="li-r">
                  <span>  {moment(launchPadData.presaleStartTime *1000 ).format("MMMM Do YYYY, h:mm:ss a")} (UTC)</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Presale End Time</span>
                </div>
                <div className="li-r">
                  <span>{moment(launchPadData.presaleEndTime *1000 ).format("MMMM Do YYYY, h:mm:ss a")} (UTC)</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Listing On</span>
                </div>
                <div className="li-r">
                  <span className="add">{/* Render value here */}</span>
                </div>
              </li>

              <li>
                <div className="li-l">
                  <span>Liquidity Percent</span>
                </div>
                <div className="li-r">
                  <span>{launchPadData.liquidityPercentage}%</span>
                </div>
              </li>

              {/* <li>
                <div className="li-l">
                  <span>Liquidity Lockup Time</span>
                </div>
                <div className="li-r">
                  <span></span>
                </div>
              </li> */}
            </ul>
          </div>

          <div className="tmt-sect">
            <div className="title">
              <span>Token metrics</span>
            </div>

            <div className="chart">
              <div className="lcard">
                <div className="lctop">
                  <span>% of tokens</span>
                </div>
                <div className="bt">
                  <div className="c1">
                    <div className="lv">80</div>
                    <div className="lv">60</div>
                    <div className="lv">40</div>
                    <div className="lv">20</div>
                    <div className="lv">0</div>
                  </div>
                  {/* You can dynamically increase the heights of the divs below to integrate the chart*/}
                  <div className="c2"></div>
                  <div className="c3"></div>
                  <div className="c4"></div>
                </div>
              </div>

              <div className="rard">
                <div className="row">
                  <span>Presale</span>
                </div>

                <div className="row">
                  <div className="s"></div>
                  <span>Liquidity</span>
                </div>

                <div className="row">
                  <div className="t"></div>
                  <span>Unlocked</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rct">
          <div className="rpt">
            <div className="ens">
              <span>Ensure you are on our official Argormo website</span>
            </div>

            <span className="et">{ isLaunchPadEndTimeOver=== false ?   "Presale will end in" : "Presale has ended "}</span>

           <Countdown renderer={renderer} date={ launchPadData.presaleEndTime !== undefined ?  launchPadData.presaleEndTime * 1000  : Date.now() + 1000000  } />

            {/* The div below is the flow bar */}
            <div className="flow-bar">
              {/* Increase the width of the div below using a variable, to progress the bar. 
                The width is set using percentage */}
              <div className="div-to-increase-bar"></div>
            </div>

            <div className="bar-value">
              <span className="vl">{/* Render value here */} BNB</span>
              <span className="vr">{/* Render value here */} BNB</span>
            </div>

                {
                  isLaunchPadEndTimeOver === false ? <>
                   <div className="amount">
              <span>Amount</span>
              <div className="input-wp">
                <input type="text"  value={amountToBuy}  onChange={(event)=>{
                  setAmountToBuy(event.target.value)
                }} />
                <div className="max"
                onClick={handleSetMaxBalance}
                >Max</div>
              </div>
            </div>

            <div className="bwb">
              <div
              onClick={buyToken}
              >
                <img src="icons/check.svg" alt="" />
                <span>Buy with {launchPadData.launchPadType}</span>
              </div>
            </div>
                  </> : <>
                  <div style={{
                    display : 'flex',
                    flexWrap : 'wrap',
                    gap:'5px',
                    width : "100%"
                  }} >
                    <div className="bwb" >
                    <div
                    style={{
                      width : 'auto',
                      paddingRight : '10px'
                    }}
                    onClick={handleWithdrawContribution}
                    >
                <img src="icons/check.svg" alt="" />
                <span>Withdraw Contribution</span>
              </div>
            </div>

            <div className="bwb" >
                    <div
                    onClick={handleClaimTokens}
                    >
                <img src="icons/check.svg" alt="" />
                <span>Claim Tokens</span>
              </div>
            </div>
            
                  </div>

                  
                  </>
                }
           
            {
              isOwner ?  <>
              <br /><br />
              <p style={{
             color: "var(--font-black)"

              }} >Presale Creator -  Section</p>
               <br /><br />
               {
                 launchPadContractDetails !== null && launchPadContractDetails.presaleFinalized === false  ?  <div className="bwb">
                 <div
                 onClick={handleFinalize}
                 >
                   <img src="icons/check.svg" alt="" />
                   <span>Finalize Pre Sale  </span>
                 </div>
               </div> : ""
               }
           
              </> : ""
            }

            </div>
           
          <div className="rpb">
            <ul>
              {/* <li>
                <div className="x">Current Rate</div>
                <div className="y"></div>
              </li> */}

              <li>
                <div className="x">Total Contributions</div>
                <div className="y">{ launchPadContractDetails === null ? "" : launchPadContractDetails.totalReceived  } {launchPadData.launchPadType} </div>
              </li>
              <li>
                <div className="x">Total Tokens Bought </div>
                <div className="y">{ launchPadContractDetails === null ? "" : launchPadContractDetails.totalTokensBought  } {launchPadData.tokenSymbol} </div>
              </li>
{/* 
              <li>
                <div className="x">Your Contributions Amount</div>
                <div className="y"></div>
              </li> */}
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default LP;
