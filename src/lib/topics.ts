export const TOPICS = [
  "Network structure & measures",
  "Temporal & dynamic networks",
  "Multilayer & multiplex networks",
  "Higher-order networks & hypergraphs",
  "Community detection & mesoscale structure",
  "Network inference & reconstruction",
  "Spreading processes & contagion",
  "Synchronization & control on networks",
  "Networks in biology & systems biology",
  "Brain networks & neuroscience",
  "Social & economic networks",
  "Urban, transport & infrastructure networks",
  "Information & communication networks",
  "Network medicine & epidemiology",
  "Machine learning on networks (GNNs, embeddings)",
  "Network science methodology & open tools",
  "Other (please specify in keywords)",
] as const;

export type Topic = (typeof TOPICS)[number];

export type PresentationPref = "oral" | "poster" | "either";

export const PRESENTATION_OPTIONS: { value: PresentationPref; label: string; desc: string }[] = [
  { value: "oral", label: "Oral talk", desc: "12-minute presentation in a contributed session." },
  { value: "poster", label: "Poster", desc: "Showcased at a poster session with refreshments." },
  { value: "either", label: "Either", desc: "Let the program committee decide." },
];
