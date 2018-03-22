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
    let result = [];
    for (let year = 0; year < years; year++) {
        for (let quarter of quarters) {
            for (let courseNum = 0; courseNum < numCoursePerQuarter; courseNum++) {
                result.push({
                    id: `year${year}-quarter${quarter}-course${courseNum}`,
                    content: `year${year}-quarter${quarter}-course${courseNum}`,
                });
            }
        }
    }
    return result;
};

export const shouldUpdateStateAfterDrag = (drag) => {
    const source = drag.source;
    const destination = drag.destination;

    // Tile was not dropped anywhere
    if (!destination) {
        return false;
    }

    // Time did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return false;
    }

    return true;
}