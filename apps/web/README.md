# arxiv2product web

This is the Next.js product surface for the `arxiv2product` pipeline.

## Run locally

```bash
cd apps/web
bun install
bun run dev
```

For live jobs, run the Python API from [`../cli`](/home/ab916/src/arxiv2product/cli):

```bash
cd ../cli
uv sync
uv run arxiv2product-api
```

Then set `PIPELINE_API_BASE_URL=http://127.0.0.1:8010` in `apps/web/.env.local`. Without it, the app falls back to demo data so the UI still renders.

## Pages

- `/` landing page
- `/dashboard` report queue, credits, and feedback
- `/reports/[jobId]` report detail and reviewer feedback

## Backend contract

The app expects these Python endpoints:

- `GET /health`
- `GET /dashboard/{userId}`
- `POST /reports`
- `GET /reports/{jobId}`
- `POST /feedback/score`
