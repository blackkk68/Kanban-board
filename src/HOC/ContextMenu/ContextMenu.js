import React, { useState, useEffect, useRef } from 'react';
import classes from './ContextMenu.module.scss';
import { Transition } from 'react-transition-group';

function ContextMenu(props) {
    const [contextMenuClass, setContextMenuClass] = useState(null);
    const contextMenuRef = useRef(null);

    useEffect(() => {
        function closeMenu(evt) {
            if (contextMenuClass === classes.entered && !contextMenuRef.current.contains(evt.target)) {
                props.closeContextMenu();
            }
        }
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu);
        }
    }, [contextMenuClass])

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
            <div className={`${classes.ContextMenu} ${contextMenuClass}`} ref={contextMenuRef}>
                {props.children}
            </div>
        </Transition>
    )
}

export default ContextMenu;