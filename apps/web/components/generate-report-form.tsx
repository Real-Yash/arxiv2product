"use client";

import { useState, useTransition } from "react";

import type { CreateReportResponse } from "@/lib/types";

const initialState = {
  paperRef: "",
  model: ""
};

export function GenerateReportForm({
  userId
}: Readonly<{
  userId: string;
}>) {
  const [form, setForm] = useState(initialState);
  const [result, setResult] = useState<CreateReportResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <div className="mb-6">
        <span className="eyebrow">Generate a report</span>
        <h2 className="title-subsection mt-5">Turn any paper into a product brief</h2>
      </div>
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          startTransition(async () => {
            const response = await fetch("/api/reports", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                ...form,
                userId
              })
            });

            if (!response.ok) {
              setResult(null);
              setError(await response.text());
              return;
            }

            setResult((await response.json()) as CreateReportResponse);
            setForm(initialState);
          });
        }}
      >
        <label className="field-group">
          <span className="field-label">arXiv ID or URL</span>
          <input
            required
            className="input-base"
            placeholder="2603.08127 or https://arxiv.org/abs/2603.08127"
            value={form.paperRef}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                paperRef: event.target.value
              }))
            }
          />
        </label>
        <label className="field-group">
          <span className="field-label">Model override (optional)</span>
          <input
            className="input-base"
            placeholder="anthropic/claude-sonnet-4 or provider-native model"
            value={form.model}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                model: event.target.value
              }))
            }
          />
        </label>
        <button className="btn-primary mt-2 w-full justify-center" type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Start report"}
        </button>
        <p className="helper-text mt-2">
          In production this should be authenticated and server-side validated. For now the demo
          uses your current session or fallback reviewer identity.
        </p>
        {error ? <p className="helper-text text-red-500">Request failed: {error}</p> : null}
        {result ? (
          <div className="notice-card mt-4">
            <strong className="block text-lg">Job created</strong>
            <div className="helper-text mt-3 space-y-1">
              <div>
                Report ID: <span className="font-mono text-xs">{result.id}</span>
              </div>
              <div>
                Status: <span className="font-semibold text-[color:var(--emerald)]">{result.status}</span>
              </div>
              <div>Credits spent: {result.creditsSpent}</div>
            </div>
          </div>
        ) : null}
      </form>
    </div>
  );
}
