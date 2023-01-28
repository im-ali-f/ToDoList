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
})    

const checkNone=document.querySelector("#itemType");
checkNone.addEventListener("click",(e)=>{
    if(checkNone.value == "none"){
    const timeIfNone=document.querySelector("#formDate")
    timeIfNone.toggleAttribute("disabled")
}
})

/*refresh todo list and show*/
whole=[{"id":1,"date":"11-4-99","subject":"item 1","text":"i must do this do that","type":"today","group":"personal"},
{"id":2,"date":"11-3-99","subject":"item 2","text":"i must do this do that","type":"today","group":"personal"},
{"id":3,"date":"11-3-99","subject":"item 3","text":"i must do this do that","type":"today","group":"personal"},
]
function refresh(day="today") {
    if(day="today"){
        whole.forEach(toDoWholeItem => {
        const timeTable=document.querySelector(".timeTable");
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
        
        });
        whole.forEach(toDoWholeItem => {
            let delName= `delete_${toDoWholeItem["id"]}`
            eval(`const ${delName} =document.querySelector(\`#delete_${toDoWholeItem["id"]}\`);`)
            console.log(delName)
            eval(`${delName}`).addEventListener("click",(e)=>{
                eval(`${delName}`).parentElement.parentElement.remove()
            })
            /*call editor there*/
        });
        whole.forEach(toDoWholeItem => {
            let checkName= `check_${toDoWholeItem["id"]}`
            eval(`const ${checkName} =document.querySelector(\`#check_${toDoWholeItem["id"]}\`);`)
            eval(`${checkName}`).addEventListener("click",(e)=>{
                eval(`${checkName}`).parentElement.parentElement.classList.toggle("checked")
                e.target.classList.toggle("checkedBTN_active")
            })
            /*call editor there*/
        });
        whole.forEach(toDoWholeItem => {
            let editName= `edit_${toDoWholeItem["id"]}`
            eval(`const ${editName} =document.querySelector(\`#edit_${toDoWholeItem["id"]}\`);`)
            eval(`${editName}`).addEventListener("click",(e)=>{
                /*first create editor ...*/
            })
        });
        
    }
    
        
    }
/* get info forom html and send it to storage ! */
const addFormBTN = document.querySelector("#addFormBTN")
addFormBTN.addEventListener("click",(e)=>{
    addToStorage()
    e.preventDefault()
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
    console.log(formInfo)
    /* send to storage */
}

refresh(whole)
console.log("#")
addToStorage()