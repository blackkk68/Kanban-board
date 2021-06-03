import React, { useState, useEffect, useRef } from 'react';
import classes from './ContextMenu.module.scss';
import { Transition } from 'react-transition-group';

function ContextMenu(props) {
    const [contextMenuTransitionClass, setContextMenuClass] = useState(null);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        function toggleMenu(evt) {
            if (props.isContextMenuOpen && !contextMenuRef.current.contains(evt.target) && !props.plusRef.contains(evt.target)) {
                props.toggleContextMenu();
            }
        }
        document.addEventListener('click', toggleMenu);
        return () => {
            document.removeEventListener('click', toggleMenu);
        }
    }, [props.isContextMenuOpen]);

    return (
        <Transition
            in={props.isContextMenuOpen}
            timeout={{ exit: 200 }}
            mountOnEnter
            unmountOnExit
            nodeRef={contextMenuRef}
            onExiting={() => setContextMenuClass(classes.exiting)}
            onEntered={() => setContextMenuClass(classes.entered)}
            onEntering={() => setContextMenuClass(classes.entering)}>
            <ul className={`${classes.ContextMenu} ${contextMenuTransitionClass}`} ref={contextMenuRef}>
                <li onClick={() => props.addNewSpace()}>Добавить новое</li>
                <li onClick={() => props.addSpaceWithCode()}>Добавить по коду</li>
            </ul>
        </Transition>
    )
}

export default ContextMenu;