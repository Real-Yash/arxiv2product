# Repository Guidelines

## Project Structure & Module Organization
This repository is a plain monorepo workspace, not a root `uv` project. The Python CLI/API app lives in [`cli/`](/home/ab916/src/arxiv2product/cli), with package code under [`cli/arxiv2product/`](/home/ab916/src/arxiv2product/cli/arxiv2product) and tests under [`cli/tests/`](/home/ab916/src/arxiv2product/cli/tests). The Next.js frontend lives in [`apps/web/`](/home/ab916/src/arxiv2product/apps/web). Generated reports, logs, and local SQLite data should stay out of version control.

## Build, Test, and Development Commands
Run commands from the app you are working on:

- `cd cli && uv sync`: install/update the Python environment.
- `cd cli && uv run arxiv2product 2603.09229`: generate a report from an arXiv ID.
- `cd cli && uv run arxiv2product-api`: start the local Python API service.
- `cd cli && python -m unittest discover -s tests`: run the Python test suite.
- `cd apps/web && bun install`: install web dependencies.
- `cd apps/web && bun run dev`: start the frontend locally.

Root helpers exist via [`Makefile`](/home/ab916/src/arxiv2product/Makefile): `make cli-sync`, `make api`, `make web`, and `make test`.

## Coding Style & Naming Conventions
Follow existing Python conventions in [`cli/arxiv2product/`](/home/ab916/src/arxiv2product/cli/arxiv2product): 4-space indentation, type hints on public functions, `snake_case` for functions/variables, and `UPPER_SNAKE_CASE` for prompt constants. Keep orchestration async where it already is. In the web app, preserve the current App Router + TypeScript structure and keep UI changes consistent with the established design system in [`apps/web/app/globals.css`](/home/ab916/src/arxiv2product/apps/web/app/globals.css).

## Testing Guidelines
Python tests live in [`cli/tests/`](/home/ab916/src/arxiv2product/cli/tests) and use `unittest`. Add new test files as `test_<feature>.py`. Prefer mocked network/model calls for pipeline and service coverage. For web changes, at minimum run `./node_modules/.bin/tsc --noEmit` from [`apps/web/`](/home/ab916/src/arxiv2product/apps/web) before shipping.

## Commit & Pull Request Guidelines
Use short imperative commit subjects such as `Move Python app into cli workspace` or `Simplify dashboard layout`. Keep commits scoped to one concern. Pull requests should include: purpose, key structural changes, local verification commands, and screenshots for notable UI updates.

## Configuration Notes
Python environment examples now live in [`cli/.env.example`](/home/ab916/src/arxiv2product/cli/.env.example). Web environment examples live in [`apps/web/.env.example`](/home/ab916/src/arxiv2product/apps/web/.env.example). Do not reintroduce Python package-manager metadata at the repo root.
