import React from 'react';
import classes from './ColumnElements.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';

function ColumnElements(props) {
    const regexp = new RegExp(`${props.searchValue}`, 'gi');
    const filteredTasks = props.tasks.filter(item => item.heading.match(regexp));
    const tasks = filteredTasks.map((item, index) => {
        let cls;
        if (item.priority === 'Низкий') {
            cls = classes.Low;
        } else if (item.priority === 'Средний') {
            cls = classes.Medium;
        } else if (item.priority === 'Высокий') {
            cls = classes.High;
        }

        return (
            <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                {(provided, snapshot) => {
                    return (
                        <li className={`${classes.Element} ${snapshot.isDragging ? classes.dragging : ''}`}
                            key={item.id}
                            onClick={() => elemClickHandler(item.id)}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}>
                            {item.priority ? <p className={cls}>{`${item.priority} приоритет`}</p> : null}
                            <h3>{item.heading}</h3>
                        </li>
                    )
                }}
            </Draggable>
        )
    })

    function elemClickHandler(taskId) {
        props.openCurrentTaskModal(props.columnId, taskId);
    }

    return (
        <Droppable droppableId={String(props.columnId)} type='task'>
            {provided => {
                return (
                    <ul className={classes.ColumnElements}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks}
                        {provided.placeholder}
                    </ul>
                )
            }}
        </Droppable>
    )
}

export default ColumnElements;