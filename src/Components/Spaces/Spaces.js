import React, { useState, useRef, useEffect } from 'react'
import classes from './Spaces.module.scss';
import SpacesBody from './SpacesBody/SpacesBody';
import AddNewSpace from '../Modals/AddNewSpace';
import AddSpaceWithCode from '../Modals/AddSpaceWithCode';
import Plus from '../../Plugins/Plus/Plus';

function Spaces(props) {
    const [isAddNewSpaceModalOpen, setIsAddNewSpaceModalOpen] = useState(false);
    const [isAddSpaceWithCodeOpen, setIsAddSpaceWithCodeOpen] = useState(false);
    const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        function closeContextMenu() {
            setIsContextMenuOpen(false)
        }
        if (isContextMenuOpen) {
            document.addEventListener('click', closeContextMenu);
        }
        return () => {
            document.removeEventListener('click', closeContextMenu);
        }
    }, [isContextMenuOpen]);

    function toggleContextMenu() {
        isContextMenuOpen ? setIsContextMenuOpen(false) : setIsContextMenuOpen(true);
    }

    function toggleAddNewSpaceModal() {
        isAddNewSpaceModalOpen ? setIsAddNewSpaceModalOpen(false) : setIsAddNewSpaceModalOpen(true);
    }

    function toggleAddSpaceWithCodeModal() {
        isAddSpaceWithCodeOpen ? setIsAddSpaceWithCodeOpen(false) : setIsAddSpaceWithCodeOpen(true);
    }

    function addNewSpaceClickHandler() {
        toggleAddNewSpaceModal();
        toggleContextMenu();
    }

    function addSpaceWithCodeClickHandeler() {
        toggleAddSpaceWithCodeModal();
        toggleContextMenu();
    }

    return (
        <React.Fragment>
            <section className={classes.Spaces}>
                <div className={classes.header}>
                    <h1 className={classes.heading}>Пространства</h1>
                    <div className={classes.buttons}>
                        <Plus onClick={toggleContextMenu} />
                    </div>
                    {isContextMenuOpen
                        ? <div className={classes.contextMenu} ref={contextMenuRef}>
                            <ul>
                                <li onClick={addNewSpaceClickHandler}>Добавить новое</li>
                                <li onClick={addSpaceWithCodeClickHandeler}>Добавить по коду</li>
                            </ul>
                        </div>
                        : null}
                </div>
                <SpacesBody spaces={props.spaces} activeSpace={props.activeSpace} updateSpaces={props.updateSpaces} updateActiveSpace={props.updateActiveSpace} />
            </section>
            {isAddNewSpaceModalOpen
                ? <AddNewSpace toggleAddNewSpaceModal={toggleAddNewSpaceModal} updateSpaces={props.updateSpaces} />
                : null}
            {isAddSpaceWithCodeOpen
                ? <AddSpaceWithCode toggleAddSpaceWithCodeModal={toggleAddSpaceWithCodeModal} updateSpaces={props.updateSpaces} />
                : null}
        </React.Fragment>
    )
}

export default Spaces;