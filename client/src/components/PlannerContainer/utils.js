import { REPOSITORY_ID, YEARS, QUARTERS } from '..';

const moveWithinList = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const moveWithinGrid = ({ courses, columns, source, destination }) => {
    const sourceFromRepository = source.droppableId === REPOSITORY_ID;
    const destinationToRepository = destination.droppableId === REPOSITORY_ID;

    let current = sourceFromRepository ? courses : [...columns[source.droppableId]];
    let next = destinationToRepository ? courses : [...columns[destination.droppableId]];

    let result = null;

    // Tile was moved within the same list
    if (source.droppableId === destination.droppableId) {
        const reordered = moveWithinList(
            current,
            source.index,
            destination.index,
        );

        result = {
            courses: sourceFromRepository ? reordered : courses,
            columns: sourceFromRepository ? columns : { ...columns, [source.droppableId]: reordered }
        }
    }
    // Tile was moved to different list
    else {
        // Remove from original and insert into next
        const target = current[source.index];

        current.splice(source.index, 1);
        next.splice(destination.index, 0, target);

        if (sourceFromRepository) {
            result = {
                columns: {
                    ...columns,
                    [destination.droppableId]: next,
                },
                courses: current
            }
        }
        else if (destinationToRepository) {
            result = {
                columns: {
                    ...columns,
                    [source.droppableId]: current,
                },
                courses: next
            }
        } else {
            result = {
                columns: {
                    ...columns,
                    [source.droppableId]: current,
                    [destination.droppableId]: next,
                },
                courses
            };
        }
    }

    return result;
};

export const getGridColumns = () => {
    let columns = {};
    for (let year = 0; year < YEARS; year++) {
        for (let quarter of QUARTERS) {
            columns[`${year}-${quarter.toLowerCase()}`] = [];
        }
    }

    return columns;
}

export const shouldUpdateStateAfterDrag = (drag) => {
    const source = drag.source;
    const destination = drag.destination;

    // Tile was not dropped anywhere
    if (!destination) {
        return false;
    }

    // Tile did not move anywhere - can bail early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return false;
    }

    return true;
}