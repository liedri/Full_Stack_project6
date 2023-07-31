import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";

import "../styles/todos.css";

export default function Todos() {
    const [offset, setOffset] = useState(0);
    const [todoList, setTodoList] = useState([]);
    const [activeFilter, setActiveFilter] = useState();
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    async function importTodos() {
        try {
            const user_id = JSON.parse(localStorage.getItem('user')).id;
            const fetchedData = await fetch(`http://localhost:3000/api/todos?userId=${user_id}`);
            const data = await fetchedData.json();
            setTodoList(data);
          } catch (error) {
            console.error('Error fetching todos:', error);
          }
        }

    useEffect(() => {
        importTodos();
    }, []);

    const sortTodos = () => {
        if (!Array.isArray(todoList)) {
            return [];
        }
    
        let sortedList = [...todoList];
        
        if (activeFilter === "pending") {
            sortedList = sortedList.filter((todo) => !todo.completed);
        } else if (activeFilter === "completed") {
            sortedList = sortedList.filter((todo) => todo.completed);
        }
    
        return sortedList;
    };

    async function handleKeyPress(event) {
        if (event.key === "Enter") {
            let response;
            try {
                const currentDate = new Date();
                const formattedDate = currentDate.toISOString().slice(0, 19).replace("T", " ");
                console.log('Input Value:', event.target.value);

                response = await fetch('http://localhost:3000/api/todos/post', {
                    method: 'POST',
                    body: JSON.stringify({
                        // "id": 1,
                        "userId": user_id,
                        "title": event.target.value,
                        "completed": false,
                        "isDeleted": false,
                        "createdAt": formattedDate,
                        "lastModified": formattedDate
                    }),
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
            } catch (error) {
                console.error("Error deleting task:", error);
            }
            if (response) {
                importTodos();
                event.target.value = ''
            }

            }
          
        }
      
    
    // const sortTodos = () => {
    //     let sortedList = [...todoList];

    //     // if (sorting === "uncompleted") {
    //     //     sortedList = sortedList.filter((todo) => !todo.completed);
    //     // } else if (sorting === "id") {
    //     //     sortedList.sort((a, b) => a.id - b.id);
    //     // } else if (sorting === "random") {
    //     //     sortedList.sort(() => Math.random() - 0.5);
    //     // }

    //     if (activeFilter === "pending") {
    //         sortedList = sortedList.filter((todo) => !todo.completed);
    //     } else if (activeFilter === "completed") {
    //         sortedList = sortedList.filter((todo) => todo.completed);
    //     }

    //     return sortedList;
    // };

    const handleTodoClick = async (id, isCompleted) => {
        let response;

        try {
            response = await fetch(`http://localhost:3000/api/todos/update/${id}`, {
            method: 'PUT',
            body: JSON.stringify({"isCompleted": isCompleted}),
            headers: {
                "Content-Type": "application/json",
              }
        });
        } catch (error) {
          console.error("Error deleting task:", error);
        }
        if (response) {
            importTodos();
        }
    };

    const handleFilterClick = (filter) => {
        setActiveFilter(filter);
    };

    const handleDeleteTodo = async (id) => {
        let response;
        try {
            response = await fetch(`http://localhost:3000/api/todos/delete/${id}`, {
            method: 'DELETE'});
        } catch (error) {
          console.error("Error deleting task:", error);
        }
        if (response) {
            importTodos();
        }
      };

    return (
        <div className="todo_list">
            <div className="task_input">
                <input type="text" placeholder="Add a New Task + Enter" onKeyDown={handleKeyPress}/>
            </div>
            <div className="filters">
                <span
                    className={activeFilter === "all" ? "active" : ""}
                    onClick={() => handleFilterClick("all")}
                >
                    All
                </span>
                <span
                    className={activeFilter === "pending" ? "active" : ""}
                    onClick={() => handleFilterClick("pending")}
                >
                    Pending
                </span>
                <span
                    className={activeFilter === "completed" ? "active" : ""}
                    onClick={() => handleFilterClick("completed")}
                >
                    Completed
                </span>
            </div>
            {sortTodos().map((todo, index) => (
  <div key={todo.id} className={`todo ${todo.completed ? 'completed' : ''}`}>
    <div className="todo-content">
      <div className="checkbox-wrapper">
        <input
          type="checkbox"
          className="checkbox"
          checked={todo.completed}
          onChange={() => handleTodoClick(todo.id, !todo.completed)}
        />
      </div>
      <span className="title">{todo.title}</span>
      <span className="delete_icon"
              onClick={() => handleDeleteTodo(todo.id)}>
                <MdDelete className="icon" />
        </span>
    </div>
    {index !== sortTodos().length - 1 && <hr className="separator_line" />} {/* Add line if not the last todo */}
  </div>
))}

  </div>
);
};