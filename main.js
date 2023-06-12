let tasks =[];
const addTask = function(){
    let input = document.getElementById('input');
    let priority = document.getElementById('priority');
    let task = {todo:input.value, rate:priority.value}

    
    const isValid = validation(task);
    if(!isValid){
        alert("Please Enter a Correct data!")
        return;
    }
    addTasksTList(task)
    renderTheTable(tasks);
input.value=""
priority.value=""
} 
const validation = function(task){
    if(!task.todo.trim()) return false;
    if(!task.rate) return false;
    return true;
}
const renderTheTable = function(tasks){
    let tbody = "";
    for(let i=0 ; i < tasks.length; i++){
        tbody += getTable(i, tasks[i]);
    }
    document.getElementById('list').innerHTML = tbody;
}
const getTable = function(i, task){
    let rate = ''
    if(task.rate == 1){
        rate = 'Low'
    }else if(task.rate == 2){
        rate = 'Medium'
    }else{
        rate = 'High'
    }
    let tr = getTheRow(i,task, rate)
    return tr;
}
const getTheRow = (i,task, rate)=>{
    return `<tr>
    <td id="id_${i}">${i+1}</td>
    <td id="todoLine_${i}">${task.editable? `<input type="text" class="form-control" id="editedTodo_${i}" value="${tasks[i].todo}" />`:task.todo.trim()}</td>
    <td id="TaskRate_${i}">${task.editable? `<select type="text" class="form-select" id="editedRate_${i}" value="${tasks[i].rate}">
            <option disabled value="">Open the priority</option>
            <option value= '1' ${task.rate == 1? "selected":""}>Low - 1</option>
            <option value= '2' ${task.rate == 2? "selected":""}>Medium - 2</option>
            <option value= '3' ${task.rate == 3? "selected":""}>High - 3</option>
        </select>`:rate}</td>
        <td class = "d-flex  justify-content-center">${task.editable? `<button class="btn btn-success" id="save_${i}"  onclick="save(${i})">Save</button>
        <button class="btn btn-secondary ms-2" id="cancel${i}"  onclick="cancel(${i})">Cancel</button>`

        :`<button class="btn btn-danger" id="delete_${i}" onclick="DeleteTodo(${i})">Delete</button>
        <button class="btn btn-warning ms-2" id="edit_${i}" onclick="EditTodo(${i})">Edit</button>`}
        </td>
    </tr>`
}
const addTasksTList = function(task){
    tasks.push(task);
    console.log(tasks);
}
const DeleteTodo = function(i){
    if(!confirm(`Are You Sure you want to cancel task num ${i+1}`)) return;
    tasks.splice(i,1);
    renderTheTable(tasks)
}
const find = function(){
    // debugger
    if(tasks.length == 0)return null;
    let min = tasks[0].priority
    minI = 0
    for(let i =1 ; i < tasks.length; i++){
        if(min >tasks[i],priority){
            min =tasks[i].priority;
            minI = i
        }
    }
    console.log(tasks[minI]);
}
const EditTodo = (i)=>{
tasks[i].editable = true;
renderTheTable(tasks)
}
const cancel = (i)=>{
    tasks[i].editable = false;
    renderTheTable(tasks)
}
const save = (i)=>{
    let editedTodo = document.getElementById(`editedTodo_${i}`);  
    let editedRate = document.getElementById(`editedRate_${i}`);
    if(editedRate.value > 3 || editedRate.value < 0){
        return alert('Please Enter a valid priority between 1 to 3')
    }
    tasks[i].todo = editedTodo.value;
    tasks[i].rate = editedRate.value;
    tasks[i].editable = false
    renderTheTable(tasks)
}
let timesP = 0
const changeRate = ()=>{
    if(timesP == 0){
        let sorted = [...tasks];
        sorted.sort(function(a,b){
            return b.rate - a.rate
        })
        console.log("clicked on priorty");
        renderTheTable(sorted)
        timesP++
    }else if(timesP == 1){
            let sorted2 = [...tasks]
            sorted2.sort(function(a,b){
                return a.rate - b.rate
            })
            console.log("clicked on priorty2");
            renderTheTable(sorted2)
            timesP++
        }else if(timesP == 2){
            renderTheTable(tasks)
            timesP = 0;
        }
    }
let timesN = 0;
const changeName = ()=>{
    debugger
    if(timesN == 0){
        timesN++
        let sorted = [...tasks];
        sorted.sort(function(a,b){
            if (a.todo < b.todo) return -1
            if (a.todo > b.todo) return 1
            return 0
        })
        renderTheTable(sorted)
    }else if(timesN == 1){
        timesN++
        let sorted1 = [...tasks];
        sorted1.sort(function(a,b){
            if (a.todo < b.todo) return 1
            if (a.todo > b.todo) return -1
            return 0
        })
        renderTheTable(sorted1)
    }else if(timesN == 2){
        renderTheTable(tasks)
        timesN = 0;
    }
    console.log("Change name");
}