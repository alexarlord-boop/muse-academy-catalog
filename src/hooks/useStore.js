import {create} from 'zustand';

const useModalStore = create((set) => ({
    isModalOpen: false,
    operation: null,
    strings: {
        modalTitle: "",
        confirmTitle: "",
        description: "",
    },

    openModal: () => set({isModalOpen: true}),
    closeModal: () => set({isModalOpen: false}),
    updateOperation: (operation) => set({operation}),

    setModalContent: ({modalTitle, confirmTitle, description}) => set(
        {
            strings: {
                modalTitle: modalTitle,
                confirmTitle: confirmTitle,
                description: description
            }
        }),

    executeOperation: async () => {
        const {operation} = useModalStore.getState();
        if (operation) {
            await operation();
            set({isModalOpen: false});
        }
    },
}));

export default useModalStore;
