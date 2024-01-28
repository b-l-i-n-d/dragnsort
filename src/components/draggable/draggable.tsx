import { useState } from "react";
import { Icons } from "../icons";
import styles from "./draggable.module.scss";

interface DragableProps {
    id: string;
    dataIndex: number;
    children: React.ReactNode;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: () => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const Dragable = ({
    id,
    dataIndex,
    children,
    onDragStart,
    onDragEnter,
    onDragEnd,
    onDrop,
}: DragableProps) => {
    const [isDraggable, setIsDraggable] = useState(false);

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData("text/plain", id);
        onDragStart(e);
    };

    const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        onDragEnter(e);
    };

    const handleOnDragEnd = () => {
        setIsDraggable(false);
        onDragEnd();
    };

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDraggable(false);
        onDrop(e);
    };

    return (
        <div
            id={id}
            data-index={dataIndex}
            className={styles.draggableContainer}
            draggable={isDraggable}
            onDragStart={handleOnDragStart}
            onDragEnter={handleOnDragEnter}
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
