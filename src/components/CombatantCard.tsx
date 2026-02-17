import type { Combatant } from "../domain/encounter"
import { HpBar } from "./HpBar"

interface Props {
  combatant: Combatant
  isActive: boolean
}

export function CombatantCard({ combatant, isActive }: Props) {
  if (!combatant.isVisible) return null

  const isDead = combatant.currentHp <= 0

  return (
    <div style={{
      display: "flex",
      gap: "12px",
      padding: "12px",
      background: isActive ? "#1f2937" : "#111",
      border: isActive ? "2px solid gold" : "1px solid #333",
      opacity: isDead ? 0.5 : 1
    }}>
      <img
        src={combatant.imageUrl}
        alt={combatant.name}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <div style={{ flex: 1 }}>
        <h3>{combatant.name}</h3>
        <HpBar
          current={combatant.currentHp}
          max={combatant.maxHp}
        />
      </div>
    </div>
  )
}
