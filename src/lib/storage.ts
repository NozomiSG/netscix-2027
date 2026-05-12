import { getSupabase } from "./supabase";

export type AbstractStatus = "submitted" | "under-review" | "accepted" | "rejected" | "withdrawn";

export type AbstractSubmission = {
  id: string;
  receivedAt: string;
  submittingAuthor: string;
  email: string;
  affiliation: string;
  country: string;
  coAuthors?: string;
  title: string;
  abstract: string;
  keywords: string;
  topic: string;
  presentationPref: string;
  funding?: string;
  comments?: string;
  originalWork: boolean;
  shareWithReviewers: boolean;
  filePath?: string;
  fileUploadedAt?: string;
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

const BUCKET_ABSTRACTS = "abstracts";
const BUCKET_RECEIPTS = "receipts";

const EXT_TO_MIME: Record<string, string> = {
  pdf: "application/pdf",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export const RECEIPT_MIME = EXT_TO_MIME;

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function isNoRows(err: { code?: string } | null) {
  return err?.code === "PGRST116";
}

export async function addContact(
  data: Omit<ContactSubmission, "id" | "receivedAt">,
): Promise<ContactSubmission> {
  const entry: ContactSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    ...data,
  };
  const { error } = await getSupabase().from("contacts").insert(entry);
  if (error) throw error;
  return entry;
}

export async function addRegistration(
  data: Omit<RegistrationSubmission, "id" | "receivedAt" | "paymentStatus">,
): Promise<RegistrationSubmission> {
  const entry: RegistrationSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    paymentStatus: "pending",
    ...data,
  };
  const { error } = await getSupabase().from("registrations").insert(entry);
  if (error) throw error;
  return entry;
}

export async function addAbstract(
  data: Omit<AbstractSubmission, "id" | "receivedAt" | "status">,
): Promise<AbstractSubmission> {
  const entry: AbstractSubmission = {
    id: newId(),
    receivedAt: new Date().toISOString(),
    status: "submitted",
    ...data,
  };
  const { error } = await getSupabase().from("abstracts").insert(entry);
  if (error) throw error;
  return entry;
}

export async function updateAbstract(
  id: string,
  patch: Partial<AbstractSubmission>,
): Promise<AbstractSubmission | null> {
  const { data, error } = await getSupabase()
    .from("abstracts")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    if (isNoRows(error)) return null;
    throw error;
  }
  return data as AbstractSubmission;
}

export async function findRegistration(
  id: string,
  email: string,
): Promise<RegistrationSubmission | null> {
  const { data, error } = await getSupabase()
    .from("registrations")
    .select()
    .eq("id", id)
    .single();
  if (error) {
    if (isNoRows(error)) return null;
    throw error;
  }
  if ((data as RegistrationSubmission).email.toLowerCase() !== email.toLowerCase()) {
    return null;
  }
  return data as RegistrationSubmission;
}

export async function updateRegistration(
  id: string,
  patch: Partial<RegistrationSubmission>,
): Promise<RegistrationSubmission | null> {
  const { data, error } = await getSupabase()
    .from("registrations")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) {
    if (isNoRows(error)) return null;
    throw error;
  }
  return data as RegistrationSubmission;
}

export async function readAll(): Promise<Store> {
  const [c, r, a] = await Promise.all([
    getSupabase().from("contacts").select().order("receivedAt", { ascending: false }),
    getSupabase().from("registrations").select().order("receivedAt", { ascending: false }),
    getSupabase().from("abstracts").select().order("receivedAt", { ascending: false }),
  ]);
  if (c.error) throw c.error;
  if (r.error) throw r.error;
  if (a.error) throw a.error;
  return {
    contacts: (c.data || []) as ContactSubmission[],
    registrations: (r.data || []) as RegistrationSubmission[],
    abstracts: (a.data || []) as AbstractSubmission[],
  };
}

export async function uploadAbstractFile(
  id: string,
  buf: Buffer,
  ext: string,
): Promise<string> {
  const filename = `${id}.${ext}`;
  const { error } = await getSupabase().storage
    .from(BUCKET_ABSTRACTS)
    .upload(filename, buf, {
      contentType: EXT_TO_MIME[ext] || "application/octet-stream",
      upsert: true,
    });
  if (error) throw error;
  return filename;
}

export async function downloadAbstractFile(
  filename: string,
): Promise<{ buf: Buffer; contentType: string } | null> {
  const { data, error } = await getSupabase().storage
    .from(BUCKET_ABSTRACTS)
    .download(filename);
  if (error || !data) return null;
  const buf = Buffer.from(await data.arrayBuffer());
  return { buf, contentType: data.type || "application/pdf" };
}

export async function uploadReceiptFile(
  id: string,
  buf: Buffer,
  ext: string,
): Promise<string> {
  const filename = `${id}.${ext}`;
  const { error } = await getSupabase().storage
    .from(BUCKET_RECEIPTS)
    .upload(filename, buf, {
      contentType: EXT_TO_MIME[ext] || "application/octet-stream",
      upsert: true,
    });
  if (error) throw error;
  return filename;
}

export async function downloadReceiptFile(
  filename: string,
): Promise<{ buf: Buffer; contentType: string } | null> {
  const { data, error } = await getSupabase().storage
    .from(BUCKET_RECEIPTS)
    .download(filename);
  if (error || !data) return null;
  const buf = Buffer.from(await data.arrayBuffer());
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  return {
    buf,
    contentType: EXT_TO_MIME[ext] || data.type || "application/octet-stream",
  };
}
