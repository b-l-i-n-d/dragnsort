import { ReactNode, useEffect, useState } from "react";

import { Dragable } from "./components/draggable/draggable";
import { MakeSortable } from "./components/sortable/make-sortable";

import "./App.scss";

function App() {
    const [itemData, setItemData] = useState<unknown[]>([
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
    ]);
    const [items, setItems] = useState<ReactNode[]>([]);

    useEffect(() => {
        setItems(
            itemData.map((item, index) => (
                <Dragable
                    key={index}
                    style={{
                        width: "20rem",
                    }}
                >
                    {item as ReactNode}
                </Dragable>
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
