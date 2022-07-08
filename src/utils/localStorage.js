
const keyValue=  "connectInfoELaunch"

const createLocalStorage = (userAddress, connected)=>{

    const connectObject = {
        "userAddress" : userAddress,
        "connected" : connected
    }

    localStorage.setItem(keyValue, JSON.stringify(connectObject))

}

const readLocalStorage = ()=>{

    const connectionData =  localStorage.getItem(keyValue)

    if (connectionData === null){
        return null
    }

    return JSON.parse(connectionData)
}

const clearLocalStorage = ()=>{
    localStorage.removeItem(keyValue)
}

export {createLocalStorage, readLocalStorage, clearLocalStorage}