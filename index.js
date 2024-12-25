document.addEventListener('DOMContentLoaded', () => {
    var inputTask = document.getElementById('task-input');
    var addBtn = document.getElementById('addbtn');
    var listItems = document.getElementById('list-items');

    var tasks = JSON.parse(localStorage.getItem('task')) || []

    tasks.forEach(elem => renderTasks(elem));

    addBtn.addEventListener('click', () => {
        var taskVal = inputTask.value.trim();
        if (taskVal == "") return;
        const newTasks = {
            id: Date.now(),
            text: taskVal,
            completed: false
        }
        tasks.push(newTasks)
        saveTasks();
        renderTasks(newTasks)
        inputTask.value = "";
    })

    function renderTasks(t) {
        var li = document.createElement('li')
        li.setAttribute('data-id', t.id);
        if (t.completed) li.classList.add('completed')
        li.innerHTML = `
        <span>${t.text}</span>
        <button>Del</button>
        `
        listItems.appendChild(li)
        li.addEventListener('click', (e) => {
            if (e.target.tagName == 'BUTTON') return;
            t.completed = !t.completed
            li.classList.toggle('completed')
            saveTasks()
        })
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(tas => tas.id != t.id)
            li.remove()
            saveTasks()
        })
    }

    function saveTasks() {
        localStorage.setItem('task', JSON.stringify(tasks))
    }
})