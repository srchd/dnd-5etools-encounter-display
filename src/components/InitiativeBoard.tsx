import type { EncounterState } from "../domain/encounter"
import { CombatantCard } from "./CombatantCard"

interface Props {
  encounter: EncounterState
}

export function InitiativeBoard({ encounter }: Props) {
  const sorted = [...encounter.combatants]
    .sort((a, b) => b.initiative - a.initiative)

  return (
    <div style={{ padding: "24px" }}>
      <h2>Round {encounter.round}</h2>

      {sorted.map(c => (
        <CombatantCard
          key={c.id}
          combatant={c}
          isActive={c.isActive}
        />
      ))}
    </div>
  )
}
