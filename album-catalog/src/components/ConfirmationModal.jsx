import React from 'react';
import {Modal, Button, Spacer, ModalHeader, ModalBody, ModalContent} from "@nextui-org/react";
import useModalStore from "../hooks/useStore.js";

const ConfirmationModal = () => {

    const { isModalOpen, closeModal, strings, executeOperation } = useModalStore();

    return (
        <Modal
            isOpen={isModalOpen}
            closeButton
            open={isModalOpen}
            onClose={closeModal}
            portalContainer={document.getElementById('modal')}
        >
            <ModalContent>
                <ModalHeader>
                    <h3 id="modal-title">{strings.modalTitle}</h3>
                </ModalHeader>
                <ModalBody>
                    <p>{strings.description}</p>
                    <Spacer y={1} />
                    <div className="flex justify-end">
                        <Button auto onClick={closeModal}>
                            Cancel
                        </Button>
                        <Spacer x={0.5} />
                        <Button color="black" auto flat onClick={executeOperation}>
                            {strings.confirmTitle}
                        </Button>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ConfirmationModal;
