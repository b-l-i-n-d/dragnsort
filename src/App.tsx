import { ReactNode, useState } from "react";
import "./App.scss";
import { Icons } from "./components/icons";
import { MakeSortable } from "./components/sortable/make-sortable";

function App() {
    const [items, setItems] = useState<ReactNode[]>([
        <div className="draggable-wrapper">
            <div
                className="draggable"
                style={{
                    width: "20rem",
                }}
            >
                <div className="drag-handle">
                    <Icons name="grip-vertical" />
                </div>
                <div className="drag-content">Item 1</div>
            </div>
        </div>,
        <div className="draggable-wrapper">
            <div
                className="draggable"
                style={{
                    width: "20rem",
                }}
            >
                <div className="drag-handle">
                    <Icons name="grip-vertical" />
                </div>
                <div className="drag-content">Item 2</div>
            </div>
        </div>,
        <div className="draggable-wrapper">
            <div
                className="draggable"
                style={{
                    width: "20rem",
                }}
            >
                <div className="drag-handle">
                    <Icons name="grip-vertical" />
                </div>
                <div className="drag-content">Item 3</div>
            </div>
        </div>,
        <div className="draggable-wrapper">
            <div
                className="draggable"
                style={{
                    width: "20rem",
                }}
            >
                <div className="drag-handle">
                    <Icons name="grip-vertical" />
                </div>
                <div className="drag-content">Item 4</div>
            </div>
        </div>,
        <div className="draggable-wrapper">
            <div
                className="draggable"
                style={{
                    width: "20rem",
                }}
            >
                <div className="drag-handle">
                    <Icons name="grip-vertical" />
                </div>
                <div className="drag-content">Item 5</div>
            </div>
        </div>,
    ]);

    const onSort = (items: ReactNode[]) => {
        setItems(items);
    };

    return (
        <MakeSortable items={items} onSort={(newItems) => onSort(newItems)} />
    );
}

export default App;
