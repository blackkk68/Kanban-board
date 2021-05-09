import React, { useState } from 'react'
import classes from './Spaces.module.scss';
import SpacesBody from './SpacesBody/SpacesBody';
import AddNewSpace from '../Modals/AddNewSpace';
import Plus from '../../Plugins/Plus/Plus';

function Spaces(props) {
    const [isAddSpaceModalOpen, setIsAddSpaceModalOpen] = useState(false);

    function openModal() {
        setIsAddSpaceModalOpen(true);
    }

    function closeModal() {
        setIsAddSpaceModalOpen(false);
    }


    return (
        <React.Fragment>
            <section className={classes.Spaces}>
                <div className={classes.header}>
                    <h1 className={classes.heading}>Пространства</h1>
                    <div className={classes.buttons}>
                        <Plus onClick={openModal} />
                    </div>
                </div>
                <SpacesBody updateSpaces={props.updateSpaces} updateActiveSpace={props.updateActiveSpace} />
            </section>
            {isAddSpaceModalOpen
                ? <AddNewSpace closeModal={closeModal} updateSpaces={props.updateSpaces} />
                : null}
        </React.Fragment>
    )
}

export default Spaces;