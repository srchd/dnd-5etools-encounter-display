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
// import type { EncounterState } from "./domain/encounter"
// import { FiveToolsClient } from "./network/fiveToolsClient"
// import { InitiativeBoard } from "./components/InitiativeBoard"

// TODO:
//  - Show pictures (https://5e.tools/img/bestiary/tokens/XMM/<MONSTER_NAME>.webp)
//  - Store data correctly (write dataHandler, store incoming data)
//  - Show encounter correctly
//  - Dockerize with Dockerfile, so other devices on the network can see it
//  - Push to git

declare const PeerVeClient: any;

export default function App() {
  // const [encounter, setEncounter] = useState<EncounterState>({
  //   round: 0,
  //   currentTurnId: null,
  //   combatants: []
  // })

  const [rawData, setRawData] = useState<any>(null);

  useEffect(() => {
    const token = "12bd592c-1701-440a-b3ac-df1bb55eaf93";

    const client = new PeerVeClient();

    const dataHandler = (data: any) => {
      console.log("Received data: ", data);
      setRawData(data);
    };

    client.connect(token);

    client.pConnectToServer(
      token,
      dataHandler,
      {
        label: "kukas",
        serialization: "json",
      }
    )
    .then((id: any) => console.log("Connected with id:", id))
    .catch((err: any) => console.error("Connection failed:", err));

    return () => client.disconnect?.();
  }, []);

  // useEffect(() => {
  //   const token = "YOUR_SERVER_TOKEN" // TODO: make configurable
  //   const client = new FiveToolsClient(token)

  //   client.onStateUpdate(setEncounter)
  //   client.connect()
  // }, [])

//   useEffect(() => {
//   setEncounter({
//     round: 1,
//     currentTurnId: "1",
//     combatants: [
//       {
//         id: "1",
//         name: "Goblin",
//         type: "monster",
//         currentHp: 5,
//         maxHp: 12,
//         initiative: 14,
//         imageUrl: "/images/goblin.png",
//         conditions: [],
//         isVisible: true
//       },
//       {
//         id: "2",
//         name: "Fighter",
//         type: "player",
//         currentHp: 22,
//         maxHp: 30,
//         initiative: 16,
//         imageUrl: "/images/fighter.png",
//         conditions: [],
//         isVisible: true
//       }
//     ]
//   })
// }, [])

  return (
    <div style={{ padding: 20, color: "white" }}>
      <h1>Raw 5etools Data:</h1>
      <pre>
        {rawData ? JSON.stringify(rawData, null, 2) : "Waiting..."}
      </pre>
    </div>
  ); 

  // return (
  //   <div style={{ background: "#0b0f19", minHeight: "100vh", color: "white" }}>
  //     <InitiativeBoard encounter={encounter} />
  //   </div>
  // )
}
