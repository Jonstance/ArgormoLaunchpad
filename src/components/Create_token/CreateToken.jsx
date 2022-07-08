import "../../App.css";
import "./Create.css";
import Footer from "../Footer/Footer";
import Listing from "../Listing/Listing";
import { useState, useRef, useEffect, useContext } from "react";
import { AppContext } from "../../context/globalContext";
import { createStandardToken } from "../../contractCalls/tokenFactory";
import React from "react";
import {ToastContainer, toast} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css';

const CreateToken = () => {
  const { isUserConnected } = useContext(AppContext);
  const [tokenType, setTokenType] = useState("Standard Token");
  const [Router, setRouter] = useState("");

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [supply, setSupply] = useState("");
  const [generateYield, setGenerateYield] = useState("");
  const [generateLiquidity, setGenerateLiquidity] = useState("");
  const [marketingAddress, setMarketingAddress] = useState("");
  const [marketingPercent, setMarketingPercent] = useState("");
  const [rewardToken, setRewardToken] = useState("");
  const [liquidityFee, setLiquidityFee] = useState("");
  const [buybackFee, setBuybackFee] = useState("");
  const [reflectionFee, setReflectionFee] = useState("");
  const [marketingFee, setMarketingFee] = useState("");
  const [contractAddress, setContractAddress] = useState("")
  const [transactionHash, setTransactionHash]  =  useState("")
  const wrapper = useRef();


  //set this to true after token creation
  const [tokenCreated, setTokenCreated] = useState(false);



  const handleCreateToken = async ()=>{
    const loadingToast =  toast.loading("Creating Token... ")
    try{
      const createTokenRes =  await createStandardToken(name, symbol, decimals, supply)
      console.log(createTokenRes)

      setContractAddress(createTokenRes.address)
      setTransactionHash(createTokenRes.transactionHash)
      setTokenCreated(true)
      toast.update(loadingToast, {render : "Token Created Successfully", autoClose:1500, isLoading:false, type:'success'})
    }
    catch(error){
      console.log(error)
      alert("An error occured")
      toast.update(loadingToast, {render : "An Error Occured", autoClose:1500, isLoading:false, type:'error '})

    }

  }

  const handleCopyAddress = ()=>{
    navigator.clipboard.writeText(contractAddress)
    alert("Token Address Copied... ")
  }

  const handleOpenTransactionPage = ()=>{
    // Curently on testnet 
    console.log(transactionHash)
    const url  =  `https://testnet.bscscan.com/tx/${transactionHash}`

    window.open(url, "_blank")
  }

  return (
    <main className="main">
      <ToastContainer position="top-right" />
      <div className="mc">
        <div className="mc-b">
          {!tokenCreated && (
            <>
              <div className="ct create-now-a">
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
                        <label htmlFor="tt">
                          Token Type
                          <span>*</span>
                        </label>
                      </div>
                      <select
                        name=""
                        id=""
                        onChange={(e) => setTokenType(e.target.value)}
                      >
                        <option value="Standard Token">Standard Token</option>
                        <option value="Liquidity Generator Token">
                          Liquidity Generator Token
                        </option>
                        <option value="Buyback Baby Token">
                          Buyback Baby Token
                        </option>
                      </select>
                      <div className="caption">
                        <span>0.01 BNB </span>
                      </div>
                    </div>
                    <div className="text-row">
                      <div className="title">
                        <label htmlFor="tn">
                          Name
                          <span>*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        id="tn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ex: Etherum"
                      />
                    </div>
                    <div className="text-row">
                      <div className="title">
                        <label htmlFor="tsb">
                          Symbol
                          <span>*</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        id="tsb"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                        placeholder="Ex: ETH"
                      />
                    </div>
                    {tokenType === "Standard Token" && (
                      <>
                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="tdc">
                              Decimals
                              <span>*</span>
                            </label>
                          </div>
                          <input
                            type="number"
                            id="tdc"
                            value={decimals}
                            onChange={(e) => setDecimals(e.target.value)}
                            placeholder="Ex: 18"
                          />
                        </div>
                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="tspl">
                              Total Supply
                              <span>*</span>
                            </label>
                          </div>
                          <input
                            type="number"
                            id="tspl"
                            value={supply}
                            onChange={(e) => setSupply(e.target.value)}
                            placeholder="Ex: 100000000000"
                          />
                        </div>
                      </>
                    )}

                    {tokenType === "Liquidity Generator Token" && (
                      <>
                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="tspl2">
                              Total Supply
                              <span>*</span>
                            </label>
                          </div>
                          <input
                            type="number"
                            id="tspl2"
                            value={supply}
                            onChange={(e) => setSupply(e.target.value)}
                            placeholder="Ex: 100000000000"
                          />
                        </div>

                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="trt">Router</label>
                          </div>
                          <select
                            name=""
                            id="trt"
                            onChange={(e) => setRouter(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Select Router Exchange
                            </option>
                            <option value="Pancakeswap">Pancakeswap</option>
                            <option value="MDex">MDex</option>
                            <option value="Biswap">Biswap</option>
                            <option value="ApeSwap">ApeSwap</option>
                            <option value="PinkSwap">PinkSwap</option>
                          </select>
                        </div>

                        <div className="text-row db">
                          <div className="text-row">
                            <div className="title">
                              <label htmlFor="tfy">
                                Transaction fee to generate yield (%)
                              </label>
                            </div>
                            <input
                              type="number"
                              id="tfy"
                              className="rtft"
                              value={generateYield}
                              onChange={(e) => setGenerateYield(e.target.value)}
                              placeholder="Ex: 1"
                            />
                          </div>

                          <div className="text-row">
                            <div className="title">
                              <label htmlFor="tfl">
                                Transaction fee to generate liquidity (%)
                              </label>
                            </div>
                            <input
                              type="number"
                              id="tfl"
                              value={generateLiquidity}
                              onChange={(e) =>
                                setGenerateLiquidity(e.target.value)
                              }
                              placeholder="Ex: 1"
                            />
                          </div>
                        </div>

                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="cma">
                              Charity/Marketing address
                            </label>
                          </div>
                          <input
                            type="number"
                            id="cma"
                            value={marketingAddress}
                            onChange={(e) =>
                              setMarketingAddress(e.target.value)
                            }
                            placeholder="Ex: 0x....."
                          />
                        </div>

                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="cmp">
                              Charity/Marketing percent (%)
                            </label>
                          </div>
                          <input
                            type="number"
                            id="cmp"
                            value={marketingPercent}
                            onChange={(e) =>
                              setMarketingPercent(e.target.value)
                            }
                            placeholder="0 - 25"
                          />
                        </div>
                      </>
                    )}

                    {tokenType === "Buyback Baby Token" && (
                      <>
                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="tspl2">
                              Total Supply
                              <span>*</span>
                            </label>
                          </div>
                          <input
                            type="number"
                            id="tspl2"
                            value={supply}
                            onhange={(e) => setSupply(e.target.value)}
                            placeholder="Ex: 100000000000"
                          />
                        </div>

                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="trt2">Router</label>
                          </div>
                          <select
                            name=""
                            id="trt2"
                            onChange={(e) => setRouter(e.target.value)}
                          >
                            <option value="" disabled selected>
                              Select Router Exchange
                            </option>
                            <option value="Pancakeswap">Pancakeswap</option>
                            <option value="MDex">MDex</option>
                            <option value="Biswap">Biswap</option>
                            <option value="ApeSwap">ApeSwap</option>
                            <option value="PinkSwap">PinkSwap</option>
                          </select>
                        </div>

                        <div className="text-row db">
                          <div className="text-row">
                            <div className="title">
                              <label htmlFor="rwrdt">
                                Reward token
                                <span>*</span>
                              </label>
                            </div>
                            <input
                              className="rtft"
                              type="text"
                              id="rwrdt"
                              value={rewardToken}
                              onhange={(e) => setRewardToken(e.target.value)}
                              placeholder="Ex: 0 - 100"
                            />
                          </div>

                          <div className="text-row">
                            <div className="title">
                              <label htmlFor="lqdtf">Liquidity Fee (%)</label>
                            </div>
                            <input
                              type="number"
                              id="lqdtf"
                              value={liquidityFee}
                              onhange={(e) => setLiquidityFee(e.target.value)}
                              placeholder="0 - 100"
                            />
                          </div>
                        </div>

                        <div className="text-row db">
                          <div className="text-row">
                            <div className="title">
                              <label htmlFor="bbkf">Buyback Fee (%)</label>
                            </div>
                            <input
                              className="rtft"
                              type="number"
                              id="bbkf"
                              value={buybackFee}
                              onhange={(e) => setBuybackFee(e.target.value)}
                              placeholder="Ex: 0 - 100"
                            />
                          </div>

                          <div className="text-row">
                            <div className="title">
                              <label htmlFor="rflf">Reflection Fee (%)</label>
                            </div>
                            <input
                              type="number"
                              id="rflf"
                              value={reflectionFee}
                              onhange={(e) => setReflectionFee(e.target.value)}
                              placeholder="0 - 100"
                            />
                          </div>
                        </div>

                        <div className="text-row">
                          <div className="title">
                            <label htmlFor="mkf">
                              Marketing fee (%)
                              <span>*</span>
                            </label>
                          </div>
                          <input
                            type="number"
                            id="mkf"
                            value={marketingFee}
                            onhange={(e) => setMarketingFee(e.target.value)}
                            placeholder="0 - 100"
                          />
                        </div>
                      </>
                    )}

                    <div className="currency-wrp">
                      <button className="approve"  onClick={()=>{
                        handleCreateToken()
                      }} >
                        {isUserConnected ? "Create Token" : "Approve"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}


          
          {tokenCreated && (
            <>
              <div className="ct aftc create-now-a">
                <div className="at1">Your token was created!</div>
                <div className="at2">
                  <div className="atir">
                    <div className="prop">Name</div>
                    <div className="value">{name}</div>
                  </div>

                  <div className="atir">
                    <div className="prop">Symbol</div>
                    <div className="value">{symbol}</div>
                  </div>

                  <div className="atir">
                    <div className="prop">Total supply</div>
                    <div className="value">{supply}</div>
                  </div>

                  <div className="atir">
                    <div className="prop">Address</div>
                    <div className="value">{contractAddress}</div>
                  </div>
                </div>
                <div className="at3">
                  <div onClick={()=>{
                    handleOpenTransactionPage()
                  }} >View Transaction</div>
                  <div
                  onClick={()=>{
                    handleCopyAddress()
                  }}
                  >Copy Address</div>
                  <div>Create E pad</div>
                  <div className="lbt">Create FairLaunch</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default CreateToken;
