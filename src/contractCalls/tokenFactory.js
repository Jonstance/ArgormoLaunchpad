import { ethers } from "ethers"
import STANDARD_TOKEN_FACTORY_ABI from '../ABIs/StandardTokenFactory.json'
import TOKEN_FACTORY_BASE_ABI  from "../ABIs/TokenFactoryBase.json"
import { STANDARD_TOKEN_FACTORY_ADDRESS, TOKEN_FACTORY_BASE_ADDRESS } from '../constants/contract.config'


/* global BigInt */



let signer;
if(window.ethereum !== undefined){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
     signer = provider.getSigner()
}

const createStandardToken = (tokenName, tokenSymbol, tokenDecimals, totalSupply)=>{
    return new Promise(async(resolve,reject)=>{

        try{
            const tokenFactoryBaseContract  =  new ethers.Contract(TOKEN_FACTORY_BASE_ADDRESS, TOKEN_FACTORY_BASE_ABI.abi, signer)

            const flatFee =  await tokenFactoryBaseContract.flatFee()

                console.log(flatFee)

                const standardTokenFactory =  new ethers.Contract(STANDARD_TOKEN_FACTORY_ADDRESS, STANDARD_TOKEN_FACTORY_ABI.abi,signer)

                const createTokenReq =  await standardTokenFactory.create(tokenName, tokenSymbol,  tokenDecimals, BigInt(totalSupply * Math.pow(10,tokenDecimals)), {value:flatFee} )
                
                const createTokenResponse =  await createTokenReq.wait()

                console.log(createTokenResponse)

                const tokenCreatedEvent =  createTokenResponse.events[1]

                const returnObject  = {
                    address : tokenCreatedEvent.address,
                    transactionHash : tokenCreatedEvent.transactionHash,
                }

                resolve(returnObject)
        }
        
        catch(error){
            reject(false)
            
        }





    })
}


export {createStandardToken}