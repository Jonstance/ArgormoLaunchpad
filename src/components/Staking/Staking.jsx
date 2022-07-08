import Listing from "../Listing/Listing";
import "./S.css";
import { useState } from "react";
import React from "react";


const Staking = () => {
  const [activeLive, setActiveLive] = useState(true);
  const [activeComp, setActiveComp] = useState(false);
  const hlc = () => {
    setActiveLive(true);
    setActiveComp(false);
  };

  const hcc = () => {
    setActiveLive(false);
    setActiveComp(true);
  };
  return (
    <main className="main">
      <div className="mc">
        <div className="stk-body">
          <div className="stk-hero">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/stake.PNG?alt=media&token=56485ed7-497c-4b84-a5e7-cc39b3eb00c0" alt="" />
            <div className="stk-txt">
              <div className="stwr">
                <span className="stpls">Staking Pools</span>
                <span className="stpls-2">Stake EverFork and Earn tokens</span>
              </div>
            </div>
          </div>

          <div className="st-on">Staked only</div>

          <div className="l-cmp">
            <div className="wpx">
              <div
                className={activeLive ? "cda active-ctr" : "cda"}
                onClick={hlc}
              >
                Live
              </div>
              <div
                className={activeComp ? "cdb active-ctr" : "cdb"}
                onClick={hcc}
              >
                Completed
              </div>
            </div>
          </div>

          <div className="sr-sh">
            <div className="tmct">
              <div className="srt">
                <span>SORT BY</span>
                <select name="" id="">
                  <option value="a">Popular</option>
                  <option value="a">Popular</option>
                  <option value="a">Popular</option>
                  <option value="a">Popular</option>
                </select>
              </div>
              <div className="srh">
                <span>SEARCH</span>
                <input type="text" placeholder="Search Farms" />
              </div>
            </div>
          </div>

          <div className="pools-cont">
            <div className="pool">
              <div className="pr1">
                <div className="pool-logo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/e-launch.svg?alt=media&token=1a90a05d-6901-4dbd-997b-7c3f75465199" alt="" />
                </div>
                <div className="pool-name">
                  EverF
                </div>
                <div className="pool-earned">
                  <span className="es1">Earned</span>
                  <span>0</span>
                </div>
                <div className="pool-apr">
                  <span className="es1">APR</span>
                  <span className="apr-v">30.44</span>
                </div>
                <div className="pool-toggle">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" alt="" />
                </div>
              </div>
              <div className="pr2">
                <div className="pr2l">
                  <div className="pr2l-t">
                    <span className="pr2l-n">EVERF</span>
                    <span className="pr2l-e">Earned</span>
                  </div>
                  <span>0</span>
                </div>
                <div className="pr2r">
                  Harvest
                </div>
              </div>
              <div className="pr3">
                <ul>
                  <li>
                  <span className="pr3-p">APR Minimum</span>
                  <span className="pr3-v">$100</span>
                  </li>

                  <li>
                  <span className="pr3-p">Multiplier</span>
                  <span className="pr3-v">25x</span>
                  </li>

                  <li>
                  <span className="pr3-p">Liquidity</span>
                  <span className="pr3-v">$0</span>
                  </li>
                </ul>
              </div>
              <div className="pr4">
                <span>Get EverF</span>
                <span>View Contract</span>
              </div>
              <div className="pr5">
                <div className="bt-logo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/bt-l.svg?alt=media&token=c31eec4d-3845-4443-8c70-8fc68a5585b0" alt="" />
                  <span>Core</span>
                </div>
              </div>
            </div>


            <div className="pool">
              <div className="pr1">
                <div className="pool-logo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/e-launch.svg?alt=media&token=1a90a05d-6901-4dbd-997b-7c3f75465199" alt="" />
                </div>
                <div className="pool-name">
                  EverF
                </div>
                <div className="pool-earned">
                  <span className="es1">Earned</span>
                  <span>0</span>
                </div>
                <div className="pool-apr">
                  <span className="es1">APR</span>
                  <span className="apr-v">30.44</span>
                </div>
                <div className="pool-toggle">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" alt="" />
                </div>
              </div>
              <div className="pr2">
                <div className="pr2l">
                  <div className="pr2l-t">
                    <span className="pr2l-n">EVERF</span>
                    <span className="pr2l-e">Earned</span>
                  </div>
                  <span>0</span>
                </div>
                <div className="pr2r">
                  Harvest
                </div>
              </div>
              <div className="pr3">
                <ul>
                  <li>
                  <span className="pr3-p">APR Minimum</span>
                  <span className="pr3-v">$100</span>
                  </li>

                  <li>
                  <span className="pr3-p">Multiplier</span>
                  <span className="pr3-v">25x</span>
                  </li>

                  <li>
                  <span className="pr3-p">Liquidity</span>
                  <span className="pr3-v">$0</span>
                  </li>
                </ul>
              </div>
              <div className="pr4">
                <span>Get EverF</span>
                <span>View Contract</span>
              </div>
              <div className="pr5">
                <div className="bt-logo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/bt-l.svg?alt=media&token=c31eec4d-3845-4443-8c70-8fc68a5585b0" alt="" />
                  <span>Core</span>
                </div>
              </div>
            </div>


            <div className="pool">
              <div className="pr1">
                <div className="pool-logo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/e-launch.svg?alt=media&token=1a90a05d-6901-4dbd-997b-7c3f75465199" alt="" />
                </div>
                <div className="pool-name">
                  EverF
                </div>
                <div className="pool-earned">
                  <span className="es1">Earned</span>
                  <span>0</span>
                </div>
                <div className="pool-apr">
                  <span className="es1">APR</span>
                  <span className="apr-v">30.44</span>
                </div>
                <div className="pool-toggle">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/arr-d.svg?alt=media&token=f9aa6030-4f2d-42d8-90d2-ba4c962f57f6" alt="" />
                </div>
              </div>
              <div className="pr2">
                <div className="pr2l">
                  <div className="pr2l-t">
                    <span className="pr2l-n">EVERF</span>
                    <span className="pr2l-e">Earned</span>
                  </div>
                  <span>0</span>
                </div>
                <div className="pr2r">
                  Harvest
                </div>
              </div>
              <div className="pr3">
                <ul>
                  <li>
                  <span className="pr3-p">APR Minimum</span>
                  <span className="pr3-v">$100</span>
                  </li>

                  <li>
                  <span className="pr3-p">Multiplier</span>
                  <span className="pr3-v">25x</span>
                  </li>

                  <li>
                  <span className="pr3-p">Liquidity</span>
                  <span className="pr3-v">$0</span>
                  </li>
                </ul>
              </div>
              <div className="pr4">
                <span>Get EverF</span>
                <span>View Contract</span>
              </div>
              <div className="pr5">
                <div className="bt-logo">
                  <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/bt-l.svg?alt=media&token=c31eec4d-3845-4443-8c70-8fc68a5585b0" alt="" />
                  <span>Core</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Staking;
