import React, { useState, useEffect, useRef } from 'react';
import classes from './ContextMenu.module.scss';
import { Transition } from 'react-transition-group';

function ContextMenu(props) {
    const [contextMenuTransitionClass, setContextMenuClass] = useState(null);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        function toggleMenu(evt) {
            if (props.isContextMenuOpen && contextMenuRef.current && !contextMenuRef.current.contains(evt.target) && !props.contextMenuToggler.contains(evt.target)) {
                props.toggleContextMenu();
            }
        }
        document.addEventListener('click', toggleMenu);
        return () => {
            document.removeEventListener('click', toggleMenu);
        }
    }, [props.isContextMenuOpen]);

    function activateHandler() {
        if (!props.isCurrentSpaceActive) {
            props.activateSpace();
            props.toggleContextMenu();
        }
    }

    function removeHandler() {
        if (props.currentSpace.isDeletable) {
            props.removeSpace();
            props.toggleContextMenu();
        }
    }

    function leaveHandler() {
        props.leaveSpace();
        props.toggleContextMenu();
    }

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
                <li className={props.isCurrentSpaceActive ? classes.disabled : ''} onClick={activateHandler}>Активировать</li>
                {props.isUserCreator
                    ? <li className={props.currentSpace.isDeletable ? '' : classes.disabled} onClick={removeHandler}>Удалить</li>
                    : <li onClick={leaveHandler}>Покинуть</li>}
            </ul>
        </Transition>
    )
}

export default ContextMenu;