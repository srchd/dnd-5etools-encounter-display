import type { EncounterState, Combatant, CombatantType } from "../domain/encounter"
// import type { PeerVeClient } from "../types/peerve-client"

type Listener = (state: EncounterState) => void

export class FiveToolsClient {
  private _listeners: Listener[] = []
  private _playerCharacters: String[] = [
    "Griffith",
    "Tarkas",
    "Liriel",
    "Lazari",
    "szisza",
    "raven"
  ]
  private _client: PeerVeClient
  // private encounterState: EncounterState

  constructor() {
    this._client = new PeerVeClient();
    this._initUI();
  }

  private _initUI() {
    const btn = document.getElementById("connect-btn") as HTMLButtonElement;
    const input = document.getElementById("token-input") as HTMLInputElement;
    const errorMsg = document.getElementById("error-msg") as HTMLDivElement;

    btn.addEventListener("click", async () => {
      const token = input.value.trim();

      if (!token) {
        errorMsg.textContent = "Please enter a token.";
        return;
      }

      try {
        await this._client.pConnectToServer(
          token,
          (data) => this._updateEncounterData(data),
          {
            label: "kaka",
            serialization: "json",
          }
        );

        // Hide connect screen
        document.getElementById("connect-screen")!.style.display = "none";
        document.getElementById("root")!.style.display = "block";
      } catch (e) {
        errorMsg.textContent = "Connection failed. Invalid token?";
        console.error(e);
      }
    });
  }

  private _updateEncounterData(data: any){
    var combatants: Combatant[] = [];
    var round = data.data.payload.round;

    for (const [_i, _combatant] of data.data.payload.rows.entries()){
      const combatantType: CombatantType = this._playerCharacters.includes(_combatant.name) ? "player" : "monster";

      combatants.push({
        id: String(_i),
        name: _combatant.name,
        type: combatantType,
        currentHp: _combatant.hpCurrent ?? 10,
        maxHp: _combatant.hpMax ?? 10,
        initiative: _combatant.initiative,
        imageUrl: this._getImageAddress(_combatant.name, combatantType),
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

  private _getImageAddress(name: string, type: CombatantType) {
    if (type == "monster") return `https://5e.tools/img/bestiary/tokens/XMM/${name}.webp`

    return `/images/${name}.png`
  }

  onStateUpdate(listener: Listener) {
    this._listeners.push(listener)
  }

  private emit(state: EncounterState) {
    this._listeners.forEach(l => l(state))
  }
}
