import Listing from "../Listing/Listing";
import "./Home.css";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import React from "react";
import { getAllPromotions } from "../../apiCalls/promotions";


const Home = () => {

  const [promotionsBanner, setPromotionBanner] = useState([])

  const [promotiomHashTag, setPromotionHashTag] =  useState([])




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

  console.log(promotiomHashTag.length)

  return (
    <main className="main">
      {(promotiomHashTag.length>0) && <Listing listings={promotiomHashTag} />}
      <div className="mc hmc">
        <div className="s2">

          {
            promotionsBanner.length > 0 ? <div className="pcc">
            {
              promotionsBanner.map((eachPromo, index)=>{
                return <Link to="/launchpool" className="bml">
                <div className="pc">
                  <div className="prim">
                    <img
                      src={eachPromo.logoLink}
                      alt="PROJECT IMAGE"
                    />
                  </div>
                  <div className="prcp">
                    <span>{eachPromo.name}</span>
                  </div>
                </div>
    </Link>
              })
            }
           
  
  
            </div> : ""
          }

          
        </div>

        <div className="hero-cont">
          <div className="hero-top">
            <img src={process.env.PUBLIC_URL+"images/stats.svg"} alt="Hero image" />
          </div>

          <div className="s-dt">
            <span>
              The easiest launchpad with great perks for native token holders.
            </span>
          </div>
        </div>

        <div className="dbb">
          <div className="c" onClick={() => window.scrollTo(0, 0)}>
            <Link to="/create" className="hmlk">
              Connect
            </Link>
          </div>
          <div className="ex" onClick={() => window.scrollTo(0, 0)}>
            <Link to="/E_pad_list" className="hmlk">
              Explore
            </Link>
          </div>
        </div>

        <div className="s-ds">
          <span>
            Argormo is a protocol providing users with the possibility to
            create & launch their own token and initial token sale.
            <br /> No code or previous experience is required, simply navigate
            through our user-friendly platform and design your own token and
            token launch in just minutes.
            <br /> Enjoy Argormo with zero creation fees and free KYC's
            forever.
          </span>
        </div>

        <div className="s1">
          <div className="item">
            <div className="itct">
              <div className="circ">0</div>
              <div className="it-c">
                <span>Total Liquidity Raised</span>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="itct">
              <div className="circ">0</div>
              <div className="it-c">
                <span>Total Projects</span>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="itct">
              <div className="circ">0</div>
              <div className="it-c">
                <span>Total Participants</span>
              </div>
            </div>
          </div>

          <div className="item">
            <div className="itct">
              <div className="circ">0</div>
              <div className="it-c">
                <span>Total Value Locked</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
