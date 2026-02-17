import type { EncounterState, Combatant } from "../domain/encounter"

type Listener = (state: EncounterState) => void

export class FiveToolsClient {
  private socket: WebSocket | null = null
  private listeners: Listener[] = []
  private token: string

  constructor(token: string) {
    this.token = token
  }

  connect() {
    // TODO: Replace with actual 5etools WS endpoint
    const WS_URL = `ws://localhost:XXXXX/?token=${this.token}`

    this.socket = new WebSocket(WS_URL)

    this.socket.onopen = () => {
      console.log("Connected to 5etools session")
    }

    this.socket.onmessage = (event) => {
      try {
        const raw = JSON.parse(event.data)
        const adapted = this.adaptState(raw)
        if (adapted) this.emit(adapted)
      } catch (err) {
        console.error("Failed to parse message", err)
      }
    }

    this.socket.onclose = () => {
      console.warn("Disconnected. Attempting reconnect...")
      setTimeout(() => this.connect(), 3000)
    }
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
  private adaptState(raw: any): EncounterState | null {
    if (!raw) return null

    // TODO: Adjust based on actual 5etools message structure
    const combatants: Combatant[] = raw.combatants?.map((c: any) => ({
      id: c.id,
      name: c.name,
      type: c.isPlayer ? "player" : "monster",
      currentHp: c.hpCurrent,
      maxHp: c.hpMax,
      initiative: c.initiative,
      imageUrl: this.resolveImage(c),
      conditions: c.conditions ?? [],
      isVisible: !c.isHidden
    })) ?? []

    return {
      round: raw.round ?? 0,
      currentTurnId: raw.activeCombatantId ?? null,
      combatants
    }
  }

  private resolveImage(c: any): string | undefined {
    // Option 1: Use built-in image if exists
    if (c.imageUrl) return c.imageUrl

    // Option 2: Local mapping by name
    return `/images/${c.name.toLowerCase().replace(/\s/g, "_")}.png`
  }
}
