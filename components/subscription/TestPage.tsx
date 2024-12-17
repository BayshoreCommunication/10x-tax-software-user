"use client";

import { decrement, increment } from "../../redux/features/counterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

export default function TestPage() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Redux Toolkit + Next.js</h1>
      <p className="text-xl">Count: {count}</p>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Decrement
        </button>
      </div>
    </main>
  );
}
