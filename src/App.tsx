import { ReactNode, useEffect, useState } from "react";
import "./App.scss";
import { Icons } from "./components/icons";
import { MakeSortable } from "./components/sortable/make-sortable";

function App() {
    const [itemData, setItemData] = useState<unknown[]>([1, 2, 3, 4, 5]);
    const [items, setItems] = useState<ReactNode[]>([]);

    useEffect(() => {
        setItems(
            itemData.map((item) => (
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
                        <div className="drag-content">{item as ReactNode}</div>
                    </div>
                </div>
            ))
        );
    }, [itemData]);

    return (
        <MakeSortable
            itemData={itemData}
            items={items}
            onSort={(newItems) => {
                setItemData(newItems);
            }}
        />
    );
}

export default App;
