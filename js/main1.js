// start global
let tasksList = [];
let checkList = [];
let showAllTasks = document.getElementsByClassName("tasks")[0];
let allUserTasks = JSON.parse(localStorage.getItem("allUserTasks"));
let checkedTasks = JSON.parse(localStorage.getItem("checkedTasks"));
if(allUserTasks){
    for(let o = 0; o < allUserTasks.length; o++){
        tasksList.push(allUserTasks[o]);
    };
};
if(checkedTasks){
    for(let o = 0; o < checkedTasks.length; o++){
        checkList.push(checkedTasks[o]);
    };
};
for(let i = 0; i < checkList.length; i++){
    for(let k = 0; k < tasksList.length; k++){
        if(checkList[i] == tasksList[k].id){
            tasksList[k].checked = true;
        }
    };
};
// end global

// start signup
let firstInformation = document.getElementsByClassName("firstInformation")[0];
let errorSubmit = document.getElementsByClassName("error")[0];
let mainContent = document.getElementsByClassName("mainContent")[0];
let submit = document.getElementById("submit");
let name = document.getElementById("name");
let gender = document.getElementById("gender");
let info = {};
submit.onclick = function(){
    if(name.value != ""){
        info.fullName = name.value;
        info.type = gender.value;
        localStorage.setItem("userInformation" , JSON.stringify(info));
        firstInformation.style.display = "none";
        mainContent.style.display = "flex";
    }else{
        errorSubmit.style.display = "block";
        return false;
    }
};
// end signup

// start logout
let resetInfo = document.getElementsByClassName("resetInfo")[0];
resetInfo.onclick = function(){
    mainContent.style.display = "none";
    firstInformation.style.display = "flex";
    location.reload();
    localStorage.clear();
};
// end logout

// start add task
let inputTask = document.getElementById("inputTask");
let add = document.getElementsByClassName("add")[0];
let error2 = document.getElementsByClassName("error2")[0];
function addNewTask(){
    const taskInformation = {
        "id": "",
        "text":"",
        "checked":false,
    };
    if(inputTask.value != ""){
        taskInformation.text = inputTask.value;
        taskInformation.id = (new Date).toString().split(" ").slice(0,5).join(" ");
        tasksList.push(taskInformation);
        localStorage.setItem("allUserTasks" , JSON.stringify(tasksList));
        viewAllTasks(taskInformation.id,inputTask.value);
        inputTask.value = "";
        error2.style.display = "none";
        changeStateOfCheckIcon();
        progressBarPrecent();
    }else{
        error2.style.display = "block";
        window.scrollTo(0,0);
    }
};
inputTask.addEventListener("keypress" , function(e){
    if (e.key == "Enter"){
        addNewTask();
    }
})
add.onclick = function(){
    addNewTask();
}
// end add task

// start show all tasks
function viewAllTasks(ident,textValue){
    showAllTasks.innerHTML += `
    <div class="task">
        <form class="firstTask">
            <div class="taskItem">
                <input type="checkbox" class="check">
                <h6 id="${ident}">${textValue}</h6>
            </div>
            <button type="button" onclick="deleteTask()"><i class="deleteButton fa-solid fa-trash-can"></i></button>
        </form>
        <div id="hr"><hr></div>
    </div>
    `;
};
// end show all tasks


// start task checked

document.addEventListener("click" , function(e){
    if(e.target.classList == "check"){
        for(let i = 0; i < tasksList.length; i++){
            if(e.target.checked){
                if(e.target.nextElementSibling.id == tasksList[i]["id"]){
                    tasksList[i]["checked"] = true;
                    if(checkList.indexOf(e.target.nextElementSibling.id) == -1){
                        checkList.push(e.target.nextElementSibling.id);
                    };
                };
            }else{
                if(e.target.nextElementSibling.id == tasksList[i]["id"]){
                    tasksList[i]["checked"] = false;
                    if(checkList.indexOf(e.target.nextElementSibling.id) > -1){
                        checkList.splice(checkList.indexOf(e.target.nextElementSibling.id) , 1);
                    };
                };
            };
        };
        localStorage.setItem("checkedTasks" , JSON.stringify(checkList));
        changeStateOfCheckIcon();
        progressBarPrecent();
    };
});

function changeStateOfCheckIcon(){
    if(document.getElementsByClassName("check")){
        let iconTasks = document.getElementsByClassName("check");
        for(let i = 0; i < iconTasks.length; i++){
            for(let j = 0; j < checkList.length; j++){
                if(iconTasks[i].nextElementSibling.id == checkList[j]){
                    iconTasks[i].checked = true;
                }
            };
            if(iconTasks[i].checked){
                iconTasks[i].nextElementSibling.classList.add("checked1");
                iconTasks[i].parentElement.parentNode.classList.add("checked2")
            }else{
                iconTasks[i].nextElementSibling.classList.remove("checked1");
                iconTasks[i].parentElement.parentNode.classList.remove("checked2")
            }
        }
    }
};
// end task checked

// start delete task
function deleteTask(){
    if(event.target.classList.contains("deleteButton")){
        let idOfTaskDel = event.target.parentNode.previousElementSibling.children[1].id;
        for(let i = 0; i < tasksList.length; i++){
            if(idOfTaskDel == tasksList[i].id){
                tasksList.splice(tasksList.indexOf(tasksList[i]) , 1);
                localStorage.setItem("allUserTasks" , JSON.stringify(tasksList));
            };
        };
        for(let p = 0; p < checkList.length; p++){
            if(idOfTaskDel == checkList[p]){
                checkList.splice(checkList.indexOf(checkList[p]) , 1);
                localStorage.setItem("checkedTasks" , JSON.stringify(checkList));
            };
        };
        event.target.parentNode.parentNode.parentNode.style.display = "none";
        progressBarPrecent();
    };
}
// end delete task

// start progressbar
let progress = document.getElementsByClassName("progress")[0];
function progressBarPrecent(){
    if(tasksList.length != 0){
        let Precent = (checkList.length / tasksList.length) * 100;
        progress.innerHTML = `${String(Precent).slice(0,4)}` + "%";
        let wid = ((checkList.length / tasksList.length) * 65) + (15);
        progress.style.width = `${String(wid)}` + "%";
    }else{
        progress.innerHTML = "0%";
        progress.style.width = "15%";
    }
};
// end progressbar

// start reload
let photo = document.getElementById("photo");
let lacab = document.getElementById("lacab");
let userName = document.getElementById("userName");
let date = document.getElementById("date").innerText = (new Date).toString().split(" ").slice(0,4).join(" ");
let time = document.getElementById("time").innerText = (new Date).toString().split(" ").slice(4,5).join(" ");
let getInformation = JSON.parse(localStorage.getItem("userInformation"));
window.onload = function(){
    if(getInformation){
        mainContent.style.display = "flex";
        if(getInformation.type == "male"){
            photo.src = "images/male2.jpg";
            lacab.innerText = "Mr. ";
        }else{
            photo.src = "images/female2.png";
            lacab.innerText = "Mrs. ";
        };
        userName.innerText = (lacab.innerText).toString() + " " + (getInformation.fullName).toString();
        for(let i = 0; i < tasksList.length; i++){
            viewAllTasks(tasksList[i].id,tasksList[i].text);
        };
        changeStateOfCheckIcon();
        progressBarPrecent();
    }else{
        firstInformation.style.display = "flex";
    };
};
// end reload