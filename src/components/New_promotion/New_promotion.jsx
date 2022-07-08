import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import "./New_promotion.css";
import React,{ useState } from "react";
import moment from "moment";
import { handleCreatePromotion } from "../../apiCalls/promotions";

const New_promotion = () => {
  const [promotions, setPromotions] = useState("Banner");
  const [link, setLink] = useState("");
  const [name, setName] =  useState("")
  const [symbol, setSymbol] = useState("");
  const [logo, setLogo] = useState("");
  const [endDate, setEndDate] = useState(0)
  const handleSubmit = async(e) => {
    
    e.preventDefault();



    try {
      const createPromotionRes = await handleCreatePromotion(link, name, logo, promotions, symbol, endDate)

      if(createPromotionRes.success){
        alert("Promotion Created Successfully")
      }
      else{
        alert(createPromotionRes.reason)
      }
    }
    catch(error){
      console.log(error)
      alert("An Error Occured while creating")
    }

    



  };
  return (
    <main className="main">
      <div className="mc" style={{ minHeight: "68vh" }}>
        <div className="mc-b new_prm">
          <div className="text-row">
            <div className="title">
              <label htmlFor="">New Promotion Type:</label>
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

          {promotions == "Hashtags" && (
            <>
              <div className="npfm">
                <form action="" onSubmit={handleSubmit}>
                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Pool Link:</label>
                    </div>
                    <div className="dpd">
                      <input
                        type="text"
                        placeholder="Ex: https://mypool.com"
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Project Symbol:</label>
                    </div>
                    <div className="dpd">
                      <input
                        type="text"
                        placeholder="Ex: LUNA"
                       
                        onChange={(e) => setSymbol(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Promotion End Date (UTC) </label>
                    </div>
                    <div className="dpd">
                      <input
                        type="datetime-local"
                        onChange={(e) => {
                          setEndDate(moment(e.target.value).unix())
                        }}
                      />
                    </div>
                  </div>
                  <div className="btns">
                    <button type="submit">Post</button>
                  </div>
                </form>
              </div>
            </>
          )}

          {promotions == "Banner" && (
            <>
              <div className="npfm">
                <form action="" onSubmit={handleSubmit}>
                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Pool Link:</label>
                    </div>
                    <div className="dpd">
                      <input
                        type="text"
                        placeholder="Ex: https://mypool.com"
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Project Name:</label>
                    </div>
                    <div className="dpd">
                      <input
                        type="text"
                        placeholder="Ex: Luna Project"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Logo link:</label>
                    </div>
                    <div className="dpd">
                      <input
                        type="text"
                        placeholder="Ex: https://myprojectimg.jpg"
                        onChange={(e) => setLogo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="text-row">
                    <div className="title">
                      <label htmlFor="">Promotion End Date (UTC) </label>
                    </div>
                    <div className="dpd">
                      <input
                        type="datetime-local"
                        onChange={(e) => {
                          setEndDate(moment(e.target.value).unix())
                        }}
                      />
                    </div>
                  </div>
                  <div className="btns">
                    <button type="submit">Post</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default New_promotion;
