import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line
import { Helmet } from 'react-helmet';
import './App.css';
import { confirmAlert } from 'react-confirm-alert';
import ReactTooltip from 'react-tooltip';
import './more/react-confirm-alert.css';
import useQuestion from '@ginterdev/use-question';
import React from 'react';


function App() {

  const { ask,...question } = useQuestion<{ message: string }>();

  const handleClick = React.useCallback(async () => {
    if (await ask({ message: 'Are you sure you want to do this?' })) {
      console.log('CONFIRMED ✅');
    } else {
      console.log('CANCELLED ❌');
    }
  }, [ask]);


  // State
  const [todos, setTodos] = useState([]);

  // Binding
  const todoText = useRef();


  window.onload = function () {
    console.log("Page loaded")
    // var scrollLimit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
    //   document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
    // window.scrollTo(0, scrollLimit);
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
    setTimeout(function(){window.scrollTo(0, scrollLimit)}, 1);
    // setTodos([]);
    // localStorage.setItem('todos', JSON.stringify([]));
  }

  function clear_button_actions() {
    confirmAlert({
      title: 'Confirmation',
      message: 'Are you sure to clear the list?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => setTodos([])
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  };

  const my_css = `
      #clear-button {
        top:0;
        right:0;
        position:fixed;
        background-color:#a8c0e2;
        /* background-color:#ef3520; */
        color: #fff;
        border:none; 
        border-radius:10px; 
        padding:0px;
        min-height:3rem; 
        min-width:3rem;
        font-size:2rem;
        margin:0.3rem;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px;
      }
      #clear-button:hover {
        background-color:#6888b3;
        transition: 0.3s;
      }
      #clear-button:not(:hover) {
        background-color:#a8c0e2;
        transition: 0.3s;
      }
      #clear-button:active {
        background-color:#526887;
        transition: 0.3s;
      }
      .__react_component_tooltip {
      transition: all 0.3s ease-in-out !important;
      opacity: 0 !important;
      visibility: visible;
      }
      
      .__react_component_tooltip.show {
      visibility: visible;
      opacity: 1 !important;
      }

      .clear-button-data-class {
        font-weight: bold !important;
        padding:0.3rem;
      }      
  
    }
  `

  return (
    <div>
      <ReactTooltip />
      <style>{my_css}</style>
      <button type="button" id="clear-button" data-effect="solid" data-background-color="#d46518" data-type="info" data-tip="CLEAR THE LIST" data-class="clear-button-data-class" onClick={clear_button_actions}>🆑</button>
      <ul>
        {todos.map(todo => (<li key={todo}>{todo}</li>))}  
      </ul>

      <form onSubmit={addTodo}>
        <input type="text" placeholder="What to add?" name="todo-input" ref={todoText} />
        <input type="submit" value="Submit" />
      </form>
      <button onClick={() => handleClick()}>Ask question</button>
      {question.isActive(question) && (
        <div>
          {question.data.message}
          <hr />
          <button onClick={() => question.onReject()}>CANCEL</button>
          <button onClick={() => question.onConfirm()}>CONFIRM</button>
        </div>
      )}
    </div>
  );
}

export default App;
