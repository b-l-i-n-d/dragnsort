import { Fragment, ReactNode, useState } from "react";
import { Dragable } from "../draggable/draggable";

import styles from "./make-sortable.module.scss";

interface MakeSortableProps {
    items: ReactNode[];
    onSort: (items: ReactNode[]) => void;
}

export const MakeSortable = ({ items, onSort }: MakeSortableProps) => {
    const [curentDropTarget, setCurrentDropTarget] = useState<{
        id: number;
        position: "down" | "up";
    } | null>(null);
    const [currentDragItem, setCurrentDragItem] = useState<number | null>(null);

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", e.currentTarget.id);
        setCurrentDragItem(Number(e.currentTarget.id));
    };

    const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        const currentTargetIndex = Number(e.currentTarget.dataset.index);
        const position =
            currentDragItem && currentDragItem > currentTargetIndex
                ? "up"
                : "down";
        console.log(position, currentDragItem, currentTargetIndex);
        setCurrentDropTarget({
            id: currentTargetIndex,
            position: position,
        });
    };

    const handleOnDragEnd = () => {
        setCurrentDropTarget(null);
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragIndex = Number(e.dataTransfer.getData("text/plain"));
        const dropIndex = Number(e.currentTarget.dataset.index);
        const newItems = [...items];
        const dragItem = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, dragItem);
        setCurrentDropTarget(null);
        onSort(newItems);
    };

    return (
        <div className={styles.makeSortable}>
            {items.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {currentDragItem !== index &&
                            index === curentDropTarget?.id &&
                            curentDropTarget.position === "up" && <hr />}
                        <Dragable
                            id={String(index)}
                            dataIndex={index}
                            key={index}
                            onDragStart={handleOnDragStart}
                            onDragEnter={handleOnDragEnter}
                            onDragEnd={handleOnDragEnd}
                            onDrop={handleOnDrop}
                        >
                            {item}
                        </Dragable>
                        {currentDragItem !== index &&
                            index === curentDropTarget?.id &&
                            curentDropTarget.position === "down" && <hr />}
                    </Fragment>
                );
            })}
        </div>
    );
};
