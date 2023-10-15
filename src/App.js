import React, { useState, useEffect } from 'react';
import {DeleteOutline, Check} from '@mui/icons-material';
import './App.css';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos]= useState([]);
  const[newTitle, setNewTitle] = useState("");
  const[newDescription, setNewDescription] = useState("");
  const[completedTodo, setCompletedTodo] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    }
    let updateTodoArr = [...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem("todolist",JSON.stringify(updateTodoArr));
  }
  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem("todolist")); 
    let CompleteTodo = JSON.parse(localStorage.getItem("completedtodolist")); 
    if(savedTodo)
    {
      setTodos(savedTodo);
    }
    if(CompleteTodo)
    {
      setCompletedTodo(CompleteTodo);
    }
  },[setTodos],[setCompletedTodo])
  const handleDeleteTodos = (index) =>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    setTodos(reducedTodo);
    localStorage.setItem("todolist",JSON.stringify(reducedTodo));
  }
  const handleDeleteCompletedTodos = (index) =>{
    let reducedTodo1 = [...completedTodo];
    reducedTodo1.splice(index,1);
    setCompletedTodo(reducedTodo1);
    localStorage.setItem("completedtodolist",JSON.stringify(reducedTodo1));
  }
  const handleComplete = (index)=> {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1; 
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m ;
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    }
    let updatedCompletedTodosArr = [...completedTodo];
    updatedCompletedTodosArr.push(filteredItem);
    setCompletedTodo(updatedCompletedTodosArr);
    handleDeleteTodos(index);
    localStorage.setItem("completedtodolist",JSON.stringify(updatedCompletedTodosArr));
  }
  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-items">
            <label>Title</label>
            <input 
              type="text" 
              val={newTitle} 
              onChange={(e)=>setNewTitle(e.target.value)}
              placeholder="What's your task" />
          </div>
          <div className="todo-input-items">
            <label>Description</label>
            <input 
              type="text" 
              val={newDescription} 
              onChange={(e)=>setNewDescription(e.target.value)} 
              placeholder="What's the description of your to do??" />
          </div>
          <div className="todo-input-items">
            <button 
              type="button" 
              onClick={handleAddTodo}
              className="primary-btn">
                add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button 
            className={`todo-btn ${isCompleteScreen === false && 'active'}`} 
            onClick={() => setIsCompleteScreen(false)}>
              Task
          </button>
          <button 
            className={`todo-btn ${isCompleteScreen === true && 'active'}`} 
            onClick={() => setIsCompleteScreen(true)}>
              Completed
          </button>
        </div>
        <div className="todo-list-area">
          {isCompleteScreen === false && (allTodos.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <DeleteOutline className="icon" onClick={()=>handleDeleteTodos(index)} title="Delete?" style={{fontSize: '20px'}} />
                  <Check className="check-icon" onClick={()=>handleComplete(index)} title="Check?" style={{fontSize: '20px'}}/>
                </div>
              </div>
            );
          }))}
          {isCompleteScreen === true && (completedTodo.map((item,index)=>{
            return(
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>
                <div>
                  <DeleteOutline className="icon" onClick={()=>handleDeleteCompletedTodos(index)} title="Delete?" style={{fontSize: '20px'}} />
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
}

export default App;
