import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import "../Create_elock/Create_elock.css";
import "./li.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getLockInfoById,
  renounceLockOwnerShip,
  unLockUserLock,
} from "../../contractCalls/eLock";
import { getTokenDetails } from "../../contractCalls/tokenCalls";

import Timer from "react-timer-wrapper";

import TimeCode from "react-timecode";

import moment from "moment";

import ReactCountDown from "react-countdown";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Lock_info = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [renounced, setRenounced] = useState(false);
  const [unlockedTimeElapsed, setUnlockedTimeElapsed] = useState(false);
  const [tokenDetails, setTokenDetails] = useState(null);

  const [lockDetails, setLockDetails] = useState(null);

  const { id } = useParams();

  const handleRenounce = () => {
    setRenounced(true);
    //Your other logic here, like charging first
  };

  const getLockInfo = async () => {
    try {
      const lockDetails = await getLockInfoById(id);
      console.log(lockDetails);
      setLockDetails({ ...lockDetails });
      if (lockDetails.tgeDate.toString() * 1000 <= Date.now()) {
        setUnlocked(true);
      }
      handleGetTokenDetails(lockDetails.token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTokenDetails = async (tokenAddress) => {
    try {
      const tokenInfo = await getTokenDetails(tokenAddress);
      console.log(tokenInfo);
      setTokenDetails({ ...tokenInfo });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLockInfo();
  }, [id]);

  const handleUnlockTokens = async () => {
    if (unlocked == false) {
      toast("Cannot Unlock before UnLock Time");
      return;
    }

    const loadingToast = toast.loading("Unlocking...");

    try {
      const unlockDetails = await unLockUserLock(id);

      toast.update(loadingToast, {
        render: "UnLocked Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);

      toast.update(loadingToast, {
        render: "An Error Occured",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  const handleRenounceLock = async () => {
    const loadingToast = toast.loading("Renouncing...");

    try {
      const renounceDet = await renounceLockOwnerShip(id);

      toast.update(loadingToast, {
        render: "Lock Renounced  Successfully",
        type: "success",
        isLoading: false,
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);

      toast.update(loadingToast, {
        render: "An Error Occured",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  const renderer = (data) => {
    const { days, hours, minutes, seconds, completed } = data;
    if (completed) {
      // Render a completed state
      return "Completed";
    } else {
      // Render a countdown
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <main className="main">
      <ToastContainer position="top-right" autoClose={1500} />
      {/* <Listing /> */}
      <div className="mc">
        <div className="mc-b elock lock-info">
          <div className="lock-timer">
            <div className="lock-icons">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/lock-solid.svg?alt=media&token=cb100eaa-8072-4b42-8482-ffe55954a7a6"
                alt=""
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/unlock-solid.svg?alt=media&token=432bc244-0dcc-4c9e-9cfa-a48736bcb371"
                alt=""
              />
            </div>

            <div className="time-wrp">
              {/* <ReactCountDown overtime date={lockDetails == null ? Date.now() + 10000000 : lockDetails.tgeDate.toString() *1000  - lockDetails.lockDate.toString() * 1000} renderer={renderer} /> */}
              <span>
                {
                  <Timer
                    active={true}
                    duration={
                      lockDetails == null
                        ? Date.now() + 10000000
                        : lockDetails.tgeDate.toString() * 1000 -
                          lockDetails.lockDate.toString() * 1000
                    }
                    time={
                      lockDetails == null
                        ? Date.now()
                        : Date.now() - lockDetails.lockDate.toString() * 1000
                    }
                  >
                    <TimeCode />
                  </Timer>
                }{" "}
                {"H:MM:SS"}{" "}
              </span>
              <span>
                {
                  <ReactCountDown
                    date={
                      lockDetails === null
                        ? Date.now() + 10000000
                        : lockDetails.tgeDate.toString() * 1000
                    }
                    renderer={renderer}
                  />
                }
              </span>
            </div>
            {/* 
            <div className="prg-w">
                //This pg-in div is the progress ball in blue color. Increase its width in percentage to progress the bar. Currently at 0% 
              <div className="pg-in" style={{"width":"0%"}}>
                <div className="p-rcr"></div>
              </div>
            </div> */}
          </div>

          <div className="tk-i">
            <div className="tk-i-h">Token Info</div>
            <div className="at2">
              <div className="atir">
                <div className="prop">Token Name</div>
                <div className="value">
                  {tokenDetails == null ? "" : tokenDetails.tokenName}
                </div>
              </div>

              <div className="atir">
                <div className="prop">Token Symbol</div>
                <div className="value">
                  {tokenDetails == null ? "" : tokenDetails.tokenSymbol}
                </div>
              </div>

              <div className="atir">
                <div className="prop">Total Address</div>
                <div className="value">
                  {tokenDetails == null ? "" : tokenDetails.tokenAddress}
                </div>
              </div>

              <div className="atir">
                <div className="prop">Token Decimals</div>
                <div className="value">
                  {tokenDetails == null ? "" : tokenDetails.tokenDecimals}
                </div>
              </div>
            </div>
          </div>

          <div className="tk-i">
            <div className="tk-i-h">Lock Info</div>
            <div className="at2">
              <div className="atir">
                <div className="prop">Owner</div>
                <div className="value">
                  {lockDetails == null ? "" : lockDetails.owner}
                </div>
              </div>

              <div className="atir">
                <div className="prop">Lock Date</div>
                <div className="value">
                  {lockDetails == null
                    ? ""
                    : moment(lockDetails.lockDate.toString() * 1000).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}{" "}
                  UTC
                </div>
              </div>

              <div className="atir">
                <div className="prop">Unlock Date</div>
                <div className="value">
                  {lockDetails == null
                    ? ""
                    : moment(lockDetails.tgeDate.toString() * 1000).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}{" "}
                  UTC
                </div>
              </div>

              {/* <div className="atir">
                <div className="prop">Total Amount Locked</div>
                <div className="value">{ lockDetails == null ? "" : lockDetails.owner }</div>
              </div> */}

              <div className="atir">
                <div className="prop">Total Values Locked</div>
                <div className="value">
                  {lockDetails == null
                    ? ""
                    : tokenDetails === null
                    ? lockDetails.amount.toString().toLocaleString("en-US")
                    : (
                        lockDetails.amount.toString() /
                        Math.pow(10, tokenDetails.tokenDecimals)
                      ).toLocaleString("en-US")}
                </div>
              </div>
            </div>

            {!renounced && (
              <>
                <div className="at3">
                  <div className="rns" onClick={handleRenounceLock}>
                    Renounce Lock Ownership
                  </div>
                  {/* {(!unlockedTimeElapsed) && <>
                    <div>Update</div></> } */}
                  <div
                    style={{
                      opacity: unlocked ? "1" : "0.6",
                      cursor: unlocked ? "pointer" : "default",
                    }}
                    onClick={handleUnlockTokens}
                  >
                    Unlock
                  </div>
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

export default Lock_info;
