import { useEffect, useRef, useState, createRef } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';

function App() {
  //window.scrollTo(999999999999, document.body.scrollHeight);
  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();

  // Side Effects / Lifecycle
  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
    window.scrollTo(10, 10)
    console.log("Page loaded")
  }, []);

  // Events
  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
    document.getElementsByName("todo-input")[0].value = "";
    // setTodos([]);
    // localStorage.setItem('todos', JSON.stringify([]));
  }

  return (
    <div>
      <ul>
        {todos.map(todo => (<li key={todo}>{todo}</li>))}  
      </ul>

      <form onSubmit={addTodo}>
        <input type="text" placeholder="What to add?" name="todo-input" ref={todoText} />
        <input type="submit" value="Submit" />
      </form>
    
    <Helmet>
      
    </Helmet>
    </div>
  );
}

export default App;
