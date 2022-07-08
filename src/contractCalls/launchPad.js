import { ethers } from "ethers";
import { TransactionTypes } from "ethers/lib/utils";

import BUSD_CONTRACT_IMPL from '../ABIs/BUSDLaunchPad.json'
import BNB_CONTRACT_IMPL from '../ABIs/BNBLaunchPad.json'
import { BUSD_LAUNCH_PAD,  } from "../constants/contract.config";

let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}



/* global BigInt */


export const handleBuyTokensWithBUSD = (amount, presaleAddress)=>{

    return new Promise(async (resolve,reject)=>{

        try{
            const presaleContract =  new ethers.Contract(presaleAddress, BUSD_CONTRACT_IMPL.abi, signer)

        const amountInWei =  amount * Math.pow(10, 18)
    
        const presaleResult =  await presaleContract.buyTokens(BigInt(amountInWei))

        console.log(presaleResult)

        resolve(true)
        }

        catch(error){
            console.log(error)

            reject(false)
        }
        
    
    })

  
}


export const handleBuyTokensWithBNB = (amount, presaleAddress)=>{

    return new Promise(async (resolve,reject)=>{

        try{
           
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            const walletSigner = provider.getSigner()

            const amountInWei =  ethers.utils.parseEther(amount.toString())


           const transactionResponse =  await  walletSigner.sendTransaction({
                to : presaleAddress,
                value : amountInWei,
                gasLimit : 1000000,
            })

            await transactionResponse.wait()

            resolve(true)
        //     const presaleContract =  new ethers.Contract(presaleAddress, BNB_CONTRACT_IMPL.abi, signer)


        // console.log(amountInWei)
    
        // const presaleResult =  await presaleContract.buyTokens({value:amountInWei, gasLimit:100000})

        // console.log(presaleResult)

        }

        catch(error){
            console.log(error)

            reject(false)
        }
        
    
    })

}

export const handlePresaleFinalize = async(presaleAddress)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const presaleContract =  new ethers.Contract(presaleAddress, BNB_CONTRACT_IMPL.abi, signer)
        await presaleContract.finalize()
        resolve(true)
        }

        catch(error){
                reject(false)
        }
        
    })
}

export const getLaunchPadContractDetails = (presaleAddress, launchPadType)=>{
    return new Promise(async (resolve,reject)=>{

        try{

        if(launchPadType === "BNB"){
            const bnbLaunchPadContract =  new ethers.Contract(presaleAddress, BNB_CONTRACT_IMPL.abi, signer)
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
            const busdLauchPadContract  =  new ethers.Contract(presaleAddress, BUSD_CONTRACT_IMPL.abi, signer)
            const totalBNBReceived = busdLauchPadContract.totalBUSDReceivedInAllTier()
            const totalTokensBought =  busdLauchPadContract.totalTokensBought()
            const totalBuyers = busdLauchPadContract.totalparticipants()
            const isPresaleFinalized =  busdLauchPadContract.presaleFinalized()

            const allData = await Promise.all([totalBNBReceived, totalTokensBought, totalBuyers, isPresaleFinalized])

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


export const claimTokensLaunchPad  = (presaleAddress)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const launchPad = new ethers.Contract(presaleAddress, BUSD_CONTRACT_IMPL.abi, signer)

        await launchPad.claimTokens()

        resolve(true)
        }

        catch(error){
            console.log(error)
            reject(false)
        }
        
    })
}

export const withdrawContribution = (presaleAddress)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const launchPad = new ethers.Contract(presaleAddress, BUSD_CONTRACT_IMPL.abi, signer)

        await launchPad.withdrawContribution()

        resolve(true)
        }

        catch(error){
            console.log(error)
            reject(false)
        }
        
    })
}
