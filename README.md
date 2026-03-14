# arxiv2product

This repository is a plain monorepo workspace with two apps:

- [`cli/`](/home/ab916/src/arxiv2product/cli): the Python CLI and API service for generating product reports from scientific papers
- [`apps/web/`](/home/ab916/src/arxiv2product/apps/web): the Next.js frontend for browsing reports, generating new ones, and submitting feedback

The repo root is not a `uv` project anymore. Run Python commands from `cli/` and web commands from `apps/web/`.

## Workspace Commands

Use the root helper commands if you want one entrypoint:

```bash
make cli-sync
make api
make web
make test
```

Equivalent app-local commands:

```bash
cd cli
uv sync
uv run arxiv2product 2603.09229
uv run arxiv2product-api

cd ../apps/web
bun install
bun run dev
```

## Local Development

1. Copy [`cli/.env.example`](/home/ab916/src/arxiv2product/cli/.env.example) to `cli/.env` if you want a local Python env file.
2. Copy [`apps/web/.env.example`](/home/ab916/src/arxiv2product/apps/web/.env.example) to `apps/web/.env.local`.
3. Start the API from `cli/`.
4. Point `PIPELINE_API_BASE_URL` in `apps/web/.env.local` at `http://127.0.0.1:8010`.
5. Start the web app from `apps/web/`.

## Repository Layout

- `cli/`: Python package, tests, service, and CLI entrypoints
- `apps/web/`: web app
- `logs/`: generated logs, ignored
- `data/`: generated local data, ignored

## Notes

- Generated reports and runtime SQLite data stay out of version control.
- The Python package name remains `arxiv2product`; only its repo location changed.
