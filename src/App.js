import './App.css'
import react from 'react'
import { useState, useEffect } from 'react';
function App() {
  const baseUrl = 'http://localhost:5000'
  const [todos, setTodos] = useState([])
  const [complete, setComplete] = useState()
  const [popupActive, setPopupActive] = useState()
  const [newTodo, setNewTodo] = useState('')
  useEffect(() => {
    getTodos()


  }, [])


  const getTodos = async () => {
    const res = await fetch(baseUrl + '/todos')
    let data = await res.json()

    setTodos(data)



  }
  const completeTodo = async (id) => {
    console.log(id)
    const res = await fetch(baseUrl + '/todo/complete/' + id)
    const data = await res.json()

    setTodos(todos.filter((e) => {
      if (data._id === e._id) {
        e.complete = data.complete
      }
      return e
    }))
  }

  const deleteTodo = async (id) => {
    console.log(id)
    const data = await fetch(baseUrl + '/todo/delete/' + id, { method: 'DELETE' }).then((res) => res.json())
    console.log(data)
    getTodos()
    //  setTodos(todos=>todos.filter((obj)=>obj._id!==data._id))
  }

   const addTodo= async ()=>{
      let data=await fetch(baseUrl+'/todo/new',{
        method:'POST',
        headers:{
         "Content-Type":"application/json"
        },
        body:JSON.stringify({
          text:newTodo
        })
        
      }).then((res)=>res.json())
      setTodos([...todos,data])
      setPopupActive(false)
      setNewTodo('')

   
   }


  return (
    <div className="App">
      <h1>Welcome ,Adarsh </h1>
      <h4>Your Tasks</h4>
      <div className="todos">
        {
          todos.map((obj) => {

            return (

              <div className={'todo ' + (obj.complete ? 'is-complete' : "")}
                key={obj._id} >

                <div className="checkbox"></div>
                <div className='text' onClick={() => completeTodo(obj._id)}>{obj.text}</div>

                <div className='delete-todo' onClick={() => deleteTodo(obj._id)}>x</div>
              </div>)
          }
          )
        }

      </div>

      <div className='addpopup' onClick={() => setPopupActive(true)}>+</div>

      {popupActive ? (
        <div className='popup'>
          <div className='closepopup' onClick={() => setPopupActive(false)}>+</div>
          <div className='content'>
            <h3>Add Task</h3>
             <input type='text' className='add-todo-input' onChange={(e) => setNewTodo(e.target.value)} value={newTodo} />
            <button className='button' onClick={addTodo}>Add Task</button>
          </div>
        </div>
      ) : ""}


    </div>
  );
}

export default App;
