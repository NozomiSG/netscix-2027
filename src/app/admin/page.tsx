"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

type Contact = {
  id: string;
  receivedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  message: string;
};

type PaymentStatus = "pending" | "paid" | "refunded" | "rejected";

type Registration = {
  id: string;
  receivedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  affiliation: string;
  position?: string;
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

type AbstractStatus = "submitted" | "under-review" | "accepted" | "rejected" | "withdrawn";

type Abstract = {
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

type Data = { contacts: Contact[]; registrations: Registration[]; abstracts: Abstract[] };

const STATUS_VARIANT: Record<PaymentStatus, "amber" | "emerald" | "muted" | "rose"> = {
  pending: "amber",
  paid: "emerald",
  refunded: "muted",
  rejected: "rose",
};

const ABSTRACT_VARIANT: Record<AbstractStatus, "amber" | "blue" | "emerald" | "rose" | "muted"> = {
  submitted: "amber",
  "under-review": "blue",
  accepted: "emerald",
  rejected: "rose",
  withdrawn: "muted",
};

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [data, setData] = useState<Data | null>(null);
  const [tab, setTab] = useState<"registrations" | "abstracts" | "contacts">("registrations");
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    const res = await fetch("/api/admin/submissions", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      return;
    }
    const json = await res.json();
    setData(json);
    setAuthed(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (!res.ok) {
        const j = await res.json();
        setErr(j?.error || "Login failed.");
      } else {
        setPwd("");
        await fetchData();
      }
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setData(null);
  }

  async function setStatus(id: string, paymentStatus: PaymentStatus) {
    const res = await fetch(`/api/admin/registrations/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ paymentStatus }),
    });
    if (res.ok) await fetchData();
  }

  async function setAbstractStatus(id: string, status: AbstractStatus) {
    const res = await fetch(`/api/admin/abstracts/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) await fetchData();
  }

  if (authed === null) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-muted">Loading…</div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Admin sign-in</CardTitle>
            <p className="text-sm text-gray-600">Enter the admin password to view submissions.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={login} className="space-y-4">
              <div>
                <Label htmlFor="pwd" className="mb-1.5 block">Password</Label>
                <Input
                  id="pwd"
                  type="password"
                  value={pwd}
                  autoFocus
                  onChange={(e) => setPwd(e.target.value)}
                />
              </div>
              {err && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                  {err}
                </div>
              )}
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Signing in…" : "Sign in"}
              </Button>
              <p className="text-[11px] text-muted">
                Default password: <span className="font-mono">netscix2027</span>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = data
    ? {
        total: data.registrations.length,
        pending: data.registrations.filter((r) => r.paymentStatus === "pending").length,
        paid: data.registrations.filter((r) => r.paymentStatus === "paid").length,
        abstracts: data.abstracts?.length ?? 0,
      }
    : null;

  return (
    <div className="min-h-[70vh] bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-serif text-3xl font-bold text-ink">Admin</h1>
            <p className="mt-1 text-sm text-muted">
              Form submissions stored in <span className="font-mono">data/submissions.json</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={fetchData}>
              Refresh
            </Button>
            <Button size="sm" onClick={logout}>
              Sign out
            </Button>
          </div>
        </div>

        {stats && (
          <div className="mt-6 grid gap-3 sm:grid-cols-4">
            <StatCard label="Registrations" value={stats.total} />
            <StatCard label="Pending payment" value={stats.pending} accent="amber" />
            <StatCard label="Paid" value={stats.paid} accent="emerald" />
            <StatCard label="Abstracts" value={stats.abstracts} />
          </div>
        )}

        <div className="mt-8 border-b border-gray-200 flex gap-6 overflow-x-auto">
          <TabButton active={tab === "registrations"} onClick={() => setTab("registrations")}>
            Registrations ({data?.registrations.length ?? 0})
          </TabButton>
          <TabButton active={tab === "abstracts"} onClick={() => setTab("abstracts")}>
            Abstracts ({data?.abstracts?.length ?? 0})
          </TabButton>
          <TabButton active={tab === "contacts"} onClick={() => setTab("contacts")}>
            Contacts ({data?.contacts.length ?? 0})
          </TabButton>
        </div>

        <div className="mt-6">
          {tab === "registrations" && (
            <RegistrationsList rows={data?.registrations || []} onStatus={setStatus} />
          )}
          {tab === "abstracts" && (
            <AbstractsList rows={data?.abstracts || []} onStatus={setAbstractStatus} />
          )}
          {tab === "contacts" && <ContactsList rows={data?.contacts || []} />}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: "amber" | "emerald";
}) {
  const tone =
    accent === "amber"
      ? "border-amber-200 bg-amber-50"
      : accent === "emerald"
        ? "border-emerald-200 bg-emerald-50"
        : "border-gray-200 bg-white";
  return (
    <Card className={tone}>
      <CardContent className="p-5 pt-5">
        <div className="text-xs uppercase tracking-widest text-muted">{label}</div>
        <div className="mt-1 font-serif text-3xl font-bold text-ink">{value}</div>
      </CardContent>
    </Card>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "relative py-3 text-sm font-medium " +
        (active ? "text-ink" : "text-muted hover:text-ink")
      }
    >
      {children}
      {active && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-ink" />}
    </button>
  );
}

