import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "submissions.json");
export const RECEIPTS_DIR = path.join(DATA_DIR, "receipts");

export type AbstractStatus = "submitted" | "under-review" | "accepted" | "rejected" | "withdrawn";

export type AbstractSubmission = {
  id: string;
  receivedAt: string;
  // Authoring
  submittingAuthor: string;
  email: string;
  affiliation: string;
  country: string;
  coAuthors?: string;
  // Submission
  title: string;
  abstract: string;
  keywords: string;
  topic: string;
  presentationPref: string;
  funding?: string;
  comments?: string;
  // Declarations
  originalWork: boolean;
  shareWithReviewers: boolean;
  // Attached PDF (optional)
  filePath?: string;
  fileUploadedAt?: string;
  // Review
  status: AbstractStatus;
  reviewedAt?: string;
};

export type ContactSubmission = {
  id: string;
  receivedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

export type PaymentStatus = "pending" | "paid" | "refunded" | "rejected";

export type RegistrationSubmission = {
  id: string;
  receivedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  affiliation: string;
  position: string;
  country: string;
  category: string;
  tier: string;
  fee: number;
  schools: string[];
  accompanying: number;
  accompanyingNames?: string;
  dietary?: string;
  visaLetter: boolean;
  billing?: string;
  payment: string;
  notes?: string;
  paymentStatus: PaymentStatus;
  receiptPath?: string;
  receiptUploadedAt?: string;
  reviewedAt?: string;
};

type Store = {
  contacts: ContactSubmission[];
  registrations: RegistrationSubmission[];
  abstracts: AbstractSubmission[];
};

export const ABSTRACTS_DIR = path.join(DATA_DIR, "abstracts");

async function ensureFile(): Promise<Store> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(RECEIPTS_DIR, { recursive: true });
    await fs.mkdir(ABSTRACTS_DIR, { recursive: true });
    const buf = await fs.readFile(FILE, "utf-8");
    const parsed = JSON.parse(buf) as Store;
    parsed.registrations = (parsed.registrations || []).map((r) => ({
      paymentStatus: "pending",
      ...r,
    }));
    parsed.contacts = parsed.contacts || [];
    parsed.abstracts = (parsed.abstracts || []).map((a) => ({
      status: "submitted",
      ...a,
    }));
    return parsed;
  } catch {
    const empty: Store = { contacts: [], registrations: [], abstracts: [] };
    await fs.writeFile(FILE, JSON.stringify(empty, null, 2), "utf-8");
    return empty;
  }
}

async function write(store: Store) {
  await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf-8");
}

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export async function addContact(
  data: Omit<ContactSubmission, "id" | "receivedAt">,
): Promise<ContactSubmission> {
  const store = await ensureFile();
  const entry: ContactSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    ...data,
  };
  store.contacts.unshift(entry);
  await write(store);
  return entry;
}

export async function addRegistration(
  data: Omit<RegistrationSubmission, "id" | "receivedAt" | "paymentStatus">,
): Promise<RegistrationSubmission> {
  const store = await ensureFile();
  const entry: RegistrationSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    paymentStatus: "pending",
    ...data,
  };
  store.registrations.unshift(entry);
  await write(store);
  return entry;
}

export async function readAll(): Promise<Store> {
  return ensureFile();
}

export async function addAbstract(
  data: Omit<AbstractSubmission, "id" | "receivedAt" | "status">,
): Promise<AbstractSubmission> {
  const store = await ensureFile();
  const entry: AbstractSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    status: "submitted",
    ...data,
  };
  store.abstracts.unshift(entry);
  await write(store);
  return entry;
}

export async function updateAbstract(
  id: string,
  patch: Partial<AbstractSubmission>,
): Promise<AbstractSubmission | null> {
  const store = await ensureFile();
  const idx = store.abstracts.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  store.abstracts[idx] = { ...store.abstracts[idx], ...patch };
  await write(store);
  return store.abstracts[idx];
}

export async function findRegistration(
  id: string,
  email: string,
): Promise<RegistrationSubmission | null> {
  const store = await ensureFile();
  const r = store.registrations.find(
    (x) => x.id === id && x.email.toLowerCase() === email.toLowerCase(),
  );
  return r || null;
}

export async function updateRegistration(
  id: string,
  patch: Partial<RegistrationSubmission>,
): Promise<RegistrationSubmission | null> {
  const store = await ensureFile();
  const idx = store.registrations.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  store.registrations[idx] = { ...store.registrations[idx], ...patch };
  await write(store);
  return store.registrations[idx];
}
