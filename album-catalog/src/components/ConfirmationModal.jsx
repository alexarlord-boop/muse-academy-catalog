import React from 'react';
import {Modal, Button, Spacer, ModalHeader, ModalBody, ModalContent} from "@nextui-org/react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, description, portalContainer }) => {
    return (
        <Modal
            isOpen={isOpen}
            closeButton
            open={isOpen}
            onClose={onClose}
            preventClose
            portalContainer={portalContainer}
        >
            <ModalContent>
                <ModalHeader>
                    <h3 id="modal-title">{title}</h3>
                </ModalHeader>
                <ModalBody>
                    <p>{description}</p>
                    <Spacer y={1} />
                    <div className="flex justify-end">
                        <Button auto flat color="error" onClick={onConfirm}>
                            Delete
                        </Button>
                        <Spacer x={0.5} />
                        <Button auto onClick={onClose}>
                            Cancel
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;
