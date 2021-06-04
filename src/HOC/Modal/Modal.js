import React, { useState, useRef } from 'react';
import classes from './Modal.module.scss';
import { Transition } from 'react-transition-group';

function Modal(props) {
    const [modalTransitionClass, setModalTransitionClass] = useState(null);
    const overlayRef = useRef(null);

    function overlayClickHandler(evt) {
        if (evt.target.contains(overlayRef.current)) {
            props.closeModal();
        }
    }

    return (
        <Transition
            in={props.isModalOpen}
            timeout={{ enter: 10, exit: 200 }}
            mountOnEnter
            unmountOnExit
            nodeRef={overlayRef}
            onExiting={() => setModalTransitionClass(classes.exiting)}
            onEntered={() => setModalTransitionClass(classes.entered)}
            onEntering={() => setModalTransitionClass(classes.entering)}>
            <div className={`${classes.Overlay} ${modalTransitionClass}`} onClick={overlayClickHandler} ref={overlayRef}>
                <div className={`${classes.Modal} ${modalTransitionClass}`}>
                    {props.children}
                </div>
            </div>
        </Transition>
    )

}

export default Modal;