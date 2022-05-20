function loadData(key){
try{
let data = localStorage.getItem(key)
data = JSON.parse(data)
return data
}
catch(err){
return undefined
}
}

const saveData= async(key,data) => {
    await localStorage.setItem(key,JSON.stringify(data))

}

export {loadData,saveData}