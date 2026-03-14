.PHONY: cli-sync cli-report api web web-install test

cli-sync:
	cd cli && uv sync

cli-report:
	cd cli && uv run arxiv2product $(PAPER) $(MODEL)

api:
	cd cli && uv run arxiv2product-api

web-install:
	cd apps/web && bun install

web:
	cd apps/web && bun run dev

test:
	cd cli && uv run python -m unittest discover -s tests
