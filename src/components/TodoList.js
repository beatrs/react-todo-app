import React from "react";
import TodoItem from "./TodoItem";
import { ReactComponent as IconMoon } from "assets/images/icon-moon.svg";
import { ReactComponent as IconSun } from "assets/images/icon-sun.svg";
import { nanoid } from "nanoid";
import { FaCog as IconCog } from "react-icons/fa";
import useThemeStore from "utils/useThemeStore";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useDataStore, useFilterStore, useModalStore } from "utils/useDataStore";

const TodoList = () => {
	// themes stuff
	const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);
	const darkMode = useThemeStore((state) => state.darkMode);

	const { todos, setTodos } = useDataStore();
	const [list, setList] = React.useState(todos);
	const { activeFilter, setActiveFilter } = useFilterStore();
	const [filteredList, setFilteredList] = React.useState(list);

	const initialTodoState = {
		id: nanoid(),
		task: "",
		isComplete: false,
	};

	const [todo, setTodo] = React.useState(initialTodoState);

	const handleSubmit = (e) => {
		e.preventDefault();

		setList((prevList) => {
			return [...prevList, todo];
		});
		// clear input box
		setTodo(initialTodoState);
		// update saved todos
	};

	const handleInputChange = (e) => {
		const name = e.target.name;
		setTodo((prev) => ({
			...prev,
			[name]: name === "task" ? e.target.value : !e.target.value,
		}));
		e.preventDefault();
	};

	const updateTask = (id) => {
		setList((prev) => {
			return prev.map((prevItem) => ({
				...prevItem,
				isComplete:
					prevItem.id === id ? !prevItem.isComplete : prevItem.isComplete,
			}));
		});
	};

	const removeTask = (id) => {
		setList((prev) => {
			return prev.filter((item) => item.id !== id);
		});
	};

	const getActiveCount = () => {
		const active = list.filter((item) => !item.isComplete);
		return active.length;
	};

	const filterList = (f) => {
		setFilteredList(list);
		const val = f;

		if (val === "active") {
			setFilteredList((prevFiltered) =>
				prevFiltered.filter((item) => !item.isComplete)
			);
		} else if (val === "completed") {
			setFilteredList((prevFiltered) =>
				prevFiltered.filter((item) => item.isComplete)
			);
		}

		setActiveFilter(val);
	};

	const handleClearDone = () => {
		setList((prev) => {
			return prev.filter((item) => !item.isComplete);
		});
	}

	React.useEffect(() => {
		filterList(activeFilter);
		setTodos(list);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [list]);

	// reorders list based on source and destination objects from dnd
	const handleEnd = (res) => {
		console.log(res);
		const items = Array.from(list);
		const [reorderedList] = items.splice(res.source.index, 1);
		items.splice(res.destination.index, 0, reorderedList);
		setList(items);
	};

	const toggleModal = useModalStore((state) => state.toggleModal);

	return (
		<div className="container">
			<div className="heading">
				<h1>Todo</h1>
				<div className="right">
					<div className="toggle-btn" onClick={toggleDarkMode}>
						{darkMode ? <IconSun /> : <IconMoon />}
					</div>
					<IconCog className="icon" onClick={toggleModal} />

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
					<Droppable droppableId="todos">
						{(provided) => (
							<div {...provided.droppableProps} ref={provided.innerRef}>
								{filteredList.map((item, idx) => {
									return (
										<Draggable key={item.id} draggableId={item.id} index={idx}>
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
									);
								})}
								{/* empty space in the list */}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>

				<div className="list-info">
					<p>{getActiveCount()} items left</p>
					<div className={`filters lg ${activeFilter}`}>
						<button
							className="all"
							value="all"
							onClick={(e) => filterList(e.target.value)}
						>
							All
						</button>
						<button
							className="active"
							value="active"
							onClick={(e) => filterList(e.target.value)}
						>
							Active
						</button>
						<button
							className="completed"
							value="completed"
							onClick={(e) => filterList(e.target.value)}
						>
							Completed
						</button>
					</div>
					<button onClick={handleClearDone}>Clear Completed</button>
				</div>
			</div>
			<div className={`filters sm ${activeFilter}`}>
				<button
					className="all"
					value="all"
					onClick={(e) => filterList(e.target.value)}
				>
					All
				</button>
				<button
					className="active"
					value="active"
					onClick={(e) => filterList(e.target.value)}
				>
					Active
				</button>
				<button
					className="completed"
					value="completed"
					onClick={(e) => filterList(e.target.value)}
				>
					Completed
				</button>
			</div>

		</div>
	);
};

export default TodoList;
