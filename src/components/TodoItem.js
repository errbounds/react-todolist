import styled, { css } from "styled-components";
import { MdDone, MdDelete } from "react-icons/md";

const CheckCircle = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ced4da;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 20px;
  cursor: pointer;
  ${({ done }) =>
    done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content; center;
  font-size: 28px;
  cursor:pointer;
  color: #dee2e6;
  &:hover{
    color: #ff6b6b;
  }
  display: none;
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${({ done }) =>
    done &&
    css`
      color: #ced4da;
      text-decoration-line: line-through;
    `}
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  min-height: 52px;

  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

function TodoItem({ index, done, text, onToggle, onRemove }) {
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={() => onToggle(index)}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={() => onRemove(index)}>{<MdDelete />}</Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
