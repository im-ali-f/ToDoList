const menuTimeScheduleBTN = document.querySelector(".menuTimeScheduleBTN")
const menuTimeSchedule = document.querySelector(".menuTimeSchedule")
menuTimeScheduleBTN.addEventListener("click",(e)=>{
    menuTimeScheduleBTN.classList.toggle('menuTimeScheduleBTN_color');
    menuTimeSchedule.classList.toggle('menuTimeSchedule_display');
})
const addBTN = document.querySelector(".addBTN")
const add = document.querySelector(".add")
addBTN.addEventListener("click",(e)=>{
    addBTN.classList.toggle('addBTN_color');
    add.classList.toggle('add_display');

    const addFormBTN=document.querySelector("#addFormBTN")
        addFormBTN.innerHTML=`Add !`
        addFormBTN.value=`add`
        addFormBTN.classList.add("addFormBTN")
        addFormBTN.classList.remove("editBTN")
    
    const itemSubject= document.querySelector("#itemSubject")
    const itemText= document.querySelector("#itemTxt")
    const itemType= document.querySelector("#itemType")
    const itemGroup= document.querySelector("#itemGroup")
    const timeIfNone=document.querySelector("#formDate")
    timeIfNone.disabled=true;
    timeIfNone.value=""
    itemSubject.value=""
    itemText.value=""
    itemType.value="today"
    itemGroup.value="daily"
})    

const checkNone=document.querySelector("#itemType");
checkNone.addEventListener("click",(e)=>{
    if(checkNone.value == "none"){
    const timeIfNone=document.querySelector("#formDate")
    timeIfNone.toggleAttribute("disabled")
}
})
/*get day and group we want to see from html*/
const menuFindBTN=document.querySelector("#menuFormBTN")
menuFindBTN.addEventListener("click",(e)=>{
    e.preventDefault();
    refresh()
})
function getMenu() {
    const form = document.querySelector("#menuForm");
    const formData = new FormData(form);
    let formInfo=[];
    for (const info of formData) {
        if(info[1]==""){
            var currentDate = new Date()
            var day = currentDate.getDate()
            if (day < 10)
                day=`0${day}`;
            var month = currentDate.getMonth() + 1
            if(month <10)
                month=`0${month}`;
            var year = currentDate.getFullYear()
            formInfo.push(`${year}-${month}-${day}`)
        }
        else
            formInfo.push(info[1])
     }
     return formInfo;
}
/*refresh todo list and show*/
function refresh(day="today") {
    const menuInfo=getMenu()
    day=menuInfo[1]
    wholeFromCombiner=combiner(day)
    whole=[]
    wholeFromCombiner.forEach(wholeToDo=> {
        if(menuInfo[0]=="all"){
            whole=wholeFromCombiner;
        }
        else{
            if(wholeToDo["group"]==menuInfo[0])
                whole.push(wholeToDo)
        }
    });
    const timeTable=document.querySelector(".timeTable");
    timeTable.innerHTML="";
    if (whole){
        if(day="today"){
        whole.forEach(toDoWholeItem => {
            if(toDoWholeItem["checked"]){
                timeTable.innerHTML+=`<div class="toDo checked">
                            <div class="information">
                                <p class="date">${toDoWholeItem["date"]}</p>
                                <div class="subject">${toDoWholeItem["subject"]}</div>
                            </div>
                            
                            <div class="txt">
                            ${toDoWholeItem["text"]}
                            </div>

                            <div class="typeAndGroup">
                                <div class="type">${toDoWholeItem["type"]}</div>
                                <div class="group">${toDoWholeItem["group"]}</div>
                            </div>
                            
                            <div class="operations">
                                <div class="check opBTN" id="check_${toDoWholeItem["id"]}"><i class="fa-regular fa-square-check"></i></div>
                                <div class="edit opBTN" id="edit_${toDoWholeItem["id"]}"><i class="fa-regular fa-pen-to-square"></i></div>
                                <div class="delete opBTN" id="delete_${toDoWholeItem["id"]}"><i class="fa-solid fa-trash"></i></div>
                            </div>
                            </div>`
            }
            else{
                timeTable.innerHTML+=`<div class="toDo">
                            <div class="information">
                                <p class="date">${toDoWholeItem["date"]}</p>
                                <div class="subject">${toDoWholeItem["subject"]}</div>
                            </div>
                            
                            <div class="txt">
                            ${toDoWholeItem["text"]}
                            </div>

                            <div class="typeAndGroup">
                                <div class="type">${toDoWholeItem["type"]}</div>
                                <div class="group">${toDoWholeItem["group"]}</div>
                            </div>
                            
                            <div class="operations">
                                <div class="check opBTN" id="check_${toDoWholeItem["id"]}"><i class="fa-regular fa-square-check"></i></div>
                                <div class="edit opBTN" id="edit_${toDoWholeItem["id"]}"><i class="fa-regular fa-pen-to-square"></i></div>
                                <div class="delete opBTN" id="delete_${toDoWholeItem["id"]}"><i class="fa-solid fa-trash"></i></div>
                            </div>
                            </div>`
            }
        
        
        });
        whole.forEach(toDoWholeItem => {
            let delName= `delete_${toDoWholeItem["id"]}`
            eval(`const ${delName} =document.querySelector(\`#delete_${toDoWholeItem["id"]}\`);`)
            eval(`${delName}`).addEventListener("click",(e)=>{
                eval(`${delName}`).parentElement.parentElement.remove()
                toDoEditor("delete",delName)
            })
            
        });
        whole.forEach(toDoWholeItem => {
            let checkName= `check_${toDoWholeItem["id"]}`
            eval(`const ${checkName} =document.querySelector(\`#check_${toDoWholeItem["id"]}\`);`)
            eval(`${checkName}`).addEventListener("click",(e)=>{
                eval(`${checkName}`).parentElement.parentElement.classList.toggle("checked")
                e.target.classList.toggle("checkedBTN_active")
                toDoEditor("check",checkName)
            })
            
        });
        whole.forEach(toDoWholeItem => {
            let editName= `edit_${toDoWholeItem["id"]}`
            eval(`const ${editName} =document.querySelector(\`#edit_${toDoWholeItem["id"]}\`);`)
            eval(`${editName}`).addEventListener("click",(e)=>{
                toDoEditor("edit",editName)
            })
        });
        
    }
    }
    
    
        
    }

