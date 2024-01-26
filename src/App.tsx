import "./App.scss";
import { MakeSortable } from "./components/sortable/make-sortable";

function App() {
    return (
        <>
            <MakeSortable
                items={[
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
                ]}
                onSort={(items) => console.log(items)}
            />
        </>
    );
}

export default App;
