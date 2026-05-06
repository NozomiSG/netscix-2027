"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, FileCheck2, Upload, X } from "lucide-react";
import { TOPICS, PRESENTATION_OPTIONS, type PresentationPref } from "@/lib/topics";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type FormState = {
  submittingAuthor: string;
  email: string;
  affiliation: string;
  country: string;
  coAuthors: string;
  title: string;
  abstract: string;
  keywords: string;
  topic: string;
  presentationPref: PresentationPref;
  funding: string;
  comments: string;
  originalWork: boolean;
  shareWithReviewers: boolean;
  file: File | null;
};

const INITIAL: FormState = {
  submittingAuthor: "",
  email: "",
  affiliation: "",
  country: "",
  coAuthors: "",
  title: "",
  abstract: "",
  keywords: "",
  topic: TOPICS[0],
  presentationPref: "either",
  funding: "",
  comments: "",
  originalWork: false,
  shareWithReviewers: true,
  file: null,
};

const MAX_BYTES = 5 * 1024 * 1024;

function wc(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function AbstractForm() {
  const [d, setD] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [error, setError] = useState("");
  const [resultId, setResultId] = useState("");

  const words = useMemo(() => wc(d.abstract), [d.abstract]);
  const wordsOk = words >= 50 && words <= 350;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setD((s) => ({ ...s, [key]: value }));
  }

  function pickFile(f: File | null) {
    if (f && f.size > MAX_BYTES) {
      setError("PDF is larger than 5 MB.");
      setStatus("error");
      return;
    }
    set("file", f);
    if (status === "error") {
      setStatus("idle");
      setError("");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!d.originalWork) {
      setError("Please confirm the originality declaration.");
      setStatus("error");
      return;
    }
    if (!wordsOk) {
      setError(`Abstract should be 50–350 words (currently ${words}).`);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const fd = new FormData();
      fd.append("submittingAuthor", d.submittingAuthor);
      fd.append("email", d.email);
      fd.append("affiliation", d.affiliation);
      fd.append("country", d.country);
      fd.append("coAuthors", d.coAuthors);
      fd.append("title", d.title);
      fd.append("abstract", d.abstract);
      fd.append("keywords", d.keywords);
      fd.append("topic", d.topic);
      fd.append("presentationPref", d.presentationPref);
      fd.append("funding", d.funding);
      fd.append("comments", d.comments);
      fd.append("originalWork", d.originalWork ? "true" : "false");
      fd.append("shareWithReviewers", d.shareWithReviewers ? "true" : "false");
      if (d.file) fd.append("file", d.file);

      const res = await fetch("/api/abstract", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Submission failed.");
        setStatus("error");
        return;
      }
      setResultId(json.id);
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
              <CardTitle>Abstract submitted</CardTitle>
              <CardDescription className="text-gray-700 mt-1">
                Thanks, {d.submittingAuthor}. Your submission ID is{" "}
                <span className="font-mono text-ink">{resultId}</span>. Keep this for your
                records — you&rsquo;ll need it when you register after acceptance. We&rsquo;ll
                email the program committee&rsquo;s decision by the notification deadline.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            onClick={() => {
              setD(INITIAL);
              setStatus("idle");
              setResultId("");
            }}
          >
            Submit another abstract
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-blue-200/70 shadow-md overflow-hidden">
      <div className="h-1.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="blue">Submission form</Badge>
          <CardTitle className="text-2xl">Submit an abstract</CardTitle>
        </div>
        <CardDescription>
          One abstract per submission. You can submit more than once if you have multiple works.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-10">
          <Section title="Submitting author" tone="blue">
            <div className="grid gap-4 md:grid-cols-2">
              <Field id="submittingAuthor" label="Full name" required value={d.submittingAuthor} onChange={(v) => set("submittingAuthor", v)} />
              <Field id="email" label="Email" type="email" required value={d.email} onChange={(v) => set("email", v)} />
              <Field id="affiliation" label="Affiliation" required value={d.affiliation} onChange={(v) => set("affiliation", v)} placeholder="Institution / lab" />
              <Field id="country" label="Country" required value={d.country} onChange={(v) => set("country", v)} />
            </div>
            <div className="mt-4">
              <Label htmlFor="coAuthors" className="mb-1.5 block">Co-authors (optional)</Label>
              <Textarea
                id="coAuthors"
                rows={3}
                value={d.coAuthors}
                onChange={(e) => set("coAuthors", e.target.value)}
                placeholder="One per line — e.g. Jane Doe (MIT), John Smith (ETH Zürich)"
              />
            </div>
          </Section>

          <Section title="Topic & format" tone="violet">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="topic" className="mb-1.5 block">Primary topic *</Label>
                <Select id="topic" value={d.topic} onChange={(e) => set("topic", e.target.value)}>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block">Presentation preference *</Label>
                <Select
                  value={d.presentationPref}
                  onChange={(e) => set("presentationPref", e.target.value as PresentationPref)}
                >
                  {PRESENTATION_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </Select>
                <p className="mt-1.5 text-xs text-muted">
                  {PRESENTATION_OPTIONS.find((o) => o.value === d.presentationPref)?.desc}
                </p>
              </div>
            </div>
          </Section>

          <Section title="Abstract" tone="amber">
            <div className="space-y-4">
              <Field
                id="title"
                label="Title"
                required
                value={d.title}
                onChange={(v) => set("title", v)}
                placeholder="Concise, descriptive title"
              />
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <Label htmlFor="abstract">Abstract text *</Label>
                  <span
                    className={
                      "text-xs font-mono " +
                      (wordsOk ? "text-emerald-700" : words === 0 ? "text-muted" : "text-amber-700")
                    }
                  >
                    {words} / 50–350 words
                  </span>
                </div>
                <Textarea
                  id="abstract"
                  rows={9}
                  required
                  value={d.abstract}
                  onChange={(e) => set("abstract", e.target.value)}
                  placeholder="State the question, the methods, the main findings, and the contribution."
                />
              </div>
              <Field
                id="keywords"
                label="Keywords"
                required
                value={d.keywords}
                onChange={(v) => set("keywords", v)}
                placeholder="3–6 keywords, comma-separated"
              />
            </div>
          </Section>

          <Section title="Optional details" tone="emerald">
            <div className="space-y-4">
              <Field
                id="funding"
                label="Funding & acknowledgements"
                value={d.funding}
                onChange={(v) => set("funding", v)}
                placeholder="Grant numbers or supporting institutions, if applicable"
              />
              <div>
                <Label htmlFor="comments" className="mb-1.5 block">Comments to the program committee</Label>
                <Textarea
                  id="comments"
                  rows={3}
                  value={d.comments}
                  onChange={(e) => set("comments", e.target.value)}
                  placeholder="Conflicts of interest, special requests, etc."
                />
              </div>
            </div>
          </Section>

          <Section title="Attach extended abstract / poster (optional)" tone="rose">
            <p className="text-sm text-muted mb-3">
              PDF only, max 5&nbsp;MB. Useful for extended abstracts, figures, or poster drafts.
            </p>
            {d.file ? (
              <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-md border border-rose-300 bg-rose-50">
                <div className="flex items-center gap-3 min-w-0">
                  <FileCheck2 className="h-5 w-5 text-rose-700 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{d.file.name}</div>
                    <div className="text-xs text-muted">{(d.file.size / 1024).toFixed(1)} KB · PDF</div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Remove file"
                  onClick={() => pickFile(null)}
                  className="p-1 rounded-md text-muted hover:text-ink hover:bg-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="abstract-file"
                className="flex flex-col items-center justify-center gap-2 px-4 py-7 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-rose-50/40 hover:border-rose-500 transition"
              >
                <Upload className="h-6 w-6 text-muted" />
                <div className="text-sm text-ink">Click to choose a PDF or drag &amp; drop</div>
                <div className="text-xs text-muted">PDF only · up to 5 MB</div>
                <Input
                  id="abstract-file"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => pickFile(e.target.files?.[0] || null)}
                />
              </label>
            )}
          </Section>

          <Section title="Declarations" tone="muted">
            <div className="space-y-3">
              <label className="flex items-start gap-3">
                <Checkbox
                  required
                  checked={d.originalWork}
                  onChange={(e) => set("originalWork", e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-ink">
                  This work is original and is not being considered for publication elsewhere
                  during the NetSciX 2027 review window. *
                </span>
              </label>
              <label className="flex items-start gap-3">
                <Checkbox
                  checked={d.shareWithReviewers}
                  onChange={(e) => set("shareWithReviewers", e.target.checked)}
                  className="mt-1"
                />
                <span className="text-sm text-ink">
                  I agree to share this submission, including any uploaded PDF, with the NetSciX
                  program committee for review.
                </span>
              </label>
            </div>
          </Section>

          <div className="rounded-lg bg-gradient-to-br from-ink to-black text-white p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Ready to submit?</div>
              <div className="mt-1 text-sm text-white/80">
                Make sure the abstract reads cleanly and the keywords match your topic.
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              className="bg-white text-ink hover:bg-gray-100"
            >
              {status === "submitting" ? "Submitting…" : "Submit abstract"}
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
