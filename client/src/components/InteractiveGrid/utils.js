export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderCourses = ({ columns, source, destination }) => {
    const current = [...columns[source.droppableId]];
    const next = [...columns[destination.droppableId]];
    const target = current[source.index];

    let result = null;

    // Tile was moved within the same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(
            current,
            source.index,
            destination.index,
        );

        result = {
            ...columns,
            [source.droppableId]: reordered,
        };
    }
    // Tile was moved to different list
    else {
        // Remove from original and insert into next
        current.splice(source.index, 1);
        next.splice(destination.index, 0, target);

        result = {
            ...columns,
            [source.droppableId]: current,
            [destination.droppableId]: next,
        };
    }

    return {
        columns: result
    };
};

export const getItems = (years, quarters, numCoursePerQuarter) => {
    let result = {};
    for (let year = 0; year < years; year++) {
        for (let quarter of quarters) {
            result[`${year}-${quarter}`] = Array.from({ length: numCoursePerQuarter }, (v, k) => k).map(k => ({
                id: `year-${year}-quarter-${quarter}-${k}`,
                content: `year-${year}-quarter-${quarter}-${k}`,
            }));
        }
    }
    return result;
};