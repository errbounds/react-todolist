import { useState, useRef, useMemo, useCallback } from "react";
import React from "react";

function countActiveUsers(users) {
  console.log(`활성 사용자 수 세는중...`);
  return users.filter((user) => user.active).length;
}

const initialState = {
  inputs: {
    username: "",
    email: "",
  },
  users: [
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ],
};

export default function MyApp() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });
  const { username, email } = inputs;

  const [users, setUsers] = useState([
    {
      id: 1,
      username: "velopert",
      email: "public.velopert@gmail.com",
      active: true,
    },
    {
      id: 2,
      username: "tester",
      email: "tester@example.com",
      active: false,
    },
    {
      id: 3,
      username: "liz",
      email: "liz@example.com",
      active: false,
    },
  ]);
  const nextId = useRef(4);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInputs((inputs) => ({
      ...inputs,
      [name]: value,
    }));
  }, []);
  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    setUsers((users) => [...users, user]);

    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);
  const onRemove = useCallback((removeId) => {
    setUsers((users) => users.filter((user) => user.id !== removeId));
  }, []);
  const onToggle = useCallback((toggleId) => {
    // setUsers((users) => {
    //   users.forEach((user) => {
    //     if (user.id === toggleId) {
    //       user.active = !user.active;
    //     }
    //   });
    //   return users;
    // });

    setUsers((users) =>
      users.map((user) =>
        user.id === toggleId ? { ...user, active: !user.active } : user
      )
    );
  }, []);
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
      <div>활성 사용자 수: {count}</div>
    </div>
  );
}

const User = React.memo(function User({ user, onRemove, onToggle }) {
  return (
    <div>
      <b
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black",
        }}
        onClick={() => onToggle(user.id)}
      >
        {user.username}
      </b>
      <span>({user.email})</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
});

const UserList = React.memo(function UserList({ users, onRemove, onToggle }) {
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
});

const CreateUser = React.memo(function CreateUser({
  username,
  email,
  onChange,
  onCreate,
}) {
  return (
    <div>
      <input
        type="text"
        name="username"
        placeholder="계정명"
        onChange={onChange}
        value={username}
      />
      <input
        type="text"
        name="email"
        placeholder="이메일"
        onChange={onChange}
        value={email}
      />
      <button onClick={onCreate}>register</button>
    </div>
  );
});
