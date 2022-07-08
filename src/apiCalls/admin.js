import { API_URL } from "../constants/api.config"

const handleLoginAdmin = (emailAddress, password)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const requestObject  = {
                userEmail : emailAddress,
                password : password
            }
            const api =  await fetch(`${API_URL}auth/admin/login`, {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body: JSON.stringify(requestObject),
                credentials : "include"
            })
            const loginRes =  await api.json()
            resolve(loginRes)
        }
        
        catch(error){
            console.log(error)
            reject(false)
        }
    })
}

const checkAdminAuthStatusAPI = ()=>{
    return new Promise(async (resolve,reject)=>{
        try{
            const api =  await fetch(`${API_URL}auth/admin/checkStatus`, {
                method : "GET",
                headers : {
                    'Content-Type' : "application/json"
                },
                credentials : "include"
            })
            const loginRes =  await api.json()
            resolve(loginRes)
        }
        
        catch(error){
            console.log(error)
            reject(false)
        }
    })
}





export {handleLoginAdmin,checkAdminAuthStatusAPI}