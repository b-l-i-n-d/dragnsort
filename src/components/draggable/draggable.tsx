import { Icons } from "../icons";

import styles from "./draggable.module.scss";

interface DragableProps {
    dragHandle?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Dragable = ({
    children,
    dragHandle,
    className,
    style,
}: DragableProps) => {
    return (
        <div className={`${styles.draggableWrapper}`}>
            <div className={`${styles.draggable} ${className}`} style={style}>
                <div className={`${styles.dragHandle} drag-handle`}>
                    {dragHandle ? dragHandle : <Icons name="grip-vertical" />}
                </div>
                <div className={styles.dragContent}>{children}</div>
            </div>
        </div>
    );
};
