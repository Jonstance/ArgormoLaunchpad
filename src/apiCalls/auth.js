import { API_URL } from "../constants/api.config"

export const handleLogin = (userAddress)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const apiURL = `${API_URL}auth/login`

            const authBody  = {
                userAddress : userAddress
            }
            const api =  await fetch(apiURL, {
                method : 'POST',
                credentials : 'include',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify(authBody)
            })
    
            const response =  await api.json()

            console.log(response)
    
            resolve(true)
        }
        catch(error){
            console.log(error)
            resolve(false)
        }
       
        }

    )
}

export const handleLogoutAPI = ()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const apiURL = `${API_URL}auth/logout`

            const api =  await fetch(apiURL, {
                method : 'POST',
                credentials : 'include',
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
    
            const response =  await api.json()

            console.log(response)
    
            resolve(true)
        }
        catch(error){
            console.log(error)
            resolve(false)
        }
       
        }

    )
}