const input = document.querySelector("#input");
const button = document.querySelector("#button");
const tasks = document.querySelector("#tasks");
let myTasks = [];

function domHandler(){
    tasks.innerHTML = "";
    myTasks.forEach((item) => {
        let className = (item.status) ? "task completed" : "task";
        tasks.insertAdjacentHTML("beforeend",`<li class="${className}" onclick ="statusHandler(event)">${item.task} <img onclick="deleteHandler(event)" src="./img/close-x-svgrepo-com.svg" alt="close"></li>`);
    })
};

function addTaskHandler(){
    let inputValue = input.value;
    if(!inputValue){
        return
    };
    let taskObj = {task:inputValue,status: false};
    myTasks.push(taskObj);
    syncLocal()
    input.value = "";
    
};

function statusHandler(event){
   let index = myTasks.findIndex((item) => {
      return item.task == event.target.innerText;
    }); 
    (myTasks[index].status) ? myTasks[index].status = false : myTasks[index].status = true;
    syncLocal()
    
};

function deleteHandler(event){
    event.stopPropagation()
    taskValue = event.target.parentElement.innerText;
    let index = myTasks.findIndex((item) => {
        return item.task == taskValue;
      });
    myTasks.splice(index,1)
    syncLocal()
    
};

function syncLocal(){
    localStorage.setItem("task",JSON.stringify(myTasks));
    domHandler();
}

window.addEventListener("load",() => {
    myTasks = JSON.parse(localStorage.getItem("task")) || [];
    domHandler()
});
button.addEventListener("click",addTaskHandler);
input.addEventListener("keydown",(event) => {
    if(event.key == "Enter"){
        addTaskHandler()
    }
});