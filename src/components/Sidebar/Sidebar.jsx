import "./S.css";
import { Link } from "react-router-dom";

import React, { useState, useContext } from "react";
import { AppContext } from "../../context/globalContext";
const Sidebar = ({ setSidebar, lightTheme, darkTheme }) => {
  const handleChange = (e) => {
    let list = e.currentTarget.parentElement.children[1];
    //  let arrowIcon = e.currentTarget.children[1].children[1]
    if (list.style.display == "block") {
      list.style.display = "none";
      list.style.height = "0px";
      // arrowIcon.innerHTML = "C"
    } else {
      list.style.display = "block";
      list.style.height = "fit-content";
    }
  };

  const hlck = () => {
    document.body.style.overflowY  =  "scroll"
    setSidebar(false);
    window.scrollTo(0, 0);
    document.querySelector(".main").style.width = "100%";
  };

  //Was going to destructure isAdmin from context but i can't do that for now or it will break the app at your end

  const {isAdmin} = useContext(AppContext)

  return (
    <div className="Sidebar">
      <div className="sidebar-el">
        <ul className="links">
          {isAdmin && (
            <>
              <li>
                <div className="lt" id="lkwp" onClick={(e) => handleChange(e)}>
                  <div className="ln">Admin Panel</div>
                  <div className="ina">
                    <div className="l-arr">
                      <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" />
                    </div>
                  </div>
                </div>

                <div className="l-dp">
                  <ul>
                    <li>
                      <Link onClick={hlck} to="/admin/promotions" className="in-l">
                        Promotions
                      </Link>
                    </li>

                    <li>
                      <Link onClick={hlck} to="/admin/new" className="in-l">
                        New Promotion
                      </Link>
                    </li>

                    <li>
                      <Link onClick={hlck} to="/admin/pools" className="in-l">
                        Pools
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </>
          )}
          <li>
            <div className="lt" id="lkwp" onClick={(e) => handleChange(e)}>
              <div className="ln">E-lock</div>
              <div className="ina">
                <div className="l-ic">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/lock.svg?alt=media&token=e880b64c-09d3-4772-abce-e4d456122e76" />
                </div>
                <div className="l-arr">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" />
                </div>
              </div>
            </div>

            <div className="l-dp">
              <ul>
                <li>
                  <Link onClick={hlck} to="/create_elock" className="in-l">
                    Create Lock
                  </Link>
                </li>

                <li>
                  <Link onClick={hlck} to="/user_lock" className="in-l">
                    My Lock(s)
                  </Link>
                </li>
                <li>
                  <Link onClick={hlck} to="/create_token" className="in-l">
                    Create Token
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div className="lt" id="lkwp" onClick={(e) => handleChange(e)}>
              <div className="ln">E-Airdrop</div>
              <div className="ina">
                <div className="l-ic">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/drop.svg?alt=media&token=da9d2cdc-f2b7-4fca-ad92-edbbf3c52f68" />
                </div>
                <div className="l-arr">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" />
                </div>
              </div>
            </div>

            <div className="l-dp">
              <ul>
                <li>
                  <Link onClick={hlck} to="/airdrop" className="in-l">
                    Create Airdrop
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div className="lt" id="lkwp" onClick={(e) => handleChange(e)}>
              <div className="ln">E-pad</div>
              <div className="ina">
                <div className="l-ic">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/pad.svg?alt=media&token=cee57777-d490-41a3-901b-0334d62f854e" />
                </div>
                <div className="l-arr">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" />
                </div>
              </div>
            </div>

            <div className="l-dp">
              <ul>
                <li>
                  <Link onClick={hlck} to="/create_epad" className="in-l">
                    Create E-pad
                  </Link>
                </li>
                <li>
                  <Link onClick={hlck} to="/fairlaunch" className="in-l">
                    Create FairLaunch
                  </Link>
                </li>
                <li>
                  <Link onClick={hlck} to="/E_pad_list" className="in-l">
                    E-pad list
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li>
            <div className="lt" onClick={hlck}>
              <Link to="/staking" className="st-lnk" onClick={hlck}>
                <div className="ln">Staking pool</div>
                <div className="ina">
                  <div className="l-ic">
                    <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/stk.svg?alt=media&token=cc135290-927c-4723-8792-b578d5cf7adc" />
                  </div>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <div className="lt" onClick={hlck}>
              <Link to="/launchpool" className="st-lnk" onClick={hlck}>
                <div className="ln">Pools Alert</div>
                <div className="ina">
                  <div className="l-ic">
                    <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/bell.svg?alt=media&token=6a19c305-868e-46fe-8383-2ccd3b5ef223" />
                  </div>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <div className="lt" onClick={hlck}>
              <Link to="/" className="st-lnk" onClick={hlck}>
                <div className="ln">E-Audits & KYC</div>
                <div className="ina">
                  <div className="l-ic">
                    <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/k.svg?alt=media&token=5bd5f36c-27de-49a4-a294-b87f27553fb9" />
                  </div>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <div className="lt" onClick={hlck}>
              <Link to="/" className="st-lnk" onClick={hlck}>
                <div className="ln">Docs</div>
                <div className="ina">
                  <div className="l-ic">
                    <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/doc.svg?alt=media&token=4179a326-f78a-4bb5-8c98-7d8c0d94ef4d" />
                  </div>
                </div>
              </Link>
            </div>
          </li>

          <li>
            <div
              className="lt"
              onClick={() => {
                hlck();
                window.location.replace("https://t.me/elaunchofficial");
              }}
            >
              <div className="ln">Telegram</div>
              <div className="ina">
                <div className="l-ic">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/tg.svg?alt=media&token=23e2906c-f2bc-4960-a365-9a7d9ac872cf" />
                </div>
              </div>
            </div>
          </li>

          <li>
            <div className="lt" onClick={hlck}>
              <Link to="/" className="st-lnk" onClick={hlck}>
                <div className="ln">Twitter</div>
                <div className="ina">
                  <div className="l-ic">
                    <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/tw.svg?alt=media&token=1143bfed-230f-4dea-9de8-5a02fb563320" />
                  </div>
                </div>
              </Link>
            </div>
          </li>
        </ul>

        <div className="mode">
          <span>Appearance</span>
          <div className="mode-cols">
            <div
              className="lt"
              onClick={() => {
                lightTheme();
                hlck();
              }}
            >
              <div className="lt-img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/light.svg?alt=media&token=0673e728-1398-4daa-b099-7216315954f6"
                  alt=""
                />
              </div>
              <span>Light Mode</span>
            </div>
            <div
              className="dk"
              onClick={() => {
                darkTheme();
                hlck();
              }}
            >
              <div className="lt-img">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/dark.svg?alt=media&token=e26f7a77-21af-4094-bd9c-fedabba46752"
                  alt=""
                />
              </div>
              <span>Dark Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
