import { API_URL } from "../constants/api.config"

export const saveLaunchPad = (ePadData)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const api = await fetch(`${API_URL}launchPad/create`, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                credentials :'include',
                body : JSON.stringify(ePadData)
            })
    
            const response =  await api.json()
    
            resolve(response)
        }

        catch(error){
            console.log(error)
            reject({
                success : false,
                reason : "An Error Occured"
            })
        }
      
    })
}


export const getAllLaunchPads = ()=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const api =  await fetch(`${API_URL}launchPad/getAll`)
            const response = await api.json()
            resolve(response)
        }
        catch(error){
            console.log(error)

            const response = {
                success : false, 
                reason : "An Error Occured"
            } 

            reject(response)
        }
    })
}

export const getOneLaunchPadData = (ePadId)=>{
    return new Promise(async(resolve,reject)=>{
        try{
            const api =  await fetch(`${API_URL}launchPad/get/${ePadId}`)
            const response = await api.json()
            resolve(response)
        }
        catch(error){
            console.log(error)

            const response = {
                success : false, 
                reason : "An Error Occured"
            } 

            reject(response)
        }
    })
}

export const launchPadCredSettings = (credKey, epadId)=>{
    return new Promise(async (resolve,reject)=>{

        const requestObject = {
            credKey : credKey,
            ePadId : epadId
        }

        try{
            const api = await fetch(`${API_URL}launchPad/updateCredibilityDetails`, {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify(requestObject),
                credentials : "include"
            })

            const result =  await api.json()

            resolve(result)
        }

        catch(error){
            console.log(error)
            reject(false)
        }
       
    })
}