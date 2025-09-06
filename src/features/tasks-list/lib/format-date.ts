export const formatDate = (date: Date) => {
    const today = new Date();
    const taskDate = new Date(date);

    if (taskDate.toDateString() === today.toDateString()) {
        return "Today";
    }

    if (
        taskDate.toDateString() ===
        new Date(today.setDate(today.getDate() - 1)).toDateString()
    ) {
        return "Yesterday";
    }

    return taskDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};
