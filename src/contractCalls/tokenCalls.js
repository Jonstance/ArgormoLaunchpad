import { ethers } from "ethers";

import STANDARDTOKEN_ABI from '../ABIs/StandardToken.json'

/* global BigInt */


let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}



export const getTokenBalance = async (tokenAddress, userAddress)=>{
    console.log(tokenAddress, userAddress)
    return new Promise(async (resolve,reject)=>{
        try{
            const tokenContract =  new ethers.Contract(tokenAddress, STANDARDTOKEN_ABI.abi, signer)
            const getDecimals =  tokenContract.decimals()
            const userBalanceRes  =  tokenContract.balanceOf(userAddress)
            const promiseData =  await Promise.all([userBalanceRes, getDecimals])
            console.log(promiseData)
            const userBalance =  promiseData[0].toString() / Math.pow(10, parseInt(promiseData[1].toString()))
            console.log(userBalance)
            resolve(userBalance)
        }

        catch(error){
            console.log(error)
            reject(0)

        }
        
    })
}

export const approveToken = (spenderAddress, amount, tokenAddress)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const tokenContract =  new ethers.Contract(tokenAddress, STANDARDTOKEN_ABI.abi, signer)

            const getDecimals =  await tokenContract.decimals()
    
    
            const parsedAmount= BigInt(amount * Math.pow(10, getDecimals.toString()))
    
            const result =  await tokenContract.approve(spenderAddress, parsedAmount)

            await result.wait()
    
            resolve([true, getDecimals.toString()])
        }

        catch(error){
            console.log(error)
            reject([false, ""])
        }
       
    })
}

export const getTokenDetails = (tokenAddress)=>{
    return new Promise(async (resolve,reject)=>{
        const tokenContract =  new ethers.Contract(tokenAddress, STANDARDTOKEN_ABI.abi, signer)
        console.log(tokenContract)
        const tokenNameReq =  tokenContract.name()
        const tokenSymbolReq =  tokenContract.symbol()
        const tokenDecimalsReq = tokenContract.decimals()

        try{
            const tokenDetailsPromise = await Promise.all([tokenNameReq, tokenSymbolReq, tokenDecimalsReq])

            const response =  {
                tokenAddress : tokenAddress,
                tokenName : tokenDetailsPromise[0],
                tokenSymbol : tokenDetailsPromise[1],
                tokenDecimals : Number(tokenDetailsPromise[2].toString())
            }
    
            resolve(response)
        }
        catch(error){
            console.log(error )
            reject(false)
        }
      
        
    })
}