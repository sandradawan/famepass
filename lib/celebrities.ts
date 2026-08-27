export type CelebrityCategory = "music" | "film" | "sports" | "tv" | "creator";

export type Celebrity = {
  id: string;
  slug: string;
  name: string;
  category: CelebrityCategory;
  bio: string;
  imageUrl: string;
  isFeatured: boolean;
};

/** Placeholder portraits (Unsplash) — replace with licensed assets in production */
export const CELEBRITIES: Celebrity[] = [
  {
    id: "1",
    slug: "taylor-swift",
    name: "Taylor Swift",
    category: "music",
    bio: "American singer-songwriter and global pop icon.",
    imageUrl:
      "https://images.unsplash.com/photo-1516280440614-6697288d5d28?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "beyonce",
    name: "Beyoncé",
    category: "music",
    bio: "Singer, performer, and entrepreneur.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "leonardo-dicaprio",
    name: "Leonardo DiCaprio",
    category: "film",
    bio: "Academy Award-winning actor and producer.",
    imageUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "4",
    slug: "serena-williams",
    name: "Serena Williams",
    category: "sports",
    bio: "Tennis champion and entrepreneur.",
    imageUrl:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "5",
    slug: "zendaya",
    name: "Zendaya",
    category: "film",
    bio: "Actress and producer known for film and television.",
    imageUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "6",
    slug: "lebron-james",
    name: "LeBron James",
    category: "sports",
    bio: "NBA legend and media entrepreneur.",
    imageUrl:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "7",
    slug: "the-weeknd",
    name: "The Weeknd",
    category: "music",
    bio: "R&B and pop superstar.",
    imageUrl:
      "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80",
    isFeatured: false,
  },
  {
    id: "8",
    slug: "billie-eilish",
    name: "Billie Eilish",
    category: "music",
    bio: "Grammy-winning singer-songwriter.",
    imageUrl:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    isFeatured: false,
  },
  {
    id: "9",
    slug: "dwayne-johnson",
    name: "Dwayne Johnson",
    category: "film",
    bio: "Actor, producer, and former pro wrestler.",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
    isFeatured: false,
  },
  {
    id: "10",
    slug: "rihanna",
    name: "Rihanna",
    category: "music",
    bio: "Artist and founder of Fenty.",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80",
    isFeatured: true,
  },
  {
    id: "11",
    slug: "oprah-winfrey",
    name: "Oprah Winfrey",
    category: "tv",
    bio: "Media leader, producer, and philanthropist.",
    imageUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    isFeatured: false,
  },
  {
    id: "12",
    slug: "drake",
    name: "Drake",
    category: "music",
    bio: "Rapper, singer, and entrepreneur.",
    imageUrl:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
    isFeatured: false,
  },
];

export function getCelebrity(slug: string) {
  return CELEBRITIES.find((c) => c.slug === slug);
}

export function getFeatured() {
  return CELEBRITIES.filter((c) => c.isFeatured);
}

export function filterCelebrities(opts: {
  q?: string;
  category?: string;
}) {
  const q = (opts.q || "").toLowerCase().trim();
  const category = opts.category || "all";
  return CELEBRITIES.filter((c) => {
    const matchQ =
      !q ||
      c.name.toLowerCase().includes(q) ||
      c.bio.toLowerCase().includes(q);
    const matchCat = category === "all" || c.category === category;
    return matchQ && matchCat;
  });
}

export function generateCardCode(slug: string) {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  const prefix = slug.slice(0, 3).toUpperCase();
  return `FP-${prefix}-${part}`;
}
