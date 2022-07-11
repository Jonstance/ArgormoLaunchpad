import "./Cn.css"
import {useState, useEffect} from  "react"

import React from "react";


const Connect_network = ({setNetModal}) => {
  const [showModal, setShowModal] = useState(false);
  useEffect(()=>{
    setTimeout(()=>{
      setShowModal(true)
    }, 90)
  })
  return (
    <div className="choose-network">
    <div className="cn-b" style={{"marginTop":(showModal?"0%":"-100%")}}>
      <div className="cn-t">
        <span className="cnt-tx">Choose network</span>
        <span className="cn-cn" onClick={() => setNetModal(false)}>
          X
        </span>
      </div>

      <div className="cn-body">
        <div className="cn-b-r1">
          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/eth.svg?alt=media&token=e5f2d2c3-81f1-45dc-966b-d39792df27d1" alt="" />
            <div className="wlt-name">Ethereum</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/bnb.svg?alt=media&token=b29ffb4f-ec5f-4b0d-ba56-66ab350a15db" alt="" />
            <div className="wlt-name">BNB Smart Chain</div>
            <div className="c-s">(Coming Soon)</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/polygon.svg?alt=media&token=55fe43b2-0a47-46ca-b535-21f16c26fb62" alt="" />
            <div className="wlt-name">Matic(Polygon)</div>
            <div className="c-s">(Coming Soon)</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/kucoin.svg?alt=media&token=71d66df0-d206-4284-a133-6b8f57a0847d" alt="" />
            <div className="wlt-name">Kucoin</div>
            <div className="c-s">(Coming Soon)</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/avalan.svg?alt=media&token=1a224b13-3e19-46a5-9f49-2f8257ec26bc" alt="" />
            <div className="wlt-name">Avalanche</div>
            <div className="c-s">(Coming Soon)</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/fanto.svg?alt=media&token=685e3298-63db-40bb-a874-4444caac74ee" alt="" />
            <div className="wlt-name">Fantom Opera</div>
            <div className="c-s">(Coming Soon)</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/crono.svg?alt=media&token=c2810b1b-b554-4571-99bc-952dee5ed896" alt="" />
            <div className="wlt-name">Cronos</div>
            <div className="c-s">(Coming Soon)</div>
          </div>
        </div>

        <div className="rln"></div>

        <div className="cn-b-r1 bttm" style={{"paddingBottom":"20px"}}>
          <div className="tsnt">Testnet</div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/eth.svg?alt=media&token=e5f2d2c3-81f1-45dc-966b-d39792df27d1" alt="" />
            <div className="wlt-name">BNB Smart Chain</div>
          </div>

          <div className="network">
            <img src="https://firebasestorage.googleapis.com/v0/b/e-launch-1fbd3.appspot.com/o/polygon.svg?alt=media&token=55fe43b2-0a47-46ca-b535-21f16c26fb62" alt="" />
            <div className="wlt-name">Matic(Mumbai)</div>
            <div className="c-s">(Coming Soon)</div>
          </div>

        </div>
      </div>
    </div>
  </div>
  )
}

export default Connect_network