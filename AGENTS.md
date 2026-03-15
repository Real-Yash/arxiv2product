# Repository Guidelines

## Project Structure
Single Python app in `cli/`, with package code under `cli/arxiv2product/` and tests under `cli/tests/`. Generated reports, logs, and local SQLite data stay out of version control.

## Build, Test, and Development Commands

- `cd cli && uv sync`: install/update the Python environment.
- `cd cli && uv run arxiv2product 2603.09229`: generate a report from an arXiv ID.
- `cd cli && uv run arxiv2product "topic string"`: PASA-style topic discovery (requires `ENABLE_PAPER_SEARCH=1`).
- `cd cli && uv run arxiv2product-api`: start the local Python API service.
- `cd cli && uv run arxiv2product-compete report.md --ideas 1,2`: run competitor intel on specific ideas from a report.
- `cd cli && uv run python -m unittest discover -s tests`: run the Python test suite.

## Coding Style & Naming Conventions
Follow existing Python conventions in `cli/arxiv2product/`: 4-space indentation, type hints on public functions, `snake_case` for functions/variables, `UPPER_SNAKE_CASE` for prompt constants. Keep orchestration async.

## Agentica Framework
Reference docs: `cli/agentica-docs.md`. Uses `spawn` + `agent.call(str, prompt)` pattern. Model names must be valid OpenRouter slugs.

## Testing Guidelines
Python tests live in `cli/tests/` and use `unittest`. Add new test files as `test_<feature>.py`. Prefer mocked network/model calls for pipeline and service coverage.

## Commit & Pull Request Guidelines
Use short imperative commit subjects. Keep commits scoped to one concern.

## Configuration
Environment examples live in `cli/.env.example`. Do not add Python package-manager metadata at the repo root.

## Key Modules

- `pipeline.py` — Core 5-phase pipeline (Decomposer → Pain Scanner → Infra Inversion → Temporal → Red Team → Synthesizer)
- `prompts.py` — All agent premises as `UPPER_SNAKE_CASE` constants
- `paper_search.py` — PASA-style topic discovery (Crawler + Selector agents)
- `compete.py` — Post-pipeline competitor intelligence CLI
- `compete_tools.py` — Parallel.ai search + Tinyfish browse tools
- `research.py` — Web search (Serper/Exa) with budget enforcement
- `backend.py` — Execution backend abstraction (Agentica vs OpenAI-compatible)
