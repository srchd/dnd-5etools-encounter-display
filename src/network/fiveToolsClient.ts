import type { EncounterState, Combatant, CombatantType } from "../domain/encounter"
// import type { PeerVeClient } from "../types/peerve-client"

type Listener = (state: EncounterState) => void

export class FiveToolsClient {
  private listeners: Listener[] = []
  private playerCharacters: String[] = [
    "Griffith",
    "Tarkas",
    "Liriel",
    "Lazari",
    "szisza",
    "raven"
  ]
  private token: string
  private client: PeerVeClient
  // private encounterState: EncounterState
  private dataHandler = (data: any) => {
    console.log("Received data: ", data);
    this.updateEncounterData(data);
  }

  constructor(token: string) {
    this.token = token
    this.client = new PeerVeClient()
  }

  connect() {
    this.client.pConnectToServer(
      this.token,
      this.dataHandler,
      {
        label: "teszt",
        serialization: "json",
      }
    )
    .then((id: any) => console.log("Connected with id:", id))
    .catch((err: any) => console.error("Connection failed:", err));
  }

  updateEncounterData(data: any){
    var combatants: Combatant[] = [];
    var round = data.data.payload.round;
    var _id = 0;

    for (const [_i, _combatant] of data.data.payload.rows.entries()){
      const combatantType: CombatantType = this.playerCharacters.includes(_combatant.name) ? "player" : "monster";

      combatants.push({
        id: String(_i),
        name: _combatant.name,
        type: combatantType,
        currentHp: _combatant.hpCurrent ?? 10,
        maxHp: _combatant.hpMax ?? 10,
        initiative: _combatant.initiative,
        imageUrl: this.getImageAddress(_combatant.name, combatantType),
        conditions: [],
        isVisible: true,
        isActive: _combatant.isActive
      });
    }

    const state: EncounterState = {
      round: round,
      currentTurnId: "1",
      combatants: combatants
    };

    this.emit(state);
  }

  private getImageAddress(name: string, type: CombatantType) {
    if (type == "monster") return `https://5e.tools/img/bestiary/tokens/XMM/${name}.webp`

    return `/images/${name}.png`
  }

  onStateUpdate(listener: Listener) {
    this.listeners.push(listener)
  }

  private emit(state: EncounterState) {
    this.listeners.forEach(l => l(state))
  }

  /**
   * THIS is where you map 5etools JSON → your schema.
   * Inspect WS messages in DevTools and adjust accordingly.
   */
  // private adaptState(raw: any): EncounterState | null {
  //   if (!raw) return null

  //   // TODO: Adjust based on actual 5etools message structure
  //   const combatants: Combatant[] = raw.combatants?.map((c: any) => ({
  //     id: c.id,
  //     name: c.name,
  //     type: c.isPlayer ? "player" : "monster",
  //     currentHp: c.hpCurrent,
  //     maxHp: c.hpMax,
  //     initiative: c.initiative,
  //     imageUrl: this.resolveImage(c),
  //     conditions: c.conditions ?? [],
  //     isVisible: !c.isHidden
  //   })) ?? []

  //   return {
  //     round: raw.round ?? 0,
  //     currentTurnId: raw.activeCombatantId ?? null,
  //     combatants
  //   }
  // }

  // private resolveImage(c: any): string | undefined {
  //   // Option 1: Use built-in image if exists
  //   if (c.imageUrl) return c.imageUrl

  //   // Option 2: Local mapping by name
  //   return `/images/${c.name.toLowerCase().replace(/\s/g, "_")}.png`
  // }
}
