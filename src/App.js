import { useEffect, useRef, useState, createRef } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';

function App() {
  //window.scrollTo(999999999999, document.body.scrollHeight);
  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();

  window.onload = function () {
    window.scrollTo(0, 99999999999999999);
  };

  // Side Effects / Lifecycle
  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
    console.log("Page loaded")
  }, []);

  // Events
  function addTodo(event) {
    event.preventDefault();
    const next = [...todos, todoText.current.value];
    setTodos(next);
    localStorage.setItem('todos', JSON.stringify(next));
    document.getElementsByName("todo-input")[0].value = "";
    window.scrollTo(0, 99999999999999999);
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
