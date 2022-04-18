import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';


function App() {
  //window.scrollTo(999999999999, document.body.scrollHeight);
  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();

  window.onload = function () {
    var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    window.scrollTo(0, scrollLimit);
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
    var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    window.scrollTo(0, scrollLimit + 10000);
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
