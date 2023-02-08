import React from 'react'
import TodoItem from './TodoItem'
import { ReactComponent as IconMoon } from "assets/images/icon-moon.svg" 
import { ReactComponent as IconSun } from "assets/images/icon-sun.svg" 
import { nanoid } from 'nanoid'
import useThemeStore from 'utils/useThemeStore'
import { DataContext } from 'utils/AppContext'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
const TodoList = () => {

	// const [list, setList] = React.useState([])
	const [list, setList] = React.useContext(DataContext)

	const initialTodoState = {
		id: nanoid(),
		task: '',
		isComplete: false,
	}

	const [todo, setTodo] = React.useState(initialTodoState)

	const handleSubmit = (e) => {
		e.preventDefault()

		setList(prevList => {
			return [...prevList, todo]
		})

		setTodo(initialTodoState)
	}

	const handleInputChange = (e) => {
		const name = e.target.name
		setTodo(prev => ({
			...prev, 
			[name]: name === 'task' ? e.target.value : !e.target.value
		}))
		e.preventDefault()
	}

	const updateTask = (id) => {
		setList(prev => {
			return prev.map(prevItem => ({
				...prevItem,
				isComplete: prevItem.id === id ? !prevItem.isComplete : prevItem.isComplete
			}))
		})
	}

	const removeTask = (id) => {
		setList(prev => {
			return prev.filter(item => item.id !== id)
		})
	}

	// const {darkMode, toggleDarkMode} = React.useContext(DarkModeContext)
	const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode)
	const darkMode = useThemeStore((state) => state.darkMode)

	const getActiveCount = () => {
		const active = list.filter(item => !item.isComplete)
		return active.length
	}


	// React.useEffect(() => {
	// 	setTodo(initialTodoState)
	// }, [list])

	// reorders list based on source and destination objects from dnd
	const handleEnd = (res) => {
		const items = Array.from(list)
		const [reorderedList] = items.splice(res.source.index, 1)
		items.splice(res.destination.index, 0, reorderedList)
		setList(items)
	}

	return (
		<div className="container">
			<div className="heading">
				<h1>Todo</h1>
				<div className="toggle-btn" onClick={toggleDarkMode}>
					{
						darkMode ?
						<IconSun />
						: 
						<IconMoon /> 
					}
				</div>
			</div>
			<form className="item-box input" onSubmit={handleSubmit}>
				<div className="circle"></div>
				<input 
					type="text" 
					placeholder="Create a new todo..."
					name="task"
					value={todo.task}
					onChange={handleInputChange}
				/>
			</form>

			<div className="list">
				<DragDropContext onDragEnd={handleEnd}>
					<Droppable droppableId='todos'>
						{(provided) => (
							<div 
								{...provided.droppableProps} 
								ref={provided.innerRef}>
								{
									list.map((item, idx) => {
										return (
											<Draggable
												key={item.id}
												draggableId={item.id}
												index={idx}
											>
												{(provided) => (
													<TodoItem 
														provided={provided}
														key={item.id} 
														item={item} 
														updateTask={updateTask} 
														removeTask={removeTask}
													/>
												)}
											</Draggable>
										)
									})
								}
								{/* empty space in the list */}
								{provided.placeholder}
							</div>
						)

						}
					</Droppable>
				</DragDropContext>
				
				<div className="list-info">
					<p>{getActiveCount()} items left</p>
					<div className="filters lg">
						<button>All</button>
						<button>Active</button>
						<button>Completed</button>
					</div>
					<button>Clear Completed</button>
				</div>
				
			</div>
			<div className="filters sm">
				<button>All</button>
				<button>Active</button>
				<button>Completed</button>
			</div>
		</div>
	)
}

export default TodoList