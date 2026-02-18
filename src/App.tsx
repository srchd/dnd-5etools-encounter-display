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
//  - Show pictures (https://5e.tools/img/bestiary/tokens/XMM/<MONSTER_NAME>.webp)
//  - Store data correctly (write dataHandler, store incoming data)
//  - Show encounter correctly
//  - Dockerize with Dockerfile, so other devices on the network can see it
//  - Push to git

declare const PeerVeClient: any;

export default function App() {
  const [encounter, setEncounter] = useState<EncounterState>({
    round: 0,
    currentTurnId: null,
    combatants: []
  })

  useEffect(() => {
    const token = "82be1f47-d98b-44f7-a667-11b13b26de50" // TODO: make configurable
    const client = new FiveToolsClient(token)

    client.onStateUpdate(setEncounter)
    client.connect()
  }, [])

  return (
    <div style={{ background: "#0b0f19", minHeight: "100vh", color: "white" }}>
      <InitiativeBoard encounter={encounter} />
    </div>
  )
}
