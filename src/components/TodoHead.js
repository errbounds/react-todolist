import styled from "styled-components";

const TodoHeadBlock = styled.div`
  padding: 48px 32px 32px 24px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-size: bold;
  }
`;

function TodoHead({ unDoneTasks }) {
  const today = new Date();
  const day = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <TodoHeadBlock>
      <h1>{today.toLocaleDateString()}</h1>
      <div className="day">{day[today.getDay()]}요일</div>
      <div className="tasks-left">할일 {unDoneTasks}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
