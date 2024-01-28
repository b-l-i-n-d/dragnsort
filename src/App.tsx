import { ReactNode, useState } from "react";
import "./App.scss";
import { MakeSortable } from "./components/sortable/make-sortable";

function App() {
    const [items, setItems] = useState<ReactNode[]>([
        <div
            style={{
                width: "10rem",
            }}
        >
            Item 1
        </div>,
        <div
            style={{
                width: "10rem",
            }}
        >
            Item 2
        </div>,
        <div
            style={{
                width: "10rem",
            }}
        >
            Item 3
        </div>,
        <div
            style={{
                width: "10rem",
            }}
        >
            Item 4
        </div>,
        <div
            style={{
                width: "10rem",
            }}
        >
            Item 5
        </div>,
    ]);

    const onSort = (newItems: ReactNode[]) => {
        setItems(newItems);
    };

    return (
        <>
            <MakeSortable
                items={items}
                onSort={(sortedItems) => onSort(sortedItems)}
            />
        </>
    );
}

export default App;
