import { useState } from 'react';
import './App.css';
import styled from 'styled-components';

const Test = styled.button`
  padding: 14px;
`;

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <Test>테스트 버튼</Test>
      <div>helloWorld!</div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
