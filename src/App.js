import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import './App.css';


function App() {
  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();

  window.onload = function () {
    console.log("Page loaded")
    var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
      document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    window.scrollTo(0, scrollLimit);
  };

  // Side Effects / Lifecycle
  useEffect(() => {
    const existingTodos = localStorage.getItem('todos');
    setTodos(existingTodos ? JSON.parse(existingTodos) : []);
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
    setTimeout(function(){window.scrollTo(0, scrollLimit)}, 10);
    // setTodos([]);
    // localStorage.setItem('todos', JSON.stringify([]));
  }

  const my_css = `
      #clear-button {
        top:0;
        right:0;
        position:fixed;
        background-color:#26266e;
        /* background-color:#ef3520; */
        color: #fff;
        border:none; 
        border-radius:10px; 
        padding:0px;
        min-height:3rem; 
        min-width:3rem;
        font-size:2rem;
        margin:0.3rem;
        box-shadow: 0px 0px 2px 2px rgb(0,0,0);
      }
    }
  `

  return (
    <div>
      <style>{my_css}</style>
      <button type="button" id="clear-button">🆑</button>
      <ul>
        {todos.map(todo => (<li key={todo}>{todo}</li>))}  
      </ul>

      <form onSubmit={addTodo}>
        <input type="text" placeholder="What to add?" name="todo-input" ref={todoText} />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
