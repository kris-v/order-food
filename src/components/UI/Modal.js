import { useEffect, useRef } from "react";

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

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            {children}
        </dialog>
    );
};

export default Modal