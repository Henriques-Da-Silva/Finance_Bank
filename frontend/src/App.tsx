import { useState } from "react"

export default function App() {

  const [count, setCount] = useState(0)

  return (
    <>
      <main className="bg-surface flex flex-col justify-center items-center gap-4 min-h-full">
        <h1 className="text-primary">Finance Bank</h1>

        <button className="bg-primary-dark px-4 py-2 rounded-xl text-surface hover:cursor-pointer" onClick={() => {setCount((count) => count+1)}}>Contar {count}</button>

        <button className="bg-primary-dark px-4 py-2 rounded-xl text-surface hover:cursor-pointer" onClick={() => {setCount(0)}}>Reiniciar</button>
      </main>
    </>
  )

}