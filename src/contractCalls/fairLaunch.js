import { ethers } from "ethers";
import { TransactionTypes } from "ethers/lib/utils";

import BUSD_FACTORY_ABI from '../ABIs/BNBsoftLaunchFactory.json'
import BNB_FACTORY_ABI from '../ABIs/BNBsoftLaunchFactory.json'
import BUSD_FL_ABI from '../ABIs/BUSDsoftLaunch.json'
import BNB_FL_IMPL_ABI from '../ABIs/BNBsoftLaunch.json'
import { BNB_FL_FACTORY_ADDRESS, BUSD_FL_FACTORY_ADDRESS,  } from "../constants/contract.config";

let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}

/* global BigInt */


export const handleCreateFLEPadBUSD = (saleStartTime, saleEndTime, minBuy, maxBuy, tokenToSell, softCap, totalTokensForSale, releaseDate, liquidityPercent, busdFee, refundType)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            const launchPadFactory = new ethers.Contract(BUSD_FL_FACTORY_ADDRESS, BUSD_FACTORY_ABI.abi, signer)

        const fee =  await launchPadFactory.flatFee()

        const minBuyWei = minBuy * Math.pow(10,18)

        const maxBuyWei =  maxBuy * Math.pow(10,18)

        const createLaunchPadRes =  await launchPadFactory.create(BigInt(saleStartTime), BigInt(saleEndTime), tokenToSell, (softCap), BigInt(liquidityPercent),  BigInt(busdFee), refundType, BigInt(totalTokensForSale), BigInt(releaseDate),  BigInt(minBuyWei), BigInt(maxBuyWei), {value:fee})

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


export const handleCreateFLaunchEPad = (saleStartTime, saleEndTime, minBuy, maxBuy, tokenToSell, softCap, totalTokensForSale, releaseDate, liquidityPercent, busdFee, refundType)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            const launchPadFactory = new ethers.Contract(BNB_FL_FACTORY_ADDRESS, BNB_FACTORY_ABI.abi, signer)

        const fee =  await launchPadFactory.flatFee()

        const minBuyWei = minBuy * Math.pow(10,18)

        const maxBuyWei =  maxBuy * Math.pow(10,18)

        const createLaunchPadRes =  await launchPadFactory.create(BigInt(saleStartTime), BigInt(saleEndTime), tokenToSell, (softCap), BigInt(liquidityPercent),  BigInt(busdFee), refundType, BigInt(totalTokensForSale), BigInt(releaseDate),  BigInt(minBuyWei), BigInt(maxBuyWei), {value:fee})

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


export const getLaunchPadContractDetails = (presaleAddress, launchPadType)=>{
    return new Promise(async (resolve,reject)=>{

        try{

        if(launchPadType === "BNB"){
            console.log(launchPadType, presaleAddress)
            const bnbLaunchPadContract =  new ethers.Contract(presaleAddress, BNB_FL_IMPL_ABI.abi, signer)
            console.log(bnbLaunchPadContract)
            const totalBNBReceived = bnbLaunchPadContract.totalBNBReceivedInAllTier()
            const totalTokensBought =  bnbLaunchPadContract.totalTokensBought()
            const totalBuyers = bnbLaunchPadContract.totalparticipants()
            const isPresaleFinalized =  bnbLaunchPadContract.presaleFinalized()


            const allData = await Promise.all([totalBNBReceived, totalTokensBought, totalBuyers, isPresaleFinalized])

            const dataRes = {
                presaleAddress : presaleAddress,
                totalReceived : allData[0].toString() / Math.pow(10,18),
                totalTokensBought : allData[1].toString() / Math.pow(10,18) ,
                totalBuyers : allData[2].toString(),
                presaleFinalized : allData[3]
            }

            resolve(dataRes)
        }
        else if(launchPadType === "BUSD"){
            console.log(launchPadType, presaleAddress)
            const busdLauchPadContract  =  new ethers.Contract(presaleAddress, BUSD_FL_ABI.abi, signer)
            const totalBNBReceived = busdLauchPadContract.totalBUSDReceivedInAllTier()
            // const totalTokensBought =  busdLauchPadContract.totalTokensBought()
            const totalBuyers = busdLauchPadContract.totalparticipants()
            const isPresaleFinalized =  busdLauchPadContract.presaleFinalized()

            const allData = await Promise.all([totalBNBReceived, totalBuyers, isPresaleFinalized])

            const dataRes = {
                presaleAddress : presaleAddress,
                totalReceived : allData[0].toString() / Math.pow(10,18),
                totalTokensBought : allData[1].toString() / Math.pow(10,18),
                totalBuyers : allData[2].toString(),
                presaleFinalized : allData[3]
            }

            resolve(dataRes)
        }
        else{
            reject({
                presaleAddress : presaleAddress
            })
        }

    }
    catch(error){
        console.log(error)
        reject({
            presaleAddress : presaleAddress
        })
    }

    })
}

