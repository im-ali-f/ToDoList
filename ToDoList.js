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
