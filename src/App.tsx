// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
import { useEffect, useState } from "react"
import type { EncounterState } from "./domain/encounter"
import { FiveToolsClient } from "./network/fiveToolsClient"
import { InitiativeBoard } from "./components/InitiativeBoard"

// TODO:
//  - Show encounter correctly (prettier, landscape mode perhaps?)
//  - Have an input field for the token

declare const PeerVeClient: any;

export default function App() {
  const [encounter, setEncounter] = useState<EncounterState>({
    round: 0,
    currentTurnId: null,
    combatants: []
  })

  useEffect(() => {
    const client = new FiveToolsClient()

    client.onStateUpdate(setEncounter)
  }, [])

  return (
    <div style={{ background: "#0b0f19", minHeight: "100vh", color: "white" }}>
      <InitiativeBoard encounter={encounter} />
    </div>
  )
}
