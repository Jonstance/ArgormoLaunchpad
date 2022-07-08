import { ethers } from "ethers";

import ELockABI from '../ABIs/ELock.json'
import { E_LOCK_CONTRACT_ADDRESS } from "../constants/contract.config";

let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}

/* global BigInt */



export const handleCreateLock = async (tokenAddress, ownerAddress, isLpToken, amount, unlockDate, description, decimals)=>{

    return new Promise(async (resolve,reject)=>{

        try{

            const eLockContract = new ethers.Contract(E_LOCK_CONTRACT_ADDRESS, ELockABI, signer)



            const eLockRes = await eLockContract.lock(ownerAddress, tokenAddress , isLpToken, BigInt(amount * Math.pow(10,decimals)), unlockDate, description)
            
            console.log(eLockRes)

            resolve(true)
        }

        catch(error){
            console.log(error)
            reject(false)
        }

    })

}


export const handleGetAllNormalUserLocks = (userAddress)=>{
    if(userAddress.trim() === "" ){
        return 
    }
    return new Promise(async(resolve,reject)=>{
        try{
            const eLockContract = new ethers.Contract(E_LOCK_CONTRACT_ADDRESS, ELockABI, signer)

            const userElocks = await eLockContract.normalLocksForUser(userAddress)
            resolve(userElocks)

        }
        catch(error){
            console.log(error)
            reject([])
        }
    })
}

export const handleGetAllLPLocksForUser = (userAddress)=>{
    if(userAddress.trim() === "" ){
        return 
    }

    return new Promise(async(resolve,reject)=>{
        try{
            const eLockContract = new ethers.Contract(E_LOCK_CONTRACT_ADDRESS, ELockABI, signer)

            const userElocks = await eLockContract.lpLocksForUser(userAddress)
            resolve(userElocks)
        }
        catch(error){
            console.log(error)
            reject([])
        }
    })
}

export const getLockInfoById = (lockId)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const eLockContract = new ethers.Contract(E_LOCK_CONTRACT_ADDRESS, ELockABI, signer)

            const lockDetails  =  await eLockContract.getLockById(lockId)

            resolve(lockDetails)
        }
        catch(error){
            console.log(error)
            reject({})
        }
        

    })
}

export const unLockUserLock = (lockId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const eLockContract = new ethers.Contract(E_LOCK_CONTRACT_ADDRESS, ELockABI, signer)

             await eLockContract.unlock(lockId)

            resolve(true)
        }
        catch(error){
            console.log(error)
            reject(false)
        }
    })
}

export const renounceLockOwnerShip = (lockId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const eLockContract = new ethers.Contract(E_LOCK_CONTRACT_ADDRESS, ELockABI, signer)

             await eLockContract.renounceLockOwnership(lockId)

            resolve(true)
        }
        catch(error){
            console.log(error)
            reject(false)
        }
    })
}
