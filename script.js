const form = document.querySelector("form");
const taskInput = document.querySelector("#task-input");
const dropdown = document.querySelector("#dropdown");
const cardArea = document.querySelector(".card-area");
const completed = document.querySelector(".completed");
const edit = document.querySelector(".edit");
const delete_ = document.querySelector(".delete");
const displayParent = document.querySelector(".displayParent");
const outerEditDiv = document.querySelector(".outer-edit-div");
const cross = document.querySelector

let task=JSON.parse(localStorage.getItem("task")) || [];


function ui(){
    cardArea.innerHTML ="";
    task.forEach((elem,idx)=>{
    cardArea.innerHTML += `<div class="card">
            <p>${elem.input} ${elem.purpose}</p>
            <div class="status">${elem.status} </div>
            <div class="btn">
            <button onclick="completedfunc(${idx})" class="completed">Completed</button>
            <button onclick="editfunc(${idx})" class="edit">Edit</button>
            <button onclick="deletefunc(${idx})" class="delete">Delete</button>
            </div>
        </div>`;
})
}

function updateDashboard(){
        let totalTask = task.length;
        let completeTask = task.filter(a=> a.status === "Completed").length;
        let pendingTask = task.filter(a=> a.status === "Pending").length;
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
          <p class="pending">${pendingTask}</p>
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
        status:"Pending"
    })
    localStorage.setItem("task",JSON.stringify(task));

    
    updateDashboard();
    ui();
});

function completedfunc(idx){
    
        task[idx].status = "Completed";
        localStorage.setItem("task",JSON.stringify(task));
        updateDashboard();
        ui();
}

function deletefunc(idx){
        task.splice(idx,1);
        localStorage.setItem("task",JSON.stringify(task));
        updateDashboard();
        ui();
}

document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("cross")){
                outerEditDiv.style.display = "none";
        }
}
)

function editfunc(idx){
        outerEditDiv.style.display="block";
        outerEditDiv.innerHTML=` 
        <div class="edit-div">
        <div class="cross">X</div>
        <form action="" class="edit-form">
                <input type="text" class="edit-input" value="${task[idx].input}">
                <select name="dropdown" class="edit-purpose" id="dropdown">
                 <option value="${task[idx].purpose}">${task[idx].purpose} </option>
                 <option value="Personal">Personal</option>
                 <option value="Work">Work</option>
                 <option value="Study">Study</option>
                 <option value="Other">Other</option>
                </select>
                <button class="edit-button" data-id="${idx}">Edit</button>
          
        </form>
        </div>
        </div>`
}

document.addEventListener("click",(e)=>{
        if(e.target.classList.contains("edit-button")){
                let idx = e.target.dataset.id;
                let editInput = document.querySelector(".edit-input");
                let editPurpose = document.querySelector(".edit-purpose");
                task[idx].input = editInput.value;
                task[idx].purpose = editPurpose.value;
                localStorage.setItem("task",JSON.stringify(task));
                ui();
                updateDashboard();
        }
})



