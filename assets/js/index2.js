


const initialTasks = [
  { id: 431, description: 'Comprar vitaminas', completed: false },
  { id: 124, description: 'Ordenar oficina', completed: true },
  { id: 541, description: 'Lavar el auto', completed: false },
];

const todoList = document.getElementById('listado-tareas');
const newTodoInput = document.getElementById('input-tarea');
const addTodoButton = document.getElementById('agregar-tarea');
const totalTasksSpan = document.getElementById('counter-tareas');
const completedTasksSpan = document.getElementById('counter-realizadas');

let tasks = initialTasks;

function renderTasks() {
  todoList.innerHTML = '';
  let total = 0;
  let completed = 0;
  tasks.forEach((task, index) => {
      const tr = document.createElement('tr');
      const idCell = document.createElement('th');
      idCell.textContent = task.id;
      const descriptionCell = document.createElement('td');
      descriptionCell.textContent = task.description;
      const checkboxCell = document.createElement('td');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
          task.completed = checkbox.checked;
          updateCounter();
      });
      checkboxCell.appendChild(checkbox);
      const deleteButtonCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
          tasks = tasks.filter((t, i) => i !== index);
          renderTasks();
          updateCounter();
      });
      deleteButtonCell.appendChild(deleteButton);
      
      tr.appendChild(idCell);
      tr.appendChild(descriptionCell);
      tr.appendChild(checkboxCell);
      tr.appendChild(deleteButtonCell);
      
      todoList.appendChild(tr);

      if (task.completed) completed++;
      total++;
  });
  totalTasksSpan.textContent = total;
  completedTasksSpan.textContent = completed;
}

function updateCounter() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  totalTasksSpan.textContent = total;
  completedTasksSpan.textContent = completed;
}

addTodoButton.addEventListener('click', () => {
  if (newTodoInput.value.trim()) {
      const newTask = {
          id: Date.now(),
          description: newTodoInput.value.trim(),
          completed: false,
      };
      tasks.push(newTask);
      newTodoInput.value = '';
      renderTasks();
      updateCounter();
  }
});

renderTasks();
