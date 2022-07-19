import "../../App.css";
import "./Create.css";
import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import React, { useState, useRef, useEffect } from "react";
import { AppContext } from "../../context/globalContext";
import { useContext } from "react";
import { Link , useNavigate } from "react-router-dom";

import {ToastContainer, toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';
import { BNB_FACTORY_ADDRESS, BUSD_FACTORY_ADDRESS } from "../../constants/contract.config";
import { approveToken, getTokenBalance, getTokenDetails } from "../../contractCalls/tokenCalls";
import { handleCreateEPadBNB, handleCreateEPadBUSD } from "../../contractCalls/launchPadFactory";
import { saveLaunchPad } from "../../apiCalls/launchPad";


const Create = () => {
  const { isUserConnected } = useContext(AppContext);
  const [offset, setOffset] = useState(0);
  const [h1, setH1] = useState(0);
  const [h2, setH2] = useState(0);
  const [h3, setH3] = useState(0);
  const [h4, setH4] = useState(0);
  const [h5, setH5] = useState(0);
  const [h6, setH6] = useState(0);

  const wrapper = useRef();
  const child1 = useRef();
  const child2 = useRef();
  const child3 = useRef();
  const child4 = useRef();
  const child5 = useRef();
  const child6 = useRef();

  const [name, setName] = useState("");
  const [tokenAd, setTokenAd] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState(null);
  const [currency, setCurrency] = useState("");

  const [presaleRate, setPresaleRate] = useState("");
  const [whitelist, setWhitelist] = useState("");
  const [softcap, setSoftcap] = useState("");
  const [hardcap, setHardcap] = useState(null);
  const [minimumBuy, setMinimumBuy] = useState("");
  const [maximumBuy, setMaximumBuy] = useState("");
  const [refundType, setRefundType] = useState("0");
  const [router, setRouter] = useState("");
  const [liquidity, setLiquidity] = useState(null);
  const [listingRate, setListingRate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lockup, setLockup] = useState("");

  // const [TTVT, setTTVT] = useState("");
  // const [FTRAL, setFTRAL] = useState("");
  // const [FTR, setFTR] = useState("");
  // const [vestingPeriod, setVestingPeriod] = useState("");
  // const [TTREC, setTTREC] = useState("");

  // const [FRFP, setFRFP] = useState("");
  // const [VPEC, setVPEC] = useState("");
  // const [PTREC, setPTREC] = useState("");

  const [logo, setLogo] = useState("");
  const [web, setWeb] = useState("");
  const [twitter, setTwitter] = useState("");
  const [fb, setFb] = useState("");
  const [insta, setInsta] = useState("");
  const [TG, setTG] = useState("");
  const [github, setGithub] = useState("");
  const [discord, setDiscord] = useState("");
  const [reddit, setReddit] = useState("");
  const [desc, setDesc] = useState("");
  const [feeOption, setFeeOption] = useState("");

  const [userBalance, setUserBalance] =  useState(0)

  const [tokenDetails, setTokenContractDetails] =  useState(null)
  //Please leave the expressions below untouched, they're very important

  const LENGTH_OF_CONTRACT_ADDRESS =  42


  const navigator =  useNavigate()


  const {userWallet} = useContext(AppContext)


  useEffect(() => {
    let el1 = window.getComputedStyle(child1.current);
    let el1H = el1.height;
    setH1(el1H.slice(0, -2));

    let el2 = window.getComputedStyle(child2.current);
    let el2H = el2.height;
    setH2(el2H.slice(0, -2));

    // let el3 = window.getComputedStyle(child3.current);
    // let el3H = el3.height;
    // setH3(el3H.slice(0, -2));

    // let el4 = window.getComputedStyle(child4.current);
    // let el4H = el4.height;
    // setH4(el4H.slice(0, -2));

    let el5 = window.getComputedStyle(child5.current);
    let el5H = el5.height;
    setH5(el5H.slice(0, -2));

    let el6 = window.getComputedStyle(child6.current);
    let el6H = el6.height;
    setH6(el6H.slice(0, -2));
  }, []);


  const handleGoToFillDetails = ()=>{
    setOffset(offset - 100);
    wrapper.current.style.height = `${eval(parseInt(h2) + 80)}px`;
   window.scrollTo(0, 0);
    child1.current.style.visibility = "hidden";
    child2.current.style.visibility = "visible";
  }



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
      setUserBalance(userBalance)
    }
    catch(error){
      console.log(error)
    }


  }

  useEffect(()=>{
    if(tokenAd.length === LENGTH_OF_CONTRACT_ADDRESS){
      getContractDetails(tokenAd)
      getUserBalance(tokenAd)
    } 
  },[tokenAd])



  const handleCreateEpadBUSD = async()=>{
    const createEpadToast  = toast.loading("Creating ArgorPad....")
    try{


      const unixStartTime =  new Date(startTime).getTime() / 1000
      const unixEndTime =  new Date(endTime).getTime() / 1000


      console.log(unixStartTime, unixEndTime, minimumBuy, maximumBuy, tokenAd, hardcap, softcap, presaleRate, listingRate, liquidity, feeOption, refundType)
      
      const ePadCreateRes =  await handleCreateEPadBUSD(unixStartTime, unixEndTime, minimumBuy, maximumBuy, tokenAd, hardcap, softcap, presaleRate, listingRate, liquidity, feeOption, refundType)

      const presaleAddress =  ePadCreateRes



      const ePadObject  = {
        "tokenAddress" : tokenAd,
        "presaleAddress": presaleAddress,
        "tokenSymbol" : tokenDetails.tokenSymbol,
        "tokenName": tokenDetails.tokenName,
        "tokenDecimals" : Number(tokenDetails.tokenDecimals),
       "tokenSupply" : userBalance,
       "presaleRate" : presaleRate,
       "listingRate" : listingRate,
       "description" : desc,
       "liquidityLockTime" : lockup,
       "launchPadType" : currency,
      "softCap" : softcap,
      "hardCap" : hardcap,
       "presaleStartTime": unixStartTime,
       "presaleEndTime" : unixEndTime,
       "liquidityPercentage" : Number(liquidity),
        "websiteLink" : web,
        "twitterLink" : twitter,
        "facebookLink" : fb,
        "telegramLink" : TG,
        "githubLink" : github,
        "instagramLink"  :insta,
        "discordLink" : discord,
        "redditLink" : reddit,
        "projectLogoUrl" : logo,
        "adminAddress" : userWallet
      }

      const savePadInServer =  await saveLaunchPad(ePadObject)


      console.log(savePadInServer)

       

      toast.update(createEpadToast, {autoClose:1000, render: "ArgorPad Created Successfully ", isLoading:false, type:"success"})


      setOffset(offset - 100);
                  wrapper.current.style.height = `${eval(parseInt(h6) + 80)}px`;
                  window.scrollTo(0, 0);
                  child6.current.style.visibility = "visible";
                  child5.current.style.visibility = "hidden";

    }
    catch(error){
      console.log(error)
      toast.update(createEpadToast, {autoClose:1000, render: "An issue occured while creating ArgorPad  ", isLoading:false, type:"error"})

    }
  }


  const handleCreateEpadBNB = async()=>{
    const createEpadToast  = toast.loading("Creating ArgorPad....")
    try{


      const unixStartTime =  new Date(startTime).getTime() / 1000
      const unixEndTime =  new Date(endTime).getTime() / 1000


      console.log(unixStartTime, unixEndTime, minimumBuy, maximumBuy, tokenAd, hardcap, softcap, presaleRate, listingRate, liquidity, feeOption, refundType)
      
      const ePadCreateRes =  await handleCreateEPadBNB(unixStartTime, unixEndTime, minimumBuy, maximumBuy, tokenAd, hardcap, softcap, presaleRate, listingRate, liquidity, feeOption, refundType)

      const presaleAddress =  ePadCreateRes



      const ePadObject  = {
        "tokenAddress" : tokenAd,
        "presaleAddress": presaleAddress,
        "tokenSymbol" : tokenDetails.tokenSymbol,
        "tokenName": tokenDetails.tokenName,
        "tokenDecimals" : Number(tokenDetails.tokenDecimals),
       "tokenSupply" : userBalance,
       "presaleRate" : presaleRate,
       "listingRate" : listingRate,
       "description" : desc,
       "liquidityLockTime" : lockup,
       "launchPadType" : currency,
      "softCap" : softcap,
      "hardCap" : hardcap,
       "presaleStartTime": unixStartTime,
       "presaleEndTime" : unixEndTime,
       "liquidityPercentage" : Number(liquidity),
        "websiteLink" : web,
        "twitterLink" : twitter,
        "facebookLink" : fb,
        "telegramLink" : TG,
        "githubLink" : github,
        "instagramLink"  :insta,
        "discordLink" : discord,
        "redditLink" : reddit,
        "projectLogoUrl" : logo,
        "adminAddress" : userWallet
      }

      const savePadInServer =  await saveLaunchPad(ePadObject)


      console.log(savePadInServer)

       

      toast.update(createEpadToast, {autoClose:1000, render: "ArgorPad Created Successfully ", isLoading:false, type:"success"})


      setOffset(offset - 100);
                  wrapper.current.style.height = `${eval(parseInt(h6) + 80)}px`;
                  window.scrollTo(0, 0);
                  child6.current.style.visibility = "visible";
                  child5.current.style.visibility = "hidden";

    }
    catch(error){
      console.log(error)
      toast.update(createEpadToast, {autoClose:1000, render: "An issue occured while creating ArgorPad  ", isLoading:false, type:"error"})

    }
  }


  
  const handleCreateEpad = ()=>{
    if(currency === "BUSD"){
      handleCreateEpadBUSD()
    }

    if(currency === "BNB"){
      console.log("Here")
      handleCreateEpadBNB()
    }
  }


  const handleApproveTokenForPresale = async()=>{

    if (tokenAd.trim() === "" ){
      toast("Token Address is Blank")
      return 
    }

    const approveloading =  toast.loading("Approving Tokens.... ")
    
    let factoryToApprove = BUSD_FACTORY_ADDRESS

    if (currency === "BNB"){
      factoryToApprove = BNB_FACTORY_ADDRESS
    }

    try{
      
       await approveToken(factoryToApprove, userBalance,tokenAd)

      toast.update(approveloading, {autoClose:1000, render: "Presale  tokens approved ", isLoading:false, type:"success"})

      handleGoToFillDetails()


    }
    catch(error){

      toast.update(approveloading, {autoClose:1000, render: "An issue occured while approving tokens ", isLoading:false, type:"error"})

    } 

  }

  return (
    <main className="main">
      <ToastContainer  position="top-right" />
      <div className="mc">
        <div
          className="mc-b"
          ref={wrapper}
          style={{ height: `${eval(parseInt(h1) + 80)}px` }}
        >
          <div
            ref={child1}
            className="ct create-now-a"
            style={{ marginLeft: `${offset}%` }}
          >
            <div className="r1">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="error-div">
                  <span> {/* Render your errors(if any) in here */}</span>
                </div>
                <span>(*) is a required field</span>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="adf">
                      Token Address
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={tokenAd}
                    onChange={(e) => setTokenAd(e.target.value)}
                    id="adf"
                  />
                  <div className="caption">
                    <span>Create pool fee : 0.5 ETH</span>
                  </div>
                </div>

                <div className="f-dt">
                  <ul>
                    <li>
                      <span className="prop">Name</span>
                      <span className="val blue">{ tokenDetails=== null ? "" :   tokenDetails.tokenName}</span>
                    </li>
                    <li>
                      <span className="prop">Symbol</span>
                      <span className="val">{ tokenDetails=== null ? "" :  tokenDetails.tokenSymbol}</span>
                    </li>
                    <li>
                      <span className="prop">Decimals</span>
                      <span className="val">{ tokenDetails=== null ? "" :  tokenDetails.tokenDecimals}</span>
                    </li>
                  </ul>
                </div>

                <div className="currency-wrp">
                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Currency</label>
                    </div>
                  </div>
                  <ul>
                    <li>
                      <input type="radio" name="cur" id="bnb"  onClick={() => setCurrency("BNB")} />
                      <label htmlFor="bnb" onClick={() => setCurrency("BNB")}>
                        ETH
                      </label>
                    </li>

                   

                    {/* <li>
                      <input type="radio" name="cur" id="usdc" onClick={() => setCurrency("USDC")} />
                      <label htmlFor="usdc" onClick={() => setCurrency("USDC")}>
                        USDC
                      </label>
                    </li> */}
                  </ul>

                  <div className="hint">
                    <span>Users will pay with {currency} for your token</span>
                  </div>

                  <div className="c-c">
                    <div className="text-row">
                      <div className="title">
                        <label htmlFor="">Fee Options</label>
                      </div>
                    </div>
                  </div>

                  <ul>
                    <li>
                      <input type="radio" name="fee-option" id="2%" onClick={() => setFeeOption("2")} />
                      <label htmlFor="2%" onClick={() => setFeeOption("2")}>
                        2% ETH raised
                      </label>
                    </li>
                    <li>
                      <input type="radio" name="fee-option" id="4%"  onClick={() => setFeeOption("4")}/>
                      <label htmlFor="4%" onClick={() => setFeeOption("4")}>
                        4% ETH raised
                      </label>
                    </li>
                  </ul>

                  <div className="ens">
                    Make sure the token has "Exclude transfer fee" function if
                    it has transfer fees.
                  </div>

                  <button
                    className="approve"
                    onClick={handleApproveTokenForPresale}
                  >
                    Approve
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div
            className="ct create-now-b"
            ref={child2}
            style={{ visibility: "hidden" }}
          >
            <div className="r1">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="error-div">
                  <span> {/* Render your errors(if any) in here */}</span>
                </div>
                <span>(*) is a required field</span>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Presale Rate
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={presaleRate}
                    onChange={(e) => setPresaleRate(e.target.value)}
                  />
                  <div className="caption">
                    <span>
                      If I spend 1 {currency} how many tokens will I receive?
                    </span>
                  </div>
                </div>

                {/* <div className="wl">
                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Whitelist</label>
                    </div>
                    <ul className="fl-u">
                      <li>
                        <input type="radio" name="wl" id="d" />
                        <label
                          htmlFor="d"
                          onClick={() => setWhitelist("Disable")}
                        >
                          Diasble
                        </label>
                      </li>
                      <li>
                        <input type="radio" name="wl" id="e" />
                        <label
                          htmlFor="e"
                          onClick={() => setWhitelist("Enable")}
                        >
                          Enable
                        </label>
                      </li>
                    </ul>
                    <div className="caption">
                      <span>You can enable/disable whitelist anytime</span>
                    </div>
                  </div>
                </div> */}

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Softcap  {`(${currency})`}
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={softcap}
                    onChange={(e) => setSoftcap(e.target.value)}
                  />
                  <div className="caption">
                    <span>Softcap must be &ge; 50% of Hardcap!</span>
                  </div>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Hardcap {`(${currency})`}
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={hardcap}
                    onChange={(e) => setHardcap(e.target.value)}
                  />
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Minimum Buy  {`(${currency})`}
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={minimumBuy}
                    onChange={(e) => setMinimumBuy(e.target.value)}
                  />
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Maximum Buy  {`(${currency})`}
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={maximumBuy}
                    onChange={(e) => setMaximumBuy(e.target.value)}
                  />
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">Refund Type  </label>
                  </div>
                  <div className="dpd">
                    <select
                      name="rt"
                      id=""
                      onChange={(e) => setRefundType(e.target.value)}
                    >
                      <option value="1">Burn</option>
                      <option value="0">Refund</option>
                    </select>
                  </div>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Router
                      <span>*</span>
                    </label>
                  </div>
                  <div className="dpd">
                    <select
                      name="rt"
                      id=""
                      onChange={(e) => setRouter(e.target.value)}
                    >
                      <option>---Select Router Exchange---</option>
                      <option value="pancakeswap">Pancakeswap</option>
                    </select>
                  </div>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Liquidity(%)
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={liquidity}
                    onChange={(e) => setLiquidity(e.target.value)}
                  />
                    <span className="fcn">
                    Enter the percentage of raised funds that should be
                    allocated to liquidity on (Min 51%, Max 100%)
                  </span>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Listing Rate
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="0"
                    value={listingRate}
                    onChange={(e) => setListingRate(e.target.value)}
                  />
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">1{currency} = {presaleRate} {tokenDetails  === null ? "" : tokenDetails.tokenDecimals }</label>
                  </div>
                </div>

                <div className="com">
                

                  <span>
                    If i spend 1{currency}, how many tokens will i receive? Usually
                    this amount is lower than presale rate to allow for a higher
                    listing price on
                  </span>
                </div>

                <div className="r3">
                  <span>Select start & end time (UTC)*</span>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Start Time (UTC)
                      <span>*</span>
                    </label>
                  </div>
                  <div className="dpd">
                    <input
                      type="datetime-local"
                      name=""
                      id=""
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      End time Time (UTC)
                      <span>*</span>
                    </label>
                  </div>
                  <div className="dpd">
                    <input
                      type="datetime-local"
                      name=""
                      id=""
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-row">
                  <div className="title">
                    <label htmlFor="">
                      Liquidity lockup (days)*
                      <span>*</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    name=""
                    placeholder="0"
                    id=""
                    value={lockup}
                    onChange={(e) => setLockup(e.target.value)}
                  />
                </div>

                {/* <div className="vest-wrp">
                  <ul>
                    <li>
                      <input type="checkbox" name="" id="vc" />
                      <label htmlFor="vc">Using Vesting Contributor?</label>
                    </li>

                    <li>
                      <input type="checkbox" name="" id="vt" />
                      <label htmlFor="vt">Using team vesting?</label>
                    </li>
                    <li></li>
                  </ul>
                </div> */}

                <div className="btns">
                  <button
                    className="prev"
                    onClick={() => {
                      setOffset(offset + 100);
                      wrapper.current.style.height = `${eval(
                        parseInt(h1) + 80
                      )}px`;
                      window.scrollTo(0, 0);
                      child1.current.style.visibility = "visible";
                      child2.current.style.visibility = "hidden";
                    }}
                  >
                    Back
                  </button>
                  <button
                    className="next"
                    onClick={() => {
                      setOffset(offset - 100);
                      wrapper.current.style.height = `${eval(
                        parseInt(h5) + 80
                      )}px`;
                      window.scrollTo(0, 0);
                      child2.current.style.visibility = "hidden";
                      child5.current.style.visibility = "visible";
                    }}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
{/* 
          <div
            className="ct using-team-vesting create-now-c"
            ref={child3}
            style={{ visibility: "hidden" }}
          >
            <div className="error-div">
              <span></span>
            </div>
            <div className="ens">
              Note that team Vesting doesn’t support rebase tokens.
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Total team vesting tokens
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 10000"
                value={TTVT}
                onChange={(e) => setTTVT(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  First token release after listing(days)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 5"
                value={FTRAL}
                onChange={(e) => setFTRAL(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  First token release (percent)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 40%"
                value={FTR}
                onChange={(e) => setFTR(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Vesting period each cycle (days)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 5"
                value={vestingPeriod}
                onChange={(e) => setVestingPeriod(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Team token release each cycle (percent)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 20%"
                value={TTREC}
                onChange={(e) => setTTREC(e.target.value)}
              />
            </div>

            <div className="com">
              <span>Need 878200 FDT to create launchpad</span>
            </div>

            <div className="btns">
              <button
                className="prev"
                onClick={() => {
                  setOffset(offset + 100);
                  wrapper.current.style.height = `${eval(parseInt(h2) + 80)}px`;
                  window.scrollTo(0, 0);
                  child2.current.style.visibility = "visible";
                  child3.current.style.visibility = "hidden";
                }}
              >
                Back
              </button>
              <button
                className="next"
                onClick={() => {
                  setOffset(offset - 100);
                  wrapper.current.style.height = `${eval(parseInt(h4) + 80)}px`;
                  window.scrollTo(0, 0);
                  child3.current.style.visibility = "hidden";
                  child4.current.style.visibility = "visible";
                }}
              >
                Next
              </button>
            </div>
          </div>

          <div
            className="ct using-vesting-contributor create-now-d"
            style={{ visibility: "hidden" }}
            ref={child4}
          >
            <div className="error-div">
              <span> {/* Render your errors(if any) in here </span>
            </div>
            <div className="ens">
              Note that Vesting contributor doesn’t support rebase tokens.
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  First release for presale (percent)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 40%"
                value={FRFP}
                onChange={(e) => setFRFP(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Vesting period each cycle (days)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 5"
                value={VPEC}
                onChange={(e) => setVPEC(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Presale token release each cycle (percent)
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="E.g 20%"
                value={PTREC}
                onChange={(e) => setPTREC(e.target.value)}
              />
            </div>

            <div className="com">
              <span>Need 878200 FDT to create launchpad</span>
            </div>

            <div className="btns">
              <button
                className="prev"
                onClick={() => {
                  setOffset(offset + 100);
                  wrapper.current.style.height = `${eval(parseInt(h3) + 80)}px`;
                  window.scrollTo(0, 0);
                  child3.current.style.visibility = "visible";
                  child4.current.style.visibility = "hidden";
                }}
              >
                Back
              </button>
              <button
                className="next"
                onClick={() => {
                  setOffset(offset - 100);
                  wrapper.current.style.height = `${eval(parseInt(h5) + 80)}px`;
                  window.scrollTo(0, 0);
                  child4.current.style.visibility = "hidden";
                  child5.current.style.visibility = "visible";
                }}
              >
                Next
              </button>
            </div>
          </div> 
          
        */}







          <div
            className="ct social-media create-now-e"
            ref={child5}
            style={{ visibility: "hidden" }}
          >
            <div className="error-div">
              <span> </span>
            </div>
            <span className="rq">(*) is a required field</span>
            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Logo URL
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert link of your logo here"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
              <div className="caption">
                <span>Learn more</span>
              </div>
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Website
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert website address"
                value={web}
                onChange={(e) => setWeb(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Twitter
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert twitter profile link"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Facebook
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert facebook link"
                value={fb}
                onChange={(e) => setFb(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Instagram
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert instagram link"
                value={insta}
                onChange={(e) => setInsta(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Telegram
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert telegram link"
                value={TG}
                onChange={(e) => setTG(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Github
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert github link"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Discord
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert Discord server link"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Reddit
                  <span>*</span>
                </label>
              </div>
              <input
                type="text"
                placeholder="Insert reddit link"
                value={reddit}
                onChange={(e) => setReddit(e.target.value)}
              />
            </div>

            <div className="text-row">
              <div className="title">
                <label htmlFor="">
                  Description
                  <span>*</span>
                </label>
              </div>
              <textarea
                placeholder="Tell us more about your project here."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="btns">
              <button
                className="prev"
                onClick={() => {
                  setOffset(offset + 100);
                  wrapper.current.style.height = `${eval(parseInt(h2) + 80)}px`;
                  window.scrollTo(0, 0);
                  child2.current.style.visibility = "visible";
                  child5.current.style.visibility = "hidden";
                }}
              >
                Back
              </button>
              <button
                className="next"
                onClick={()=>{
                  handleCreateEpad()
                  }}
              >
                Submit
              </button>
            </div>
          </div>

          <div
            className="ct submit-page create-now-d"
            ref={child6}
            style={{ visibility: "hidden" }}
          >
            <div className="error-div">
              <span>{/* Render your errors(if any) in here */}</span>
            </div>
            <ul>
              {/* <li>
                <span className="prop">Total token</span>
                <span></span>
              </li> */}

              <li>
                <span className="prop">Token Name</span>
                <span>{ tokenDetails == null ? "" :  tokenDetails.tokenName}</span>
              </li>

              <li>
                <span className="prop">Token symbol</span>
                <span>{ tokenDetails == null ? "" :  tokenDetails.tokenSymbol}</span>
              </li>

              <li>
                <span className="prop">Token Decimals</span>
                <span>{ tokenDetails == null ? "" :  tokenDetails.tokenDecimals}</span>
              </li>

              <li>
                <span className="prop">Presale rate</span>
                <span>{presaleRate} FDT</span>
              </li>

              <li>
                <span className="prop">Listing rate</span>
                <span>{listingRate}</span>
              </li>

              <li>
                <span className="prop">Sale Method</span>
                <span>{/* Render value here */}</span>
              </li>

              <li>
                <span className="prop">Softcap</span>
                <span>{softcap}{currency}</span>
              </li>

              <li>
                <span className="prop">Hardcap</span>
                <span>{hardcap}{currency}</span>
              </li>

              <li>
                <span className="prop">Unsold tokens</span>
                <span>{/* Render value here */}</span>
              </li>

              <li>
                <span className="prop">Minimun buy</span>
                <span>{minimumBuy} {currency}</span>
              </li>

              <li>
                <span className="prop">Maximun buy</span>
                <span>{maximumBuy} {currency}</span>
              </li>

              <li>
                <span className="prop">Liquidity</span>
                <span>{liquidity}%</span>
              </li>

              <li>
                <span className="prop">Start time</span>
                <span>{startTime}(UTC)</span>
              </li>

              <li>
                <span className="prop">End time</span>
                <span>{endTime} (UTC)</span>
              </li>

              <li>
                <span className="prop">Liquidity lockup time</span>
                <span>{/* Render value here */}Days</span>
              </li>

              <li>
                <span className="prop">Website</span>
                <span>{web}</span>
              </li>

              <li>
                <span className="prop">Telegram</span>
                <span>{TG}</span>
              </li>

              <li>
                <span className="prop">Discord</span>
                <span>{discord}</span>
              </li>

              <li>
                <span className="prop">Description</span>
                <span>{desc}</span>
              </li>
            </ul>

            <div className="btns">
            
              <button className="submit"
              onClick={()=>{
              navigator('/E_pad_list')
              }}
              >Done</button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Create;
