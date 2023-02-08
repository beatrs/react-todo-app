import React from 'react'

import { ReactComponent as IconCheck } from "assets/images/icon-check.svg"
import { ReactComponent as IconCross } from "assets/images/icon-cross.svg"

const TodoItem = ({ item, updateTask, removeTask, provided }) => {

	return (
		<div 
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			ref={provided.innerRef}
			className={`item-box ${item.isComplete ? "done" : ""}`} 
		>
			<div 
				className={`icon circle ${item.isComplete ? "done" : ""}`} 
				name="isComplete" 
				onClick={() => updateTask(item.id)}
			>
				{
					item.isComplete &&
					<IconCheck />
				}
			</div>
			<div className="item">{item.task}</div>
			<div className="icon" onClick={() => removeTask(item.id)}>
				<IconCross />
			</div>
		</div>
	)
}

export default TodoItem