/* get info forom html and send it to storage ! */

const addFormBTN = document.querySelector("#addFormBTN")
addFormBTN.addEventListener("click",(e)=>{
    e.preventDefault()
    if(e.target.value=="add")
        addToStorage()
    else
        editStorage(e.target.value)
    refresh()
})
function addToStorage(){
    const form = document.querySelector("#addForm");
    const formData = new FormData(form);
    let formInfo=[];
    for (const info of formData) {
       formInfo.push(info[1]) 
    }
    if(formInfo.length ==4){
       formInfo.push("0") 
    }
    if(formInfo[4]==""){
        formInfo[4]="0";
    }
    const completeFormInfo={"id":globalToDoCounter(),"date":"0","subject":formInfo[0],"text":formInfo[1],"type":formInfo[3],"ifNone":formInfo[4],"group":formInfo[2],"checked":false}
    let oldWhole=storage()
    if(oldWhole){
       oldWhole.push(completeFormInfo) 
    }
    else{
        oldWhole=[completeFormInfo]
    }
    storage(oldWhole)
    fixDate()
}

/* storage */

function storage(wholeToDo=[]) {
    if (wholeToDo.length == 0){
        return JSON.parse(localStorage.getItem("toDos"));
    }
    else if(wholeToDo == "clear"){
        localStorage.clear()
    }
    else{
        localStorage.clear()
        localStorage.setItem("toDos",JSON.stringify(wholeToDo));
    }
}
function globalToDoCounter() {
    const toDos=storage()
    let max=1;
    if(toDos==null)
        return max
    toDos.forEach(wholeToDo => {
    if(max<wholeToDo["id"])
        max=wholeToDo["id"]
    });

    if (toDos){
        
        return max + 1;
    }
    else{
        return max;
    }
    
}

/*fix date function set proper date for every*/

