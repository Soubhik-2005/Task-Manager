const form = document.querySelector("form");
const taskInput = document.querySelector("#task-input");
const dropdown = document.querySelector("#dropdown");
const cardArea = document.querySelector(".card-area");
const completed = document.querySelector(".completed");
const edit = document.querySelector(".edit");
const delete_ = document.querySelector(".delete");
const displayParent = document.querySelector(".displayParent");

let completeTask = 0;
let totalTask = 0;




let pendingTask = totalTask-completeTask;
// console.log(taskInput);

let task=JSON.parse(localStorage.getItem("task")) || [];
console.log(task);

function ui(){
    cardArea.innerHTML ="";
    task.forEach((elem,idx)=>{
    cardArea.innerHTML += `<div class="card">
            <p>${elem.input} ${elem.purpose}</p>
            <div class="btn">
            <button onclick="completedfunc(${idx})" class="completed">Completed</button>
            <button class="edit">Edit</button>
            <button onclick="deletefunc(${idx})" class="delete">Delete</button>
            </div>
        </div>`;
})
}

function updateDashboard(){
        displayParent.innerHTML="";
        displayParent.innerHTML+=`
        <div class="display">
        <div class="left">
          <p class="total">${totalTask}</p>
          <p>Total task</p>
        </div>
        <div class="middle">
          <p class="complete">${completeTask}</p>
          <p>Completed task</p>
        </div>
        <div class="right">
          <p class="pending">${totalTask-completeTask}</p>
          <p>Pending task</p>
        </div>
        </div>`
}

updateDashboard();
ui();
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let input = taskInput.value;
    let purpose = dropdown.value;
    // console.log(taskInput)
    if( input.trim() == "" || purpose == "Purpose") return
    task.push({
        input,
        purpose,
    })
    localStorage.setItem("task",JSON.stringify(task));
    totalTask++;
    updateDashboard();
    ui();
});

function completedfunc(idx){
    
        task.splice(idx,1);
        localStorage.setItem("task",JSON.stringify(task));
        completeTask++;
        updateDashboard();
        ui();
}

function deletefunc(idx){
        totalTask--;
        updateDashboard();
        task.splice(idx,1);
        localStorage.setItem("task",JSON.stringify(task));
        ui();
}

// function editfunc(idx){
    
//         arr.splice(idx,1);
//         ui();
// }



