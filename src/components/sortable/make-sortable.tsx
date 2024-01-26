import { ReactNode } from "react";
import { Dragable } from "../draggable/draggable";

import styles from "./make-sortable.module.scss";

interface MakeSortableProps {
    items: ReactNode[];
    onSort: (items: ReactNode[]) => void;
}

export const MakeSortable = ({ items, onSort }: MakeSortableProps) => {
    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        console.log(e.currentTarget);
        e.dataTransfer.setData("text/plain", e.currentTarget.id);
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const dragIndex = Number(e.dataTransfer.getData("text/plain"));
        console.log(dragIndex);
        const dropIndex = Number(e.currentTarget.dataset.index);
        const newItems = [...items];
        const dragItem = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, dragItem);
        onSort(newItems);
    };

    return (
        <div className={styles.makeSortable}>
            {items.map((item, index) => {
                return (
                    <Dragable
                        id={String(index)}
                        key={index}
                        onDragStart={handleOnDragStart}
                        onDrop={handleOnDrop}
                    >
                        {item}
                    </Dragable>
                );
            })}
        </div>
    );
};
