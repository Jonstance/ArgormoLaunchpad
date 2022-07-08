import { ethers } from "ethers";
import { TransactionTypes } from "ethers/lib/utils";

import BUSD_FACTORY_ABI from '../ABIs/BUSDLaunchPadFactory.json'
import BNB_FACTORY_ABI from '../ABIs/BNBLaunchPadFactory.json'
import { BNB_FACTORY_ADDRESS, BUSD_FACTORY_ADDRESS,  } from "../constants/contract.config";

let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}

/* global BigInt */


export const handleCreateEPadBUSD = (saleStartTime, saleEndTime, minBuy, maxBuy, tokenToSell, hardCap, softCap, presaleRate, listingRate, liquidityPercent, busdFee, refundType)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            const launchPadFactory = new ethers.Contract(BUSD_FACTORY_ADDRESS, BUSD_FACTORY_ABI.abi, signer)

        const fee =  await launchPadFactory.flatFee()

        const minBuyWei = minBuy * Math.pow(10,18)

        const maxBuyWei =  maxBuy * Math.pow(10,18)

        const createLaunchPadRes =  await launchPadFactory.create(BigInt(saleStartTime), BigInt(saleEndTime), BigInt(minBuyWei), BigInt(maxBuyWei), tokenToSell, BigInt(hardCap), BigInt(softCap), BigInt(presaleRate), BigInt(listingRate), BigInt(liquidityPercent), BigInt(busdFee), refundType,{value:fee})

        const transaction =  await createLaunchPadRes.wait()

        console.log(transaction.events)

        const presaleEmittedEvent =  await transaction.events[0]

        console.log(presaleEmittedEvent, "event emitted")

        const presaleAddress =  presaleEmittedEvent.address

        resolve(presaleAddress)
        }
        catch(error){
            console.log(error)

            reject("")
        }

    })
    

}


export const handleCreateEPadBNB = (saleStartTime, saleEndTime, minBuy, maxBuy, tokenToSell, hardCap, softCap, presaleRate, listingRate, liquidityPercent, busdFee, refundType)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            console.log(BNB_FACTORY_ADDRESS)
            const launchPadFactory = new ethers.Contract(BNB_FACTORY_ADDRESS, BNB_FACTORY_ABI.abi, signer)

        const fee =  await launchPadFactory.flatFee()

        const minBuyWei = minBuy * Math.pow(10,18)

        const maxBuyWei =  maxBuy * Math.pow(10,18)

        const createLaunchPadRes =  await launchPadFactory.create(BigInt(saleStartTime), BigInt(saleEndTime), BigInt(minBuyWei), BigInt(maxBuyWei), tokenToSell, (hardCap), (softCap), BigInt(presaleRate), BigInt(listingRate), BigInt(liquidityPercent), BigInt(busdFee), refundType,{value:fee})

        const transaction =  await createLaunchPadRes.wait()

        console.log(transaction.events)

        const presaleEmittedEvent =  await transaction.events[0]

        console.log(presaleEmittedEvent, "event emitted")

        const presaleAddress =  presaleEmittedEvent.address

        resolve(presaleAddress)
        }
        catch(error){
            console.log(error)

            reject("")
        }

    })
    

}
