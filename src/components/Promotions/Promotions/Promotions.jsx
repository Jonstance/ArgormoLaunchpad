import "./Promotions.css";
import Footer from "../../Footer/Footer";
import Listing from "../../Listing/Listing";
import React,{ useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPromotions } from "../../../apiCalls/promotions";
import moment from "moment";
const Promotions = () => {
  const [promotions, setPromotions] = useState("Banner");

  const [allPromotions, setAllPromotions]=  useState([])


  const [promotionsInView, setPromotionsInView] = useState([])

  const handleGetPromotions = async ()=>{

    try{
      const promotionsData =  await getAllPromotions()
      if(promotionsData.success){
        setAllPromotions(promotionsData.data)
        const promotionInView = promotionsData.data.filter(eachPromotion=>{
          return eachPromotion.promotionType.trim() === promotions.trim()
        })

        setPromotionsInView([...promotionInView])
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
  


  useEffect(()=>{
    const promotionInView = allPromotions.filter(eachPromotion=>{
      return eachPromotion.promotionType.trim() === promotions.trim()
    })

    setPromotionsInView([...promotionInView])
  },[promotions])

  return (
    <main className="main">
      {/* <Listing/> */}
      <div className="mc" style={{ minHeight: "70vh" }}>
        <div className="mc-b prm-wp">
          <div className="text-row">
            <div className="title">
              <label htmlFor="">Promotion Type:</label>
            </div>
            <div className="dpd">
              <select
                name="rt"
                id=""
                onChange={(e) => setPromotions(e.target.value)}
              >
                <option value="Banner">Banner promotions</option>
                <option value="Hashtags">Hast Tag Promotions</option>
              </select>
            </div>
          </div>

          <div className="prm-list">
            {promotions == "Banner" && (
              <>
             
                <div className="banner-list list">
                {
                promotionsInView.map((eachPromo, index)=>{
                  return  <Link to={eachPromo.poolLink} className="bllk" key={index} >
                  <div className="bli">
                    <div className="blimg">
                      <img
                        src={eachPromo.logoLink}
                        alt=""
                      />
                    </div>
                    <span className="blnm">{eachPromo.name}</span>
                    <div className="en-dt">
                      <span className="edtsp">
                        Promoted till:{moment(eachPromo.endDate *1000 ).format("MMMM Do YYYY, h:mm:ss a")} UTC
                      </span>
                    </div>
                  </div>
                </Link>
                })
              }
                 
                </div>
              </>
            )}

            {promotions == "Hashtags" && (
              <>
                <div className="hashlist list">
                  {
                    promotionsInView.map((eachPromotion, index)=>{
                      return <Link to={eachPromotion.poolLink} className="bllk">
                      <div className="bli">
                        <div className="blimg">{eachPromotion.name}</div>
                        <span className="blnm">{eachPromotion.projectSymbol}</span>
                        <div className="en-dt">
                          <span className="edtsp">
                            Promoted till: {moment(eachPromotion.endDate * 1000).format("MMMM Do YYYY, h:mm:ss a")} UTC
                          </span>
                        </div>
                      </div>
                    </Link>
                    })
                  }
                 
                </div>
              </>
            )}
          </div>
          <Link to="/admin/new" className="bllk">
            
            <div className="nw-p">+</div>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Promotions;
