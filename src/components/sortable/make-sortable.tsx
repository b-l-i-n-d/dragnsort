import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";

import styles from "./make-sortable.module.scss";

interface MakeSortableProps {
    items: ReactNode[];
    onSort: (items: ReactNode[]) => void;
}

export const MakeSortable = ({ items, onSort }: MakeSortableProps) => {
    const [currentDropTarget, setCurrentDropTarget] = useState<{
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
        const curentDropTargetRect = e.currentTarget.getBoundingClientRect();
        const position =
            e.pageY > curentDropTargetRect.y + curentDropTargetRect.height / 2
                ? "down"
                : "up";
        setCurrentDropTarget({
            id: currentTargetIndex,
            position,
        });
    };

    const handleOnDragEnd = () => {
        setCurrentDropTarget(null);
    };

    const handleOnDrop = useCallback(
        (e: React.DragEvent<HTMLDivElement>) => {
            const dragIndex = Number(e.dataTransfer.getData("text/plain"));
            const dropIndex = Number(e.currentTarget.dataset.index);
            const curentDropTargetRect =
                e.currentTarget.getBoundingClientRect();
            const position =
                e.pageY >
                curentDropTargetRect.y + curentDropTargetRect.height / 2
                    ? "down"
                    : "up";

            let adjustedDropIndex = dropIndex;

            if (dragIndex < dropIndex) {
                if (position === "up") {
                    adjustedDropIndex = dropIndex - 1 > 0 ? dropIndex - 1 : 0;
                }
            } else if (dragIndex > dropIndex) {
                if (position === "down") {
                    adjustedDropIndex =
                        dropIndex + 1 < items.length
                            ? dropIndex + 1
                            : items.length - 1;
                }
            }

            const newItems = [...items];
            const dragItem = newItems[dragIndex];
            newItems.splice(dragIndex, 1);
            newItems.splice(adjustedDropIndex, 0, dragItem);
            setCurrentDropTarget(null);
            onSort(newItems);
        },
        [items, onSort]
    );

    useEffect(() => {
        if (currentDragItem !== null) {
            document.body
                .querySelectorAll(".drag-handle")
                .forEach((item, index) => {
                    if (index === currentDragItem) {
                        item.parentElement?.parentElement?.setAttribute(
                            "draggable",
                            "true"
                        );
                    } else {
                        item?.parentElement?.parentElement?.setAttribute(
                            "draggable",
                            "false"
                        );
                    }
                });
        }
    }, [currentDragItem]);

    useEffect(() => {
        const onHandlerMouseDown = (index: number) => {
            setCurrentDragItem(index);
        };

        const onHandlerMouseUp = () => {
            setCurrentDragItem(null);
        };

        const dragHandles = document.body.querySelectorAll(".drag-handle");
        const items = Array.from(
            document.body.querySelector(".make-sortable")?.children || []
        ) as HTMLElement[];

        if (dragHandles && items) {
            dragHandles.forEach((item, index) => {
                item.setAttribute("id", index.toString());
                item.addEventListener("mousedown", () =>
                    onHandlerMouseDown(index)
                );
                item.addEventListener("mouseup", onHandlerMouseUp);
            });

            items.forEach((item, index) => {
                item.setAttribute("id", index.toString());
                item.setAttribute("data-index", index.toString());
                item.addEventListener(
                    "dragstart",
                    // @ts-expect-error --pass event
                    handleOnDragStart
                );
                item.addEventListener("dragover", (e) => e.preventDefault());
                item.addEventListener(
                    "dragenter",
                    // @ts-expect-error --pass event
                    handleOnDragEnter
                );
                item.addEventListener("dragend", handleOnDragEnd);
                item.addEventListener(
                    "drop",
                    // @ts-expect-error --pass event
                    handleOnDrop
                );
            });
        }

        return () => {
            dragHandles.forEach((item, index) => {
                item.removeEventListener("mousedown", () =>
                    onHandlerMouseDown(index)
                );
                item.removeEventListener("mouseup", onHandlerMouseUp);
            });

            items?.forEach((item) => {
                item.removeEventListener(
                    "dragstart",
                    // @ts-expect-error --pass event
                    handleOnDragStart
                );
                item.removeEventListener("dragover", (e) => e.preventDefault());
                item.removeEventListener(
                    "dragenter",
                    // @ts-expect-error --pass event
                    handleOnDragEnter
                );
                item.removeEventListener("dragend", handleOnDragEnd);
                item.removeEventListener(
                    "drop",
                    // @ts-expect-error --pass event
                    handleOnDrop
                );
            });
        };
    }, [handleOnDrop, currentDragItem]);

    return (
        <div className={`${styles.makeSortable} make-sortable`}>
            {items.map((item, index) => {
                return (
                    <Fragment key={index}>
                        {currentDragItem !== index &&
                            index === currentDropTarget?.id &&
                            currentDropTarget.position === "up" && (
                                <div
                                    // draggable={true}
                                    id={index.toString()}
                                    data-index={index.toString()}
                                    onDragEnter={handleOnDragEnter}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleOnDrop}
                                    className={styles.indicator}
                                />
                            )}
                        {item}
                        {currentDragItem !== index &&
                            index === currentDropTarget?.id &&
                            currentDropTarget.position === "down" && (
                                <div
                                    // draggable={true}
                                    id={index.toString()}
                                    data-index={index.toString()}
                                    onDragEnter={handleOnDragEnter}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={handleOnDrop}
                                    className={styles.indicator}
                                />
                            )}
                    </Fragment>
                );
            })}
        </div>
    );
};
