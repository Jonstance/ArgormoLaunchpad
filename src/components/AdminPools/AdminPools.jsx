import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import "./AdminPools.css";
import { Link } from "react-router-dom";
import React, {useState} from 'react'
import { useEffect } from "react";
import { getAllLaunchPads, launchPadCredSettings } from "../../apiCalls/launchPad";

const AdminPools = () => {


  const [pools, setPools] = useState([])


  const handleGetAllPools = async ()=>{
    const getPoolReq  = await getAllLaunchPads()

    if(getPoolReq.success){
      setPools([...getPoolReq.data])
    }
  }

  useEffect(()=>{
    handleGetAllPools()
  },[])


  const handleCredChange = async ( credKey, epadId)=>{
    try{
      const handleChangeCred  =  await launchPadCredSettings(credKey, epadId)

      if(handleChangeCred.success){
        alert("Successfull")
        handleGetAllPools()
      }
      else{
        alert(handleChangeCred.reason)
      }
    }
    
    catch(error){
      console.log(error)
      alert("There was an error while making this request ")
    }
  }

  return (
    <main className="main">
      {/* <Listing /> */}
      <div className="mc" style={{ minHeight: "77vh" }}>
        <div className="mc-b adminpools">
          <span className="hdt">All Pools</span>

          <div className="adpwrp">
            {
              pools.map((eachPool, index)=>{
                return  <div className="p" key={index} >
                <div className="apct pool-name">{eachPool.tokenName}</div>{" "}
                {/* <div className="md status">Live</div> */}
                <div className="apct bgbt">
                  <div className="pr-btn au"
                  onClick={()=>{
                    handleCredChange("auditVerified", eachPool.ePadId)
                  }}
                  >{eachPool.auditVerified ? "Unverify Audit" : "Verify Audit"}</div>
                  <div className="pr-btn kyc"
                   onClick={()=>{
                    handleCredChange("kycVerified", eachPool.ePadId)
                  }}
                  >{eachPool.kycVerified ? "Unverify KYC" : "Verify KYC"}</div>
                  <Link to={`/launchpool/${eachPool.ePadId}`} className="adpl">
                    <div className="pr-btn vw">View</div>
                  </Link>
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

export default AdminPools;
