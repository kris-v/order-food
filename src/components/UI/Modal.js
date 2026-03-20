import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ open, onClose, children }) => {
    const dialogRef = useRef();

    useEffect(() => {
        const dialogElement = dialogRef.current;

        if (!dialogElement) {
            return;
        }

        if (open && !dialogElement.open) {
            dialogElement.showModal();
        }

        if (!open && dialogElement.open) {
            dialogElement.close();
        }

        return () => {
            if (dialogElement.open) {
                dialogElement.close();
            }
        };
    }, [open]);

    const modalRoot = document.getElementById("modal");

    if (!modalRoot) {
        return null;
    }

    return createPortal(
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            {children}
        </dialog>,
        modalRoot
    );
};

export default Modal