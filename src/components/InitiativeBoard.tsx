import type { EncounterState } from "../domain/encounter"
import { CombatantCard } from "./CombatantCard"

interface Props {
  encounter: EncounterState
}

export function InitiativeBoard({ encounter }: Props) {
  const sorted = [...encounter.combatants]
    .sort((a, b) => b.initiative - a.initiative)

  return (
    <div style={{ padding: "24px" }} className="h-full w-full grid gap-4 p-4
         grid-cols-2 md:grid-cols-3 lg:grid-cols-4
         auto-rows-fr">
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
