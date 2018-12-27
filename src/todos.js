import uuidv4 from 'uuid/v4'

let todos = []

//Fetch existing Todos
const loadTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try {
        todos = todosJSON ? JSON.parse(todosJSON) : []
    } catch (e) {
        todos = []
    }
}
 
//Save todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

//expose todos from module
const getTodos = () => todos

//create todos in DOM
const createTodo = (text) => {
    const id = uuidv4()
    todos.push({
        id: uuidv4(),
        text,
        completed: false
    })
    saveTodos()
}

//remove a Todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
  if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
}

//toggle todos
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed 
    }
    saveTodos()
}

loadTodos()

export { getTodos, createTodo, removeTodo, toggleTodo, loadTodos }
