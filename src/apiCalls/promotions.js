import { API_URL } from "../constants/api.config"

const handleCreatePromotion = (poolLink, name, logo, promotionType, projectSymbol, endDate )=>{
    return new Promise(async (resolve, reject) => {
        try{
            const requestObject =  {
                poolLink:poolLink ,
                name:name,
                logo:logo,
                projectSymbol : projectSymbol,
                promotionType:promotionType,
                endDate : endDate
            }
            const api = await fetch(`${API_URL}promotions/create`, {
                method : "POST",
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify(requestObject),
                credentials : "include"
            })

            const apiRes =  await api.json()
            resolve(apiRes)
        }
        catch(error){
            console.log(error)
            reject(false)
        }
       
    })
}


const getAllPromotions = ()=>{
    return new Promise(async (resolve, reject) => {
        try{
            const api = await fetch(`${API_URL}promotions/getAll`, {
                method : 'GET',
                headers : {
                    'Content-Type' : "application/json"
                },
            })

            const response =  await api.json()
            resolve(response)
        }
        catch(error){
            console.log(error)
            reject(false)
        }
       
    })
}

export {handleCreatePromotion, getAllPromotions}