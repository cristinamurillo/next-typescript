import React from "react";
import styles from "../styles/todo.module.css";


type Todo = {
  id: number,
  description: string,
  complete: boolean,
}

const todoDummyData = [
  {
    id: 1,
    description: "Wash the dishes",
    complete: false,
  },
  {
    id: 2,
    description: "Eat dinner",
    complete: true,
  }
]

export default function TodoList() {
  const [todos, setTodos] = React.useState<Todo[] | null>(null);

  React.useEffect(() => {
    setTodos(todoDummyData)
  }, [])

  if (todos === null) return (<h1>Loading</h1>)

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (todos === null) return
    const newTodos = todos.map((todo) => {
      if (todo.id.toString() !== event.target.id) return todo
      todo.complete = event.target.checked;
      return todo;
    })
    setTodos(newTodos)
    }

  return (
    <>
      <h1>Todos</h1>
      {todos.map((todo, idx) => <TodoItem key={idx} todoItem={todo} onChange={onChange}/>)}
    </>
  )
}

type TodoItemProps = {
  todoItem: Todo,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function TodoItem ({todoItem, onChange}: TodoItemProps) {
  const {id, description, complete} = todoItem;
  return (
    <div  className={styles['todo-container']}>
      <input id={id.toString()} type="checkbox" checked={complete} onChange={onChange}/>
      <label htmlFor={id.toString()}>{description}</label>
    </div>
  )
}
