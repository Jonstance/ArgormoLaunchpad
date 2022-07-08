/* global BigInt */


import { ethers } from "ethers";

import AirdropABI from '../ABIs/Airdrop.json'
import { AIRDROP_CONTRACT_ADDRESS } from "../constants/contract.config";

let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}


const handleCreateAirdrop  = (tokenAddress, receivers, amountsToReceive)=>{
    return new Promise(async (resolve,reject)=>{
        const airDropContract =  new ethers.Contract(AIRDROP_CONTRACT_ADDRESS, AirdropABI, signer)

        const airdropFee =   await airDropContract.dropFee()

        try{
             await airDropContract.airdrop(tokenAddress, receivers, amountsToReceive, {
                 value : airdropFee
             })
            resolve(true)
        }
        catch(error){
            console.log(error)
            reject(false)
        }



    })
}


export {handleCreateAirdrop}

