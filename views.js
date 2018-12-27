import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

//Render Todos to page
const renderTodos = () => {
    const todoEl = document.querySelector('#todos')
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        const hideCompletedMatch = !hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    }) 
   
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
   
    todoEl.innerHTML = ' '
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const zero = document.createElement('p')
        zero.textContent = 'There are no to-dos to show'
        zero.classList.add("empty-message")
        todoEl.appendChild(zero)
    }
}

// Get the DOM element for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')
    const filters = getFilters()
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    todoText.textContent  = `${todo.text}`
    containerEl.appendChild(todoText)
  
    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeButton.textContent = 'remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}



//Get DOM element for summary statement
const generateSummaryDOM = (incompleteTodos) => {
    let plural = incompleteTodos.length === 1 ? '' : 's'
    const statement = document.createElement('h2')
    statement.classList.add('list-title')
    statement.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return statement
}

export { renderTodos, generateTodoDOM, generateSummaryDOM } 
