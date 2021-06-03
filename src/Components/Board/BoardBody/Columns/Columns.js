import React from 'react';
import classes from './Columns.module.scss';
import { Draggable } from 'react-beautiful-dnd';
import ColumnHeader from './ColumnHeader/ColumnHeader';
import ColumnElements from './ColumnElements/ColumnElements';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import columnsStore from '../../../../Store/columns';
import { observer } from 'mobx-react';

const Columns = observer((props) => {
    const cls = [classes.first, classes.second, classes.third, classes.fourth, classes.fifth, classes.sixth, classes.seventh];

    return columnsStore.columns.map((item, index) => {
        return (
            <Draggable draggableId={String(item.id)} index={index} key={item.id}>
                {provided => {
                    return (
                        <div className={`${classes.Column} ${cls[item.index - 1]}`}
                            key={item.id}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}>
                            <ColumnHeader id={item.id} heading={item.heading} />
                            <ColumnElements
                                tasks={item.tasks ? item.tasks : []}
                                columnId={item.id}
                                openUpdateTaskModal={props.openUpdateTaskModal}
                                searchValue={props.searchValue} />
                            <div className={classes.actions}>
                                {item.deletable
                                    ? <DeleteOutlineOutlinedIcon className={classes.trash} onClick={() => props.openConfirmModal(item.id)} />
                                    : <span />}
                                <AddBoxOutlinedIcon className={classes.plus} onClick={() => props.openAddNewTaskModal(item.id)} />
                            </div>
                        </div>
                    )
                }}
            </Draggable>
        )
    })
});

export default Columns;