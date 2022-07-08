import "../Connect_network/Cn.css"
import {useState, useEffect} from "react"

import Web3Modal from 'web3modal'

import WalletConnectProvider from '@walletconnect/web3-provider'
import { ethers } from "ethers"
import React from "react";



const Connect_wallet = ({setWalModal}) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setShowModal(true)
    }, 90)
  })


  const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "765d4237ce7e4d999f706854d5b66fdc",
          qrcodeModalOptions: {
            mobileLinks: [
              "rainbow",
              "metamask",
              "argent",
              "trust",
              "imtoken",
              "pillar",
            ],
          },
        },
        
      },
};


const handlePopUpConnectionChoice  = async ()=>{
  const web3Modal = new Web3Modal({
    network: "mainnet",
    theme: "light",
    cacheProvider: false,
    providerOptions:providerOptions
       });

          web3Modal.clearCachedProvider()
        const instance = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        console.log(provider)
        const signer =  provider.getSigner()
        console.log(signer)
        const userAccount = await signer.getAddress()
        console.log(userAccount)
}


  return (
    <div className="choose-network">
         <div className="cn-b" style={{"marginTop":(showModal?"0%":"-100%")}}>
         <div className="cn-t">
           <span className="cnt-tx">Connect to a wallet</span>
           <span className="cn-cn" onClick={() => handlePopUpConnectionChoice()}>
             X
           </span>
         </div>
   
         <div className="cn-body">
           <div className="cn-b-r1">
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/meta.svg?alt=media&token=6c2d92b6-c8ca-44a5-9474-7edb1fa2640c" alt="" />
               <div className="wlt-name">Install Metamask</div>
             </div>
   
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/trust.svg?alt=media&token=f8799836-bcec-47cb-9650-52fa8f4cdc15" alt="" />
               <div className="wlt-name">TrustWallet</div>
             </div>
   
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/wc.svg?alt=media&token=2cf4463a-6f9e-4fb2-9af1-7bee56aa4d15" alt="" />
               <div className="wlt-name">WalletConnect</div>
             </div>
   
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/cb.svg?alt=media&token=f3d0d264-7503-4c09-8703-febd05f90055" alt="" />
               <div className="wlt-name">Coinbase Wallet</div>
             </div>
   
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/sf.svg?alt=media&token=a7c656cb-8058-4609-a4d3-32ec76bfc10a" alt="" />
               <div className="wlt-name">Safepal Wallet</div>
             </div>
   
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/tp.svg?alt=media&token=258a0149-181e-4529-ab80-93de3b3d3f33" alt="" />
               <div className="wlt-name">TokenPocket</div>
             </div>
   
             <div className="network">
               <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/mw.svg?alt=media&token=47d30d0f-b462-4a94-8087-7a4a071a9f4c" alt="" />
               <div className="wlt-name">Math Wallet</div>
             </div>
           </div>
         </div>
       </div>
  </div>
  )
}

export default Connect_wallet