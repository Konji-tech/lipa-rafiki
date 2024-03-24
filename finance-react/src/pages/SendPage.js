import { useState } from "react";

export default function SendPage() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex justify-center items-center flex-col p-8">
      <h1 className="3xl">Send {counter}</h1>
      <button
        className="bg-blue-600 p-4 rounded-xl text-white"
        onClick={function () {
          setCounter(counter + 1);
        }}
      >
        Clicked {counter} times!
      </button>
    </div>
  );
}
