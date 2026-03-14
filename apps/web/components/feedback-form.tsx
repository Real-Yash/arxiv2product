"use client";

import { useState, useTransition } from "react";

import type { ScoreFeedbackResponse } from "@/lib/types";

export function FeedbackForm({
  reportId,
  userId
}: Readonly<{
  reportId: string;
  userId: string;
}>) {
  const [honestyRating, setHonestyRating] = useState("5");
  const [usefulnessRating, setUsefulnessRating] = useState("5");
  const [detailedFeedback, setDetailedFeedback] = useState("");
  const [result, setResult] = useState<ScoreFeedbackResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div id="feedback">
      <div className="mb-6">
        <span className="eyebrow">Feedback for credits</span>
        <h2 className="title-subsection mt-5">Earn more report generations</h2>
      </div>
      <form
        className="flex flex-col gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setError(null);
          startTransition(async () => {
            const response = await fetch("/api/feedback", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                reportId,
                userId,
                honestyRating: Number(honestyRating),
                usefulnessRating: Number(usefulnessRating),
                detailedFeedback
              })
            });

            if (!response.ok) {
              setResult(null);
              setError(await response.text());
              return;
            }

            setResult((await response.json()) as ScoreFeedbackResponse);
          });
        }}
      >
        <label className="field-group">
          <span className="field-label">How honest was this report about the idea quality?</span>
          <select className="input-base" value={honestyRating} onChange={(event) => setHonestyRating(event.target.value)}>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="field-group">
          <span className="field-label">How useful was it for actual product decisions?</span>
          <select
            className="input-base"
            value={usefulnessRating}
            onChange={(event) => setUsefulnessRating(event.target.value)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
        <label className="field-group">
          <span className="field-label">Concrete feedback</span>
          <textarea
            required
            className="input-base min-h-[120px] resize-y"
            placeholder="Point out weak assumptions, missing risks, fake market logic, or what actually made this useful."
            value={detailedFeedback}
            onChange={(event) => setDetailedFeedback(event.target.value)}
          />
        </label>
        <button className="btn-primary mt-2 w-full justify-center" type="submit" disabled={isPending}>
          {isPending ? "Scoring..." : "Submit feedback"}
        </button>
        {error ? <p className="helper-text text-red-500">Request failed: {error}</p> : null}
        {result ? (
          <div className="notice-card mt-4">
            <strong className="block text-lg">Feedback scored</strong>
            <div className="helper-text mt-3 space-y-1">
              <div>
                Overall score: <span className="font-semibold text-[color:var(--emerald)]">{result.score}</span>
              </div>
              <div>Honesty: {result.honestyScore}</div>
              <div>Usefulness: {result.usefulnessScore}</div>
              <div>Specificity: {result.specificityScore}</div>
              <div>
                Credits awarded: <span className="font-semibold">+{result.creditsAwarded}</span>
              </div>
            </div>
            <p className="helper-text mt-4 border-t pt-3">{result.rationale}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
}
