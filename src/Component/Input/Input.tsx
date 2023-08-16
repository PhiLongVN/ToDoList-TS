import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import './input.scss'
import toDoObject from '../../Types/toDoObject.types'

interface inputProps {
  addToDo: (taskName: string) => void
  edittingToDo: (value: string) => void
  saveEditToDo: () => void
  editToDo: toDoObject | null
}

export default function Input(props: inputProps) {
  const [input, setInput] = useState<string>('')
  const { editToDo, addToDo, edittingToDo, saveEditToDo } = props

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (editToDo) {
      edittingToDo(value)
    }

    setInput(value)
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (editToDo) {
      saveEditToDo()
    } else {
      addToDo(input)
    }
    setInput('')
  }
  return (
    <div className="taskInput mb-2">
      <h1 className="inputTitle">To Do List</h1>
      <form
        className="inputBox"
        onSubmit={handleSubmit}
      >
        <input
          value={editToDo ? editToDo.taskName : input}
          onChange={handleChange}
          type="text"
          placeholder="Enter Your Task"
        />

        <div className="wrapButton">
          <button type="submit">
            {editToDo ? '✔' : <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} />}
          </button>
        </div>
      </form>
    </div>
  )
}
