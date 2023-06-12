class TaskManager {
    constructor() {
      this.tasks = [];
      this.timesP = 0;
      this.timesN = 0;
    }
  
    addTask(input, priority) {
      const task = {
        todo: input,
        rate: priority,
        editable: false,
      };
  
      if (!this.isValidTask(task)) {
        alert("Please enter correct data!");
        return;
      }
  
      this.tasks.push(task);
      this.renderTable();
      task.todo = ""
      task.rate = ""
    }
  
    isValidTask(task) {
      if (!task.rate || !task.todo.trim()) {
        return false;
      }
      return true;
    }
    
      
  
    renderTable() {
      let tbody = "";
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
        const rate = this.getTaskPriorityText(task.rate);
        const row = this.getTableRow(i, task, rate);
        tbody += row;
      }
      document.getElementById("list").innerHTML = tbody;
      
    }
  
    getTableRow(i, task, rate) {
      const todoId = `id_${i}`;
      const todoLineId = `todoLine_${i}`;
      const rateId = `TaskRate_${i}`;
  
      const todo = task.editable
        ? `<input type="text" class="form-control" id="editedTodo_${i}" value="${task.todo}" />`
        : task.todo.trim();
  
      const prioritySelect = task.editable
        ? `<select type="text" class="form-select" id="editedRate_${i}" value="${task.rate}">
            <option disabled value="">Open the priority</option>
            <option value= '1' ${task.rate == 1 ? "selected" : ""}>Low - 1</option>
            <option value= '2' ${task.rate == 2 ? "selected" : ""}>Medium - 2</option>
            <option value= '3' ${task.rate == 3 ? "selected" : ""}>High - 3</option>
          </select>`
        : rate;
  
      const actionButtons = task.editable
        ? `<button class="btn btn-success" id="save_${i}" onclick="taskManager.save(${i})">Save</button>
           <button class="btn btn-secondary ms-2" id="cancel${i}" onclick="taskManager.cancel(${i})">Cancel</button>`
        : `<button class="btn btn-danger" id="delete_${i}" onclick="taskManager.deleteTask(${i})">Delete</button>
           <button class="btn btn-warning ms-2" id="edit_${i}" onclick="taskManager.editTask(${i})">Edit</button>`;
  
      return `<tr>
        <td id="${todoId}">${i + 1}</td>
        <td id="${todoLineId}">${todo}</td>
        <td id="${rateId}">${prioritySelect}</td>
        <td class="d-flex justify-content-center">${actionButtons}</td>
      </tr>`;
    }
  
    getTaskPriorityText(priority) {
      if (priority == 1) {
        return "Low";
      } else if (priority == 2) {
        return "Medium";
      } else {
        return "High";
      }
    }
  
    deleteTask(index) {
      if (!confirm(`Are you sure you want to cancel task number ${index + 1}?`)) {
        return;
      }
      this.tasks.splice(index, 1);
      this.renderTable();
    }
  
    findMinPriorityTask() {
      if (this.tasks.length === 0) return null;
      let min = this.tasks[0].rate;
      let minIndex = 0;
      for (let i = 1; i < this.tasks.length; i++) {
        if (this.tasks[i].rate < min) {
          min = this.tasks[i].rate;
          minIndex = i;
        }
      }
      return this.tasks[minIndex];
    }
  
    editTask(index) {
      this.tasks[index].editable = true;
      this.renderTable();
    }
  
    cancel(index) {
      this.tasks[index].editable = false;
      this.renderTable();
    }
  
    save(index) {
      const editedTodo = document.getElementById(`editedTodo_${index}`);
      const editedRate = document.getElementById(`editedRate_${index}`);
      if (editedRate.value > 3 || editedRate.value < 1) {
        alert("Please enter a valid priority between 1 to 3.");
        return;
      }
      this.tasks[index].todo = editedTodo.value;
      this.tasks[index].rate = editedRate.value;
      this.tasks[index].editable = false;
      this.renderTable();
    }
  
    // changePrioritySort() {
    //   if (this.timesP === 0) {
    //     this.tasks.sort((a, b) => a.rate - b.rate);
    //     this.timesP++;
    //   } else if (this.timesP === 1) {
    //     this.tasks.sort((a, b) => b.rate - a.rate);
    //     this.timesP++;
    //   } else if (this.timesP === 2) {
    //     this.tasks.sort((a, b) => a.index - b.index);
    //     this.timesP = 0;
    //   }
    
    //   this.renderTable();
    // }
    
    // changeNameSort() {
    //   if (this.timesN === 0) {
    //     this.tasks.sort((a, b) => a.todo.localeCompare(b.todo));
    //     this.timesN++;
    //   } else if (this.timesN === 1) {
    //     this.tasks.sort((a, b) => b.todo.localeCompare(a.todo));
    //     this.timesN++;
    //   } else if (this.timesN === 2) {
    //     this.tasks.sort((a, b) => a.index - b.index);
    //     this.timesN = 0;
    //   }
    
    //   this.renderTable();
    // }
    
  }
  
  const taskManager = new TaskManager();

function addTask(input, priority){
  taskManager.addTask(input, priority);
}
function changeName() {
  taskManager.changeNameSort();
}

function changeRate() {
  taskManager.changePrioritySort();
}