let dataBase = []
const alertTxt = document.getElementById('alert')
const inputVal = document.getElementById('inputVal')
const saveTxt = document.getElementById('saveTxt')
const saveTab = document.getElementById('saveTab')
const deleteAll = document.getElementById('deleteAll')
const myList = document.getElementById('myList')
const preSaved = JSON.parse(localStorage.getItem('localDB'))


if(preSaved){
    dataBase = preSaved
    renderList(dataBase)
}


saveTxt.addEventListener("click",()=> {
    if(inputVal.value.length > 0 ){ 
        dataBase.push(inputVal.value)
        alertTxt.style.display = "none"
        localStorage.setItem('localDB',JSON.stringify(dataBase))
        localDB = JSON.parse(localStorage.getItem('localDB'))
        renderList(localDB)
    }
    else{
        alertTxt.style.display = "block"
    }
    inputVal.value = null

})



saveTab.addEventListener("click", ()=> {
     alertTxt.style.display = "none"
       chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            dataBase.push(tabs[0].url)
            localStorage.setItem("localDB", JSON.stringify(dataBase) )
            localDB = JSON.parse(localStorage.getItem('localDB'))
            renderList(localDB)

        })
})

deleteAll.addEventListener("dblclick", ()=> {
    dataBase = []
    localStorage.setItem("localDB", JSON.stringify(dataBase))
    myList.innerHTML = null
})



function renderList(arr){
    myList.innerHTML = null
    let checkLink = false
    if(arr.length<=0){
        
    }
    else{
        for(i=0; i<arr.length; i++){
            checkLink = arr[i].startsWith("https://")
            if(checkLink == true){
                myList.innerHTML += `<li>
                <a href='${arr[i]}' target='_blank'>
                ${arr[i]}
                </a>
                </li>`
            }
            else{
                myList.innerHTML += `<li>${arr[i]}</li>`
            }
        }
    }
   
}