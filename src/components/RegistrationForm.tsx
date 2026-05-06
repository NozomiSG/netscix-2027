"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileCheck2, Upload, X } from "lucide-react";
import {
  CATEGORY_LABEL,
  FEES,
  SCHOOLS,
  TIER_LABEL,
  type Category,
  type Tier,
  computeFee,
} from "@/lib/fees";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  affiliation: string;
  position: string;
  country: string;
  category: Category;
  tier: Tier;
  schools: string[];
  accompanying: number;
  accompanyingNames: string;
  dietary: string;
  visaLetter: boolean;
  billing: string;
  payment: "card" | "bank-transfer";
  notes: string;
  receipt: File | null;
};

const INITIAL: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  affiliation: "",
  position: "",
  country: "",
  category: "faculty",
  tier: "early",
  schools: [],
  accompanying: 0,
  accompanyingNames: "",
  dietary: "",
  visaLetter: false,
  billing: "",
  payment: "card",
  notes: "",
  receipt: null,
};

const ACCEPT = "application/pdf,image/jpeg,image/png,image/webp";
const MAX_BYTES = 5 * 1024 * 1024;

export default function RegistrationForm() {
  const [data, setData] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [resultId, setResultId] = useState<string>("");
  const [receiptUploaded, setReceiptUploaded] = useState(false);

  const fee = useMemo(
    () => computeFee(data.category, data.tier, data.accompanying),
    [data.category, data.tier, data.accompanying],
  );

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleSchool(name: string) {
    setData((d) => ({
      ...d,
      schools: d.schools.includes(name) ? d.schools.filter((s) => s !== name) : [...d.schools, name],
    }));
  }

  function pickReceipt(f: File | null) {
    if (f && f.size > MAX_BYTES) {
      setError("Receipt is larger than 5 MB.");
      setStatus("error");
      return;
    }
    set("receipt", f);
    if (status === "error") {
      setError("");
      setStatus("idle");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      const fd = new FormData();
      fd.append("firstName", data.firstName);
      fd.append("lastName", data.lastName);
      fd.append("email", data.email);
      fd.append("phone", data.phone);
      fd.append("affiliation", data.affiliation);
      fd.append("position", data.position);
      fd.append("country", data.country);
      fd.append("category", data.category);
      fd.append("tier", data.tier);
      fd.append("accompanying", String(data.accompanying));
      fd.append("accompanyingNames", data.accompanyingNames);
      fd.append("dietary", data.dietary);
      fd.append("visaLetter", data.visaLetter ? "true" : "false");
      fd.append("billing", data.billing);
      fd.append("payment", data.payment);
      fd.append("notes", data.notes);
      fd.append("schools", JSON.stringify(data.schools));
      if (data.receipt) fd.append("receipt", data.receipt);

      const res = await fetch("/api/registration", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Submission failed.");
        setStatus("error");
        return;
      }
      setResultId(json.id);
      setReceiptUploaded(!!json.receiptUploaded);
      setStatus("ok");
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <Card className="border-emerald-200 shadow-md overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
        <CardHeader>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <CardTitle>Registration submitted</CardTitle>
              <CardDescription className="text-gray-700 mt-1">
                Thanks, {data.firstName}. Your registration is recorded as{" "}
                <span className="font-mono text-ink">{resultId}</span>.{" "}
                {receiptUploaded
                  ? "Your payment receipt was received and is awaiting review."
                  : "We'll email payment instructions shortly. Reply with the receipt or come back here to add it."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => {
              setData(INITIAL);
              setStatus("idle");
              setResultId("");
              setReceiptUploaded(false);
            }}
          >
            Submit another registration
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-orange-200/70 shadow-md overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-orange-400 via-amber-400 to-rose-400" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="brand">Form</Badge>
          <CardTitle className="text-2xl">Registration form</CardTitle>
        </div>
        <CardDescription>
          The total updates as you change category, tier, or accompanying persons. Attach your
          payment receipt at the bottom — it&rsquo;s optional and can also be sent later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-10">
          <Section title="Personal details" tone="blue">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="firstName" label="First name" required value={data.firstName} onChange={(v) => set("firstName", v)} />
              <Field id="lastName" label="Last name" required value={data.lastName} onChange={(v) => set("lastName", v)} />
              <Field id="email" label="Email" required type="email" value={data.email} onChange={(v) => set("email", v)} />
              <Field id="phone" label="Phone" type="tel" value={data.phone} onChange={(v) => set("phone", v)} />
              <Field id="affiliation" label="Affiliation" required value={data.affiliation} onChange={(v) => set("affiliation", v)} placeholder="University, lab or company" />
              <Field id="position" label="Position / role" value={data.position} onChange={(v) => set("position", v)} placeholder="e.g. Postdoc, PhD student" />
              <Field id="country" label="Country" required value={data.country} onChange={(v) => set("country", v)} />
            </div>
          </Section>

          <Section title="Registration type" tone="amber">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="category" className="mb-1.5 block">Category</Label>
                <Select id="category" value={data.category} onChange={(e) => set("category", e.target.value as Category)}>
                  {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
                    <option key={c} value={c}>
                      {CATEGORY_LABEL[c]} — USD {FEES[c][data.tier]}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label htmlFor="tier" className="mb-1.5 block">Tier</Label>
                <Select id="tier" value={data.tier} onChange={(e) => set("tier", e.target.value as Tier)}>
                  {(["early", "standard", "onsite"] as Tier[]).map((t) => (
                    <option key={t} value={t}>
                      {TIER_LABEL[t]}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </Section>

          <Section title="Schools (optional)" tone="emerald">
            <p className="text-sm text-muted mb-3">Pick the schools you want to attend on Feb 14.</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {SCHOOLS.map((s) => (
                <li key={s}>
                  <label className="flex items-start gap-3 p-3 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer">
                    <Checkbox checked={data.schools.includes(s)} onChange={() => toggleSchool(s)} className="mt-0.5" />
                    <span className="text-sm text-ink">{s}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Accompanying persons" tone="rose">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="mb-1.5 block">Number of accompanying persons</Label>
                <Select value={String(data.accompanying)} onChange={(e) => set("accompanying", parseInt(e.target.value, 10))}>
                  {[0, 1, 2, 3, 4].map((n) => (
                    <option key={n} value={n}>
                      {n === 0 ? "None" : `${n} person${n > 1 ? "s" : ""} (+ USD ${FEES.accompanying[data.tier] * n})`}
                    </option>
                  ))}
                </Select>
              </div>
              {data.accompanying > 0 && (
                <Field id="accompanyingNames" label="Accompanying names" value={data.accompanyingNames} onChange={(v) => set("accompanyingNames", v)} placeholder="Comma-separated" />
              )}
            </div>
          </Section>

          <Section title="Extras" tone="violet">
            <div className="space-y-4">
              <Field id="dietary" label="Dietary requirements" value={data.dietary} onChange={(v) => set("dietary", v)} placeholder="Vegetarian, halal, allergies, etc." />
              <label className="flex items-start gap-3">
                <Checkbox checked={data.visaLetter} onChange={(e) => set("visaLetter", e.target.checked)} className="mt-1" />
                <span className="text-sm text-ink">
                  I need an official invitation letter for visa application.
                </span>
              </label>
              <Field id="billing" label="Billing entity (for invoice)" value={data.billing} onChange={(v) => set("billing", v)} placeholder="Institution name + tax ID, if applicable" />
            </div>
          </Section>

          <Section title="Payment method" tone="brand">
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { value: "card", label: "Credit / debit card", desc: "Stripe-hosted checkout, link emailed after submission." },
                { value: "bank-transfer", label: "Bank transfer", desc: "Wire instructions emailed after submission." },
              ].map((p) => (
                <label
                  key={p.value}
                  className={
                    "p-4 rounded-md border cursor-pointer transition " +
                    (data.payment === p.value
                      ? "border-ink ring-2 ring-ink/10 bg-gray-50"
                      : "border-gray-200 hover:bg-gray-50")
                  }
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.value}
                    checked={data.payment === p.value}
                    onChange={() => set("payment", p.value as FormState["payment"])}
                    className="sr-only"
                  />
                  <div className="font-medium text-ink">{p.label}</div>
                  <div className="mt-1 text-xs text-muted">{p.desc}</div>
                </label>
              ))}
            </div>
          </Section>

          {/* Receipt upload as a regular form field */}
          <Section title="Payment receipt (optional)" tone="violet">
            <p className="text-sm text-muted mb-3">
              Already paid? Attach the bank-transfer slip or card receipt — PDF, JPG, PNG or
              WebP, up to 5&nbsp;MB.
            </p>

            {data.receipt ? (
              <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-md border border-violet-300 bg-violet-50">
                <div className="flex items-center gap-3 min-w-0">
                  <FileCheck2 className="h-5 w-5 text-violet-700 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{data.receipt.name}</div>
                    <div className="text-xs text-muted">
                      {(data.receipt.size / 1024).toFixed(1)} KB · {data.receipt.type || "file"}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => pickReceipt(null)}
                  aria-label="Remove file"
                  className="p-1 rounded-md text-muted hover:text-ink hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="receipt"
                className="flex flex-col items-center justify-center gap-2 px-4 py-7 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-violet-50/50 hover:border-violet-500 transition"
              >
                <Upload className="h-6 w-6 text-muted" />
                <div className="text-sm text-ink">Click to choose a file or drag &amp; drop</div>
                <div className="text-xs text-muted">PDF, JPG, PNG, or WebP — up to 5 MB</div>
                <Input
                  id="receipt"
                  name="receipt"
                  type="file"
                  accept={ACCEPT}
                  className="hidden"
                  onChange={(e) => pickReceipt(e.target.files?.[0] || null)}
                />
              </label>
            )}
          </Section>

          <Section title="Anything else?" tone="muted">
            <Textarea
              value={data.notes}
              onChange={(e) => set("notes", e.target.value)}
              rows={3}
              placeholder="Notes for the secretariat (optional)"
            />
          </Section>

          {/* Total + submit */}
          <div className="rounded-lg bg-gradient-to-br from-ink to-black text-white p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Total due</div>
              <div className="mt-1 font-mono text-3xl">USD {fee.toLocaleString()}</div>
              <div className="mt-1 text-xs text-white/60">
                {CATEGORY_LABEL[data.category]} · {TIER_LABEL[data.tier]}
                {data.accompanying > 0 && ` · +${data.accompanying} accompanying`}
                {data.receipt && " · receipt attached"}
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="bg-white text-ink hover:bg-gray-100"
            >
              {status === "submitting" ? "Submitting…" : "Submit registration"}
            </Button>
          </div>

          {status === "error" && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

const TONE: Record<string, string> = {
  blue: "bg-blue-500",
  amber: "bg-amber-500",
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  violet: "bg-violet-500",
  brand: "bg-orange-500",
  muted: "bg-gray-300",
};

function Section({
  title,
  tone,
  children,
}: {
  title: string;
  tone: keyof typeof TONE;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200 w-full">
        <span className={"inline-block h-2.5 w-2.5 rounded-full " + TONE[tone]} />
        <span className="font-serif text-lg font-bold text-ink">{title}</span>
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