function fixDate() {
    var currentDate = new Date()
    var day = currentDate.getDate()
    if (day < 10)
        day=`0${day}`;
    var month = currentDate.getMonth() + 1
    if(month <10)
        month=`0${month}`;
    var year = currentDate.getFullYear()
    let whole=storage()
    whole.forEach(wholeToDo => {
        if(wholeToDo["date"] == "0"){
            if(wholeToDo["type"] != "none")
                wholeToDo["date"] = `${year}-${month}-${day}`
            else
                if(wholeToDo["ifNone"] !=0)
                    wholeToDo["date"] = wholeToDo["ifNone"]
                else
                wholeToDo["date"] = `${year}-${month}-${day}`
        }
    });
    storage(whole);
}

function combiner(day) {
    const whole = storage()
    let wholeToReturn=[]
    if(whole==null)
        return wholeToReturn
    
    whole.forEach(toDowhole => {
        if(toDowhole["type"]=="everyDay"){
            wholeToReturn.push(toDowhole)
        }
        else if(toDowhole["type"]=="everyWeek"){
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

            const d1 = new Date(toDowhole["date"]);
            let day1 = weekday[d1.getDay()];
            
            const d2 = new Date(day);
            let day2 = weekday[d2.getDay()];
            if(day1==day2){
                wholeToReturn.push(toDowhole)
            }
        }
        else if(day == toDowhole["date"]){
            wholeToReturn.push(toDowhole)
        }
    });
    return wholeToReturn;
}
function toDoEditor(op,name) {
    let whole=storage()
    if(op == "edit"){
        const id=name.split("_")[1]
        whole.forEach(wholeToDo => {
            if(wholeToDo["id"]==id){
                const itemSubject= document.querySelector("#itemSubject")
                const itemText= document.querySelector("#itemTxt")
                const itemType= document.querySelector("#itemType")
                const itemGroup= document.querySelector("#itemGroup")
                const timeIfNone=document.querySelector("#formDate")
                timeIfNone.disabled=true;
                if(wholeToDo["type"] =="none"){
                    timeIfNone.disabled=false;
                    timeIfNone.value=wholeToDo["ifNone"]
                }

                itemSubject.value=wholeToDo["subject"]
                itemText.value=wholeToDo["text"]
                itemType.value=wholeToDo["type"]
                itemGroup.value=wholeToDo["group"]
                addBTN.classList.add('addBTN_color');
                add.classList.add('add_display');
            }
        });
        const addFormBTN=document.querySelector("#addFormBTN")
        addFormBTN.innerHTML=`Edit id : ${id} !`
        addFormBTN.value=`${id}`
        addFormBTN.classList.add("editBTN")
        
    }
    else if(op == "delete"){
        const id=name.split("_")[1]
        whole.forEach(wholeToDo => {
            if(wholeToDo["id"]==id){
                whole = whole.filter(function(item) {
                    return item !== wholeToDo
                })
                
            }
        });
        console.log(whole)
        if(whole.length != 0)
            storage(whole)
        else
            storage("clear")  
    }
    else if(op == "check"){
        whole.forEach(wholeToDo => {
            const id=name.split("_")[1]
            if(wholeToDo["id"]==id)
                if(wholeToDo["checked"])
                    wholeToDo["checked"]=false
                else
                    wholeToDo["checked"]=true
        });
        storage(whole)
    }
}
function editStorage(id) {
    const itemSubject= document.querySelector("#itemSubject")
    const itemText= document.querySelector("#itemTxt")
    const itemType= document.querySelector("#itemType")
    const itemGroup= document.querySelector("#itemGroup")
    const timeIfNone=document.querySelector("#formDate")

    const whole=storage()    
    whole.forEach(wholeToDo => {
        if(wholeToDo["id"]==id){
            wholeToDo["subject"]=itemSubject.value;
            wholeToDo["text"]=itemText.value;
            wholeToDo["type"]=itemType.value;
            wholeToDo["group"]=itemGroup.value;
            wholeToDo["subject"]=itemSubject.value;
            if(itemType.value=="none"){
                if(timeIfNone.value != ""){
                    wholeToDo["date"]=timeIfNone.value  
                    wholeToDo["ifNone"]=timeIfNone.value  
                }
            }
        }
    });
    storage(whole)
    fixDate()
}
refresh()
