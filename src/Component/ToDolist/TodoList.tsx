import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Input from '../Input'
import List from '../List'
import './toDoList.scss'
import toDoObject from '../../Types/toDoObject.types'

export default function TodoList() {
  const [listToDo, setListToDo] = useState<toDoObject[]>([])
  const [editToDo, setEditToDo] = useState<toDoObject | null>(null)

  useEffect(() => {
    let listToDo: string | null | toDoObject[] = localStorage.getItem('toDoList')
    if (listToDo) {
      listToDo = JSON.parse(listToDo) as toDoObject[]
      setListToDo([...listToDo])
    }
  }, [])

  const SynsDataToLocal = (toDoList: toDoObject[]) => {
    setListToDo([...toDoList])
    const stringifyData = JSON.stringify(toDoList)
    localStorage.setItem('toDoList', stringifyData)
  }

  const addToDo = (taskName: string) => {
    const toDoObject: toDoObject = {
      id: uuidv4(),
      taskName,
      isDone: false,
    }

    let listToDoClone = listToDo
    listToDoClone = [...listToDoClone, toDoObject]

    SynsDataToLocal(listToDoClone)
    // setListToDo([...listToDoClone])
    // const stringifyData = JSON.stringify(listToDoClone)
    // localStorage.setItem('toDoList', stringifyData)
  }

  const toggleCheckToDo = (id: string) => {
    const listToDoClone = listToDo

    listToDoClone.forEach((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone
      }
    })

    SynsDataToLocal(listToDoClone)
  }

  const deleteToDo = (id: string) => {
    const listToDoClone = listToDo.filter((item: toDoObject) => item.id !== id)

    SynsDataToLocal(listToDoClone)
  }

  const startEditTodo = (id: string) => {
    const findedToDo = listToDo.find((item) => item.id === id)
    setEditToDo(findedToDo as toDoObject)
  }

  const edittingToDo = (value: string) => {
    const editToDoClone = editToDo

    if (editToDoClone) {
      editToDoClone.taskName = value
      setEditToDo(editToDoClone)
    }
  }

  const saveEditToDo = () => {
    const listToDoClone = listToDo

    listToDoClone.forEach((item) => {
      if (item.id === editToDo?.id) {
        item = editToDo
      }
    })

    SynsDataToLocal(listToDoClone)

    setEditToDo(null)
  }
  
  const notDoneTaskList = listToDo.filter((item: toDoObject) => item.isDone === false)
  const doneTaskList = listToDo.filter((item: toDoObject) => item.isDone === true)

  return (
    <div className="doToContainer">
      <Input
        saveEditToDo={saveEditToDo}
        edittingToDo={edittingToDo}
        editToDo={editToDo}
        addToDo={addToDo}
      />
      <List
        startEditTodo={startEditTodo}
        deleteToDo={deleteToDo}
        toggleCheckToDo={toggleCheckToDo}
        list={notDoneTaskList}
        isDone={false}
      />
      <List
        startEditTodo={startEditTodo}
        deleteToDo={deleteToDo}
        toggleCheckToDo={toggleCheckToDo}
        list={doneTaskList}
        isDone={true}
      />
    </div>
  )
}
