import { Fragment, ReactNode, useEffect, useState } from "react";

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
        // console.log("drag start", e.currentTarget.id);
        setCurrentDragItem(Number(e.currentTarget.id));
    };

    const handleOnDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        const currentTargetIndex = Number(e.currentTarget.dataset.index);
        const position =
            currentDragItem && currentDragItem > currentTargetIndex
                ? "up"
                : "down";
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
        // console.log("dropIndex", dropIndex);
        // console.log("items", items);
        const newItems = [...items];
        const dragItem = newItems[dragIndex];
        newItems.splice(dragIndex, 1);
        newItems.splice(dropIndex, 0, dragItem);
        setCurrentDropTarget(null);
        onSort(newItems);
    };

    const onHandlerMouseDown = (index: number) => {
        setCurrentDragItem(index);
    };

    const onHandlerMouseUp = () => {
        setCurrentDragItem(null);
    };

    useEffect(() => {
        if (currentDragItem !== null) {
            document.body
                .querySelectorAll(".draggable-wrapper")
                .forEach((item, index) => {
                    if (index === currentDragItem) {
                        item.setAttribute("draggable", "true");
                    } else {
                        item.setAttribute("draggable", "false");
                    }
                });
        }
    }, [currentDragItem]);

    useEffect(() => {
        document.body
            .querySelectorAll(".drag-handle")
            .forEach((item, index) => {
                item.setAttribute("id", index.toString());
                item.addEventListener("mousedown", () =>
                    onHandlerMouseDown(index)
                );
                item.addEventListener("mouseup", onHandlerMouseUp);

                item.parentElement?.parentElement?.setAttribute(
                    "id",
                    index.toString()
                );
                item.parentElement?.parentElement?.setAttribute(
                    "data-index",
                    index.toString()
                );
                item.parentElement?.parentElement?.addEventListener(
                    "dragstart",
                    // @ts-expect-error  -- pass event to
                    handleOnDragStart
                );
                item.parentElement?.parentElement?.addEventListener(
                    "dragover",
                    (e) => e.preventDefault()
                );
                item.parentElement?.parentElement?.addEventListener(
                    "dragenter",
                    // @ts-expect-error  -- pass event to
                    handleOnDragEnter
                );
                item.parentElement?.parentElement?.addEventListener(
                    "dragend",
                    handleOnDragEnd
                );
                item.parentElement?.parentElement?.addEventListener(
                    "drop",
                    // @ts-expect-error  -- pass event to
                    handleOnDrop
                );
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items]);

    return (
        <div className={styles.makeSortable}>
            {items.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {currentDragItem !== index &&
                            index === curentDropTarget?.id &&
                            curentDropTarget.position === "up" && (
                                <hr className={styles.indicator} />
                            )}
                        {item}
                        {currentDragItem !== index &&
                            index === curentDropTarget?.id &&
                            curentDropTarget.position === "down" && (
                                <hr className={styles.indicator} />
                            )}
                    </Fragment>
                );
            })}
        </div>
    );
};
