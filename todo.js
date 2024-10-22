const form = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo');
const todoList = document.querySelector('.list-group');
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

EventListeners();

function EventListeners(){  
        form.addEventListener("submit", addTodo);
        document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
        secondCardBody.addEventListener("click",deleteTodo);
        filter.addEventListener("keyup",filterTodos);
        clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
        if(confirm("Tüm Todoları silmek istediğinizden emin misiniz?")){
            while(todoList.firstElementChild != null){
                todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
        }
}

function filterTodos(e){
        const filterValue = e.target.value.toLowerCase();
        const listItems =   document.querySelectorAll(".list-group-item");
        listItems.forEach(function(listItem){
            const text = listItem.textContent.toLowerCase();
            if(text.indexOf(filterValue) === -1){
                listItem.setAttribute("style", "display: none !important");// burada !important kesinlikle display:none kullan d-flex özelliğindeki dispal:block 'u kullanma demektir burası için.
            }
            else{
                listItem.setAttribute("style", "display: block");
            }
        })
}

function deleteTodo(e){
        if(e.target.className === "fa fa-remove"){
            e.target.parentElement.parentElement.remove();
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
            showAlert("success","Todo başarıyla silindi");
        }
}

function deleteTodoFromStorage(deletetodo){
        let todos = getTodosFromStorage();
        todos.forEach(function(todo,index){
            if(todo === deletetodo){
                todos.splice(index, 1);
            }
        });
        localStorage.setItem("todos",JSON.stringify(todos));
}

function loadAllTodosToUI(){
        let todos = getTodosFromStorage();

        todos.forEach(function(todo){
            addTodoToUI(todo);
        })
}

function addTodo(e){
        const newTodo = todoInput.value.trim();
        if(newTodo === ""){
            showAlert("danger","Bir todo girin!");
        }
        else{
            addTodoToUI(newTodo);
            addTodoToStorage(newTodo);
            showAlert("success","Todo başarıyla eklendi.");
        }


        e.preventDefault();
}

function getTodosFromStorage(){ // Storageden todoları alma
        let todos;

        if(localStorage.getItem("todos") === null){
            todos = [];
        }
        else{
            todos = JSON.parse(localStorage.getItem("todos")); // eğer todos keyi varsa local storagede o zaman bunu arraye dönüştürerek almamız gerekir çünkü localde string tipindedir.
            
        }
        return todos;
}

function addTodoToStorage(newTodo) {
        let todos = getTodosFromStorage(); 
        todos.push(newTodo);// newtodo'yu bu todos'a eklememiz gerekir. 
        localStorage.setItem("todos",JSON.stringify(todos));//Aldığımız todosu tekrar locale string şeklinde göndererek locali güncelleyelim.
}

function showAlert(type,message){
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;

        firstCardBody.appendChild(alert);

        setTimeout(function() {
            alert.remove();  
        },1000);

}

    function addTodoToUI(newTodo){
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'delete-item';
        link.innerHTML = "<i class = 'fa fa-remove'></i>";

        listItem.className = 'list-group-item d-flex justify-content-between';
        listItem.appendChild(document.createTextNode(newTodo));
        
        listItem.appendChild(link);

        todoList.appendChild(listItem);

        todoInput.value = "";
    }
