import { useRef, useState } from "react";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoHead from "./components/TodoHead";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const itemIndex = useRef(0);
  const onChange = (e) => {
    setInput(e.target.value);
  };
  const onCreate = (e) => {
    e.preventDefault();
    setTodoList([
      ...todoList,
      { index: itemIndex.current, text: input, done: false },
    ]);
    setInput("");
    itemIndex.current += 1;
  };
  const onRemove = (index) => {
    setTodoList(todoList.filter((todo) => todo.index !== index));
  };
  const onToggle = (index) => {
    setTodoList(
      todoList.map((todo) =>
        todo.index === index ? { ...todo, done: !todo.done } : todo
      )
    );
  };
  const unDoneTasks = todoList.filter((todo) => !todo.done).length;
  return (
    <>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead unDoneTasks={unDoneTasks} />
        <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove} />
        <TodoCreate onCreate={onCreate} onChange={onChange} input={input} />
      </TodoTemplate>
    </>
  );
}

export default App;
