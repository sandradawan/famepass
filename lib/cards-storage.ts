export type SavedCard = {
  fanName: string;
  fanEmail?: string;
  celebrityName: string;
  celebritySlug: string;
  category: string;
  cardCode: string;
  createdAt: string;
};

const KEY = "famepass_cards";

export function loadCards(): SavedCard[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    return JSON.parse(raw) as SavedCard[];
  } catch {
    return [];
  }
}

export function saveCard(card: SavedCard) {
  const list = loadCards();
  list.unshift(card);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, 50)));
}
