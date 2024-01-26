import { useState } from "react";
import { Icons } from "../icons";
import styles from "./draggable.module.scss";

interface DragableProps {
    id: string;
    children: React.ReactNode;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const Dragable = ({
    id,
    children,
    onDragStart,
    onDrop,
}: DragableProps) => {
    const [isDraggable, setIsDraggable] = useState(false);

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", id);
        console.log("drag start");
        onDragStart(e);
    };

    const handleOnDragEnd = () => {
        setIsDraggable(false);
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDraggable(false);
        console.log("drop");
        onDrop(e);
    };

    return (
        <div
            className={styles.draggableContainer}
            draggable={isDraggable}
            onDragStart={handleOnDragStart}
            onDragEnd={handleOnDragEnd}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleOnDrop}
        >
            <div
                id={id}
                className={styles.dragHandle}
                onMouseDown={() => setIsDraggable(true)}
                onMouseUp={() => setIsDraggable(false)}
            >
                <Icons name="grip-vertical" size={16} />
            </div>
            <div className={styles.dragContent}>{children}</div>
        </div>
    );
};
