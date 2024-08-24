export const deleteModalStrings = {
    modalTitle: "Confirm Deletion",
    confirmTitle: "Delete",
    description: "Are you sure you want to delete this album? This action cannot be undone."
}

export function getPublishModalStrings(newStatus)  {
    return {
        modalTitle: "Change status: " + newStatus,
        confirmTitle: "Change status: " + newStatus,
        description: `Are you sure you want to ${newStatus} this album?`,
    }
}