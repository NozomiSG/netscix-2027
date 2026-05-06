export type Tier = "early" | "standard" | "onsite";

export const TIER_LABEL: Record<Tier, string> = {
  early: "Early-bird (until Dec 31, 2026)",
  standard: "Standard (until Jan 31, 2027)",
  onsite: "On-site (subject to capacity)",
};

export type Category =
  | "faculty"
  | "student"
  | "industry"
  | "schools-only"
  | "accompanying";

export const CATEGORY_LABEL: Record<Category, string> = {
  faculty: "Faculty / Postdoc",
  student: "Student",
  industry: "Industry",
  "schools-only": "Schools only (1 day)",
  accompanying: "Accompanying person (social events)",
};

export const FEES: Record<Category, Record<Tier, number>> = {
  faculty: { early: 450, standard: 550, onsite: 650 },
  student: { early: 250, standard: 320, onsite: 400 },
  industry: { early: 550, standard: 650, onsite: 750 },
  "schools-only": { early: 180, standard: 220, onsite: 280 },
  accompanying: { early: 120, standard: 150, onsite: 180 },
};

export const SCHOOLS = [
  "Foundations of Network Science",
  "Statistical Inference for Networks",
  "Higher-Order Networks & Hypergraphs",
  "Dynamical Processes on Networks",
];

export function computeFee(category: Category, tier: Tier, accompanying: number): number {
  const base = FEES[category][tier];
  const acc = accompanying * FEES.accompanying[tier];
  return base + acc;
}
