import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { useCallback, useState, useEffect } from "react";
import { v4 } from "uuid";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
    const [todoList, setTodoList] = useState([]);
    const [textInput, setTextInput] = useState("");

    useEffect(() => {
        const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
        if (storagedTodoList) {
            setTodoList(JSON.parse(storagedTodoList));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    }, [todoList]);

    const onTextInputChange = useCallback((e) => {
        setTextInput(e.target.value);
    }, []);

    const onAddbtnClick = useCallback(
        (e) => {
            //them text input vao todolist
            setTodoList([
                { id: v4(), name: textInput, isCompleted: false },
                ...todoList,
            ]);
            setTextInput("");
        },
        [textInput, todoList]
    );

    const onCheckBtnclick = useCallback((id) => {
        setTodoList((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: true } : todo
            )
        );
    }, []);

    return (
        <>
            <h3>Danh sach can lam</h3>
            <Textfield
                name="add-todo"
                placeholder="Them viec can lam..."
                elemAfterInput={
                    <Button
                        isDisabled={!textInput}
                        appearance="primary"
                        onClick={onAddbtnClick}
                    >
                        {" "}
                        Thêm{" "}
                    </Button>
                }
                css={{ padding: "2px 4px 2px" }}
                value={textInput}
                onChange={onTextInputChange}
            ></Textfield>
            <TodoList todoList={todoList} onCheckBtnclick={onCheckBtnclick} />
        </>
    );
}

export default App;
