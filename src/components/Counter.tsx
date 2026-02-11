import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <button className="counter" onClick={() => setCount(count + 1)}>
      Count is :{count}
    </button>
  );
}

export default Counter;