import { Landmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ROWS: { label: string; value: string }[] = [
  { label: "Beneficiary", value: "TBD" },
  { label: "Bank name", value: "TBD" },
  { label: "Bank address", value: "TBD" },
  { label: "Account number", value: "TBD" },
  { label: "IBAN", value: "TBD" },
  { label: "SWIFT / BIC", value: "TBD" },
  { label: "Currency", value: "USD" },
  { label: "Reference", value: "NetSciX2027 / <Registration ID> / <Last name>" },
];

export default function BankInfo() {
  return (
    <Card className="border-emerald-200/70 shadow-md">
      <div className="h-1.5 rounded-t-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-400" />
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge variant="emerald">Step 1 · Bank transfer</Badge>
          <Landmark className="h-5 w-5 text-emerald-700" />
        </div>
        <CardTitle className="mt-1">Bank account details</CardTitle>
        <CardDescription>
          Bank-transfer details will be confirmed before registration opens. Please always include
          the reference below so we can match your payment to your registration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
          {ROWS.map((r) => (
            <div key={r.label} className="grid grid-cols-3 gap-4 px-5 py-3 text-sm">
              <dt className="col-span-1 text-muted">{r.label}</dt>
              <dd className="col-span-2 font-mono text-ink">{r.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-xs text-muted">
          Your bank may charge a transfer fee. Please ensure the full amount in USD reaches the
          beneficiary account.
        </p>
      </CardContent>
    </Card>
  );
}
