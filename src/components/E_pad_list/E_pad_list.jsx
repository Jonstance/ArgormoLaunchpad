import "../../App.css";
import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import React, { useEffect, useState } from "react";

import "./E_pad_list.css";
import { getAllLaunchPads } from "../../apiCalls/launchPad";

import {useNavigate} from 'react-router-dom'
import { getLaunchPadContractDetails } from "../../contractCalls/launchPad";
import { getAllPromotions } from "../../apiCalls/promotions";


const E_pad_list = () => {


  const navigator  = useNavigate()

  const [ePadList, setEpadList] =  useState([])

  const [epadContractDetails, setEpadContractDetails] = useState([])

  
  const [promotionsBanner, setPromotionBanner] = useState([])

  const [promotiomHashTag, setPromotionHashTag] =  useState([])

  const handleGetAllEPads = async ()=>{

    const allEpadsRes =  await getAllLaunchPads()

    if(allEpadsRes.success){
      setEpadList([...allEpadsRes.data])
    }
  
  }


  useEffect(()=>{
    handleGetAllEPads()
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
      alert("There was an error getting all the promotions")
    }

  }

  useEffect(()=>{
    handleGetPromotions()
  },[])
 


  const getAllLaunchPadContractData = async ()=>{
    const allPresaleAddress = ePadList

    const promiseOfDataFetch = []

    allPresaleAddress.map(eachEpad=>{
      promiseOfDataFetch.push(getLaunchPadContractDetails(eachEpad.presaleAddress, eachEpad.launchPadType))
    })

    const allResponses =  await Promise.all(promiseOfDataFetch)

    // let ePadHashMap = {}

    // allResponses.map(eachDetail=>{
    //   const data  = {
    //     ...eachDetail
    //   }
    //   ePadHashMap[eachDetail.presaleAddress] = data
    // })

    // console.log(ePadHashMap)

    setEpadContractDetails([...allResponses])
  }



  useEffect(()=>{
    getAllLaunchPadContractData()
  },[ePadList])


  return (
    <main className="main">
      <div className="mc pls">
        <div className="mc-b epls">
          <header className="thd">
            <span>Argor-Pads</span>
          </header>
          <div className="filter-btn">
            <div className="all-btn">
              <span>All Argor-Pads</span>
              <div></div>
            </div>
          </div>

         {ePadList.length>0?<> <div className="f-sh">
            <div className="tf">
              <input
                type="text"
                placeholder="Enter token name or token symbol"
              />
            </div>

            <div className="dpdn">
              <div>
                <span>Filter By</span>
                <select name="" id="">
                  <option value="">All Status</option>
                  <option value="">KYC</option>
                  <option value="">Upcoming</option>
                  <option value="">Inprogress</option>
                  <option value="">Filled</option>
                  <option value="">Ended</option>
                  <option value="">Cancelled</option>
                </select>
              </div>
              <div>
                <span>Sort By</span>
                <select name="" id="">
                  <option value="">No Filter</option>
                  <option value="">Hard Cap</option>
                  <option value="">Soft Cap</option>
                  <option value="">LP Percent</option>
                  <option value="">Start time</option>
                  <option value="">End time</option>
                </select>
              </div>
            </div>
          </div></>
          :
          <span className="vmp">No pool yet</span>
}

          {/* Render the pools below */}
          <div className="all-pools-wrapper">
            {
            ePadList.map((eachPad, index)=>{
              return <div className="pool-wrapper" key={index} >
              <div className="dt1">{eachPad.tokenName}</div>
              <div className="dt2">1 {eachPad.launchPadType} = {eachPad.presaleRate} {eachPad.tokenSymbol} </div>
              <div className="dt3">Soft/Hard Cap</div>
              <div className="dt1 blue-bt">{eachPad.softCap} {eachPad.launchPadType} - {eachPad.hardCap} {eachPad.launchPadType}</div>{
                epadContractDetails.length === 0 ||  eachPad.softCap === 0  ? <div className="dt3 otb">Progress  0 % </div>
                 : <div className="dt3 otb">Progress {epadContractDetails[index].totalReceived * 100 / eachPad.softCap } %   </div>

              }
              <div className="prgbar">
                {/* Manipulate the width of the div below to progress the bar */}
                <div className="prld"
                style={{
                  width :`${ epadContractDetails.length === 0 || eachPad.softCap === 0   ? '0' :   epadContractDetails[index].totalReceived * 100 / eachPad.softCap  }%`
                }}
                ></div>
              </div>
              <div className="prgv">
                <span>{epadContractDetails.length  === 0 ? "" : epadContractDetails[index].totalReceived  } {eachPad.launchPadType}</span>

                <span>{eachPad.softCap} {eachPad.launchPadType}</span>
              </div>
              <ul className="pl-dt">
                <li>
                  <span className="pldtl">Liquidity %:</span>

                  <span className="pldtr">{eachPad.liquidityPercentage}%</span>
                </li>

                {/* <li>
                  <span className="pldtl">Lockup Time:</span>

                  <span className="pldtr">30 days</span>
                </li> */}

                {/* <li>
                  <span className="pldtl">Lead Investor</span>

                  <span className="pldtr">MasterVentures</span>
                </li> */}
              </ul>
              <div className="btm-it">
                  <span className="prs">Presale: { eachPad.presaleEndTime < Date.now()  ? "Finalized" : "Live" }  </span>
                  <span className="vpl"
                  onClick={()=>{
                    navigator(`/launchpool/${eachPad.ePadId}`)
                    window.scrollTo(0,0)
                  }}
                  >View Pool</span>
              </div>
            </div>
            })
            }
          
          </div>
          
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default E_pad_list;
