import styled from "styled-components";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList({ todoList, onToggle, onRemove }) {
  return (
    <TodoListBlock>
      {todoList.map((todo) => (
        <TodoItem
          key={todo.index}
          index={todo.index}
          text={todo.text}
          done={todo.done}
          onToggle={onToggle}
          onRemove={onRemove}
        />
      ))}
    </TodoListBlock>
  );
}

export default TodoList;
