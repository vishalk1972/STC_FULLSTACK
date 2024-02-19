const storeInLocal=(key,value)=>{
    return localStorage.setItem(key,value)
}
const lookInLocal=(key)=>{
    return localStorage.getItem(key)
}
const removeFromLocal=(key)=>{
    return localStorage.removeItem(key)
}

export {storeInLocal,removeFromLocal,lookInLocal};