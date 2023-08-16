import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import toDoObject from '../../Types/toDoObject.types'
import './list.scss'

interface ListProps {
  isDone: boolean
  list: Array<toDoObject>
  toggleCheckToDo: (id: string) => void
  deleteToDo: (id: string) => void
  startEditTodo: (id: string) => void
}
export default function List(props: ListProps) {
  const { list, isDone, toggleCheckToDo, deleteToDo, startEditTodo } = props

  const handleCheck = (id: string) => {
    toggleCheckToDo(id)
  }

  const handleDelete = (id: string) => {
    deleteToDo(id)
  }

  const handleEdit = (id: string) => {
    startEditTodo(id)
  }
  return (
    <div className="taskList mb-2">
      <h2 className="listTitle">{isDone ? 'Hoàn Thành' : ' Chưa Hoàn Thành'}</h2>

      {list.map((item: toDoObject) => (
        <div
          className="listBox"
          key={item.id}
        >
          <input
            onChange={() => handleCheck(item.id)}
            type="checkbox"
            checked={item.isDone}
          />
          <span
            onClick={() => handleEdit(item.id)}
            className={`taskName ${isDone ? 'done' : ''}`}
          >
            {item.taskName}
          </span>
          <div className="actionButton">
            <button
              onClick={() => handleEdit(item.id)}
              className="done"
            >
              <FontAwesomeIcon icon={icon({ name: 'pen', style: 'solid' })} />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="delete"
            >
              <FontAwesomeIcon icon={icon({ name: 'trash', style: 'solid' })} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