function RegistrationsList({
  rows,
  onStatus,
}: {
  rows: Registration[];
  onStatus: (id: string, s: PaymentStatus) => void;
}) {
  if (rows.length === 0) return <Empty label="No registrations yet." />;
  return (
    <div className="space-y-4">
      {rows.map((r) => (
        <details key={r.id} className="group">
          <summary className="cursor-pointer list-none">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 pt-5 flex flex-wrap gap-x-6 gap-y-2 items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs font-mono text-muted shrink-0">
                    {fmtDate(r.receivedAt)}
                  </span>
                  <span className="font-medium text-ink truncate">
                    {r.firstName} {r.lastName}
                  </span>
                  <span className="text-sm text-muted truncate">{r.affiliation}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline">{r.category}</Badge>
                  <Badge variant="outline">{r.tier}</Badge>
                  <span className="font-mono text-ink">USD {r.fee.toLocaleString()}</span>
                  <Badge variant={STATUS_VARIANT[r.paymentStatus]}>{r.paymentStatus}</Badge>
                </div>
              </CardContent>
            </Card>
          </summary>

          <div className="mt-2">
            <Card>
              <CardContent className="p-5 pt-5 space-y-4">
                {/* Payment review controls */}
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-xs uppercase tracking-widest text-muted">Payment review</div>
                    <div className="mt-1 text-sm text-ink">
                      Receipt:{" "}
                      {r.receiptPath ? (
                        <a
                          className="text-brand hover:underline font-mono"
                          href={`/api/admin/receipts/${r.receiptPath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {r.receiptPath}
                        </a>
                      ) : (
                        <span className="text-muted">not uploaded</span>
                      )}
                      {r.receiptUploadedAt && (
                        <span className="ml-2 text-xs text-muted">
                          ({fmtDate(r.receiptUploadedAt)})
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs uppercase tracking-widest text-muted">
                      Set status
                    </Label>
                    <Select
                      className="w-[160px]"
                      value={r.paymentStatus}
                      onChange={(e) => onStatus(r.id, e.target.value as PaymentStatus)}
                    >
                      <option value="pending">pending</option>
                      <option value="paid">paid</option>
                      <option value="refunded">refunded</option>
                      <option value="rejected">rejected</option>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <KV k="Email" v={r.email} mono />
                  <KV k="Phone" v={r.phone || "—"} />
                  <KV k="Country" v={r.country} />
                  <KV k="Position" v={r.position || "—"} />
                  <KV k="Schools" v={r.schools.length ? r.schools.join(", ") : "—"} />
                  <KV
                    k="Accompanying"
                    v={
                      r.accompanying === 0
                        ? "None"
                        : `${r.accompanying} (${r.accompanyingNames || "—"})`
                    }
                  />
                  <KV k="Dietary" v={r.dietary || "—"} />
                  <KV k="Visa letter" v={r.visaLetter ? "Yes" : "No"} />
                  <KV k="Billing" v={r.billing || "—"} />
                  <KV k="Payment method" v={r.payment} />
                  {r.notes && <KV k="Notes" v={r.notes} wide />}
                  <KV k="Submission ID" v={r.id} mono wide />
                  {r.reviewedAt && <KV k="Last reviewed" v={fmtDate(r.reviewedAt)} mono wide />}
                </div>
              </CardContent>
            </Card>
          </div>
        </details>
      ))}
    </div>
  );
}

function AbstractsList({
  rows,
  onStatus,
}: {
  rows: Abstract[];
  onStatus: (id: string, s: AbstractStatus) => void;
}) {
  if (rows.length === 0) return <Empty label="No abstracts yet." />;
  return (
    <div className="space-y-4">
      {rows.map((a) => (
        <details key={a.id} className="group">
          <summary className="cursor-pointer list-none">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-5 pt-5 flex flex-wrap gap-x-6 gap-y-2 items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="text-xs font-mono text-muted shrink-0">
                    {fmtDate(a.receivedAt)}
                  </span>
                  <span className="font-medium text-ink truncate max-w-[420px]" title={a.title}>
                    {a.title}
                  </span>
                  <span className="text-sm text-muted truncate">{a.submittingAuthor}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Badge variant="outline">{a.presentationPref}</Badge>
                  <Badge variant={ABSTRACT_VARIANT[a.status]}>{a.status}</Badge>
                </div>
              </CardContent>
            </Card>
          </summary>

          <div className="mt-2">
            <Card>
              <CardContent className="p-5 pt-5 space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <div className="text-xs uppercase tracking-widest text-muted">PDF</div>
                    <div className="mt-1 text-sm text-ink">
                      {a.filePath ? (
                        <a
                          className="text-brand hover:underline font-mono"
                          href={`/api/admin/abstract-files/${a.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {a.filePath}
                        </a>
                      ) : (
                        <span className="text-muted">no PDF attached</span>
                      )}
                      {a.fileUploadedAt && (
                        <span className="ml-2 text-xs text-muted">({fmtDate(a.fileUploadedAt)})</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-xs uppercase tracking-widest text-muted">Set status</Label>
                    <Select
                      className="w-[160px]"
                      value={a.status}
                      onChange={(e) => onStatus(a.id, e.target.value as AbstractStatus)}
                    >
                      <option value="submitted">submitted</option>
                      <option value="under-review">under-review</option>
                      <option value="accepted">accepted</option>
                      <option value="rejected">rejected</option>
                      <option value="withdrawn">withdrawn</option>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-2 text-sm">
                  <KV k="Email" v={a.email} mono />
                  <KV k="Affiliation" v={a.affiliation} />
                  <KV k="Country" v={a.country} />
                  <KV k="Topic" v={a.topic} />
                  <KV k="Keywords" v={a.keywords} wide />
                  {a.coAuthors && <KV k="Co-authors" v={a.coAuthors} wide />}
                  {a.funding && <KV k="Funding" v={a.funding} wide />}
                  {a.comments && <KV k="Comments" v={a.comments} wide />}
                  <KV k="Original work declared" v={a.originalWork ? "Yes" : "No"} />
                  <KV k="Share with reviewers" v={a.shareWithReviewers ? "Yes" : "No"} />
                  <KV k="Submission ID" v={a.id} mono wide />
                  {a.reviewedAt && <KV k="Last reviewed" v={fmtDate(a.reviewedAt)} mono wide />}
                </div>

                <div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mb-1">Abstract</div>
                  <div className="rounded-md border border-gray-200 bg-white p-4 text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                    {a.abstract}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </details>
      ))}
    </div>
  );
}

function ContactsList({ rows }: { rows: Contact[] }) {
  if (rows.length === 0) return <Empty label="No contact messages yet." />;
  return (
    <div className="space-y-4">
      {rows.map((c) => (
        <Card key={c.id}>
          <CardContent className="p-5 pt-5">
            <div className="flex flex-wrap gap-x-6 gap-y-1 items-baseline">
              <span className="text-xs font-mono text-muted">{fmtDate(c.receivedAt)}</span>
              <span className="font-medium text-ink">
                {c.firstName} {c.lastName}
              </span>
              <a className="text-sm text-brand hover:underline font-mono" href={`mailto:${c.email}`}>
                {c.email}
              </a>
              {c.phone && <span className="text-sm text-muted">{c.phone}</span>}
            </div>
            <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {c.message}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function KV({
  k,
  v,
  mono,
  wide,
}: {
  k: string;
  v: string;
  mono?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <div className="text-[10px] uppercase tracking-widest text-muted">{k}</div>
      <div className={"text-ink " + (mono ? "font-mono " : "") + "break-all"}>{v}</div>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="py-20 text-center text-muted border border-dashed border-gray-300 rounded-lg bg-white">
      {label}
    </div>
  );
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}
