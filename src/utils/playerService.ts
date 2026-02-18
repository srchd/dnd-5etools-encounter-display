import type { Player } from "../types/player"

export async function loadPlayersJson(): Promise<Player[]> {
  const res = await fetch("/assets/players.json");

  if (!res.ok) {
    throw new Error(`Failed to load players.json: ${res.status}`);
  }

  return await res.json();
}
