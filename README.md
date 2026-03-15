# arxiv2product

Transforms arXiv research papers into company/product opportunity reports using a multi-agent AI pipeline.

## What It Does

The pipeline analyzes a research paper through 5 adversarial phases:

1. **Decomposer** — Extracts atomic technical primitives (building blocks, not just "key ideas")
2. **Pain Scanner** — Maps primitives to real market pain via web research
3. **Infrastructure Inversion** — Finds second-order problems that adoption creates
4. **Temporal Arbitrage** — Identifies time-limited build opportunities
5. **Red Team Destroyer** — Brutally attacks every idea; only survivors make the cut

Output: A ranked list of 4-6 company ideas with market analysis, moats, and first-90-days plans.

---

## Setup

```bash
cd cli
uv sync
cp .env.example .env   # fill in your API keys
```

**Required keys:**
- `AGENTICA_API_KEY` (default backend) — or use OpenRouter with `OPENROUTER_API_KEY`
- `SERPER_API_KEY` and/or `EXA_API_KEY` — for web search during pipeline phases

---

## Usage

### Basic: Generate a Report

```bash
cd cli

# From an arXiv ID
uv run arxiv2product 2603.09229

# From an arXiv URL
uv run arxiv2product https://arxiv.org/abs/2603.09229
```

Output: `products_2603_09229.md` — a markdown report with ranked company ideas.

### Topic Discovery Mode (PASA-style)

**When you don't have a specific paper yet.** Instead of an arXiv ID, pass a research topic:

```bash
# Enable topic discovery in .env
ENABLE_PAPER_SEARCH=1

# Then run with any topic
uv run arxiv2product "self-adapting language models"
uv run arxiv2product "quantum error correction for NISQ devices"
```

The pipeline will:
1. Run a PASA-style Crawler agent to find relevant papers (arXiv + web search)
2. Run a Selector agent to score and rank them
3. Pick the top paper and run the full 5-phase analysis

**When to use:** Early-stage exploration when you're researching a field, not a specific paper.

**Env vars:**
- `ENABLE_PAPER_SEARCH=1` — enable this mode (off by default)

---

### Competitor Intelligence Add-on

**When you have a report you care about.** Run deep competitive analysis on specific ideas:

```bash
# After generating a report, analyze its top ideas
uv run arxiv2product-compete products_2603_09229.md

# Analyze only specific ideas by rank
uv run arxiv2product-compete products_2603_09229.md --ideas 1,2

# Analyze a specific idea by name
uv run arxiv2product-compete products_2603_09229.md --idea "ModelGuard"
```

**Why post-pipeline?**
- Competitor research is expensive (API calls, browser automation)
- You may only care about ideas #1 and #2, not all 5
- The main pipeline is already long enough — no need to add 60-90s to every run
- Competitive data has a shorter shelf-life than technical analysis → should be refreshable independently

**What it does:**
- Identifies the competitive landscape (direct competitors, adjacent players, open-source alternatives)
- Deep-dives top 2 competitors (pricing, features, user complaints from G2/reviews)
- Mines sentiment from Reddit/HN
- Finds white space — what NO competitor does
- Reassesses whether the idea's moat is real or assumed

**Output:** `compete_products_2603_09229.md` — competitive intel appended to your report.

**Required keys:**
- `PARALLEL_API_KEY` — Parallel.ai search (broad web research)
- `TINYFISH_API_KEY` — Tinyfish browser automation (deep site crawling)

**Env vars:**
- `COMPETE_MAX_IDEAS=3` — max ideas to analyze (default: 3)
- `COMPETE_MAX_BROWSE_CALLS=4` — Tinyfish calls per idea (default: 4)

---

## API Service

Run as a local FastAPI service:

```bash
cd cli
uv run arxiv2product-api
# Runs on http://127.0.0.1:8010
```

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `GET` | `/dashboard/{userId}` | User's report history |
| `POST` | `/reports` | Create a report job (async) |
| `GET` | `/reports/{jobId}` | Poll report status/result |
| `POST` | `/feedback/score` | Submit feedback on a report |

### Example: Create a Report

```bash
curl -X POST http://127.0.0.1:8010/reports \
  -H "Content-Type: application/json" \
  -d '{"paperRef": "2603.09229", "userId": "user-123"}'
# Returns: {"id": "job-abc123", "status": "queued", ...}

# Poll for result
curl http://127.0.0.1:8010/reports/job-abc123
```

---

## Configuration

Copy `cli/.env.example` to `cli/.env` and configure:

### Execution Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `EXECUTION_BACKEND` | `agentica` | `agentica` or `openai_compatible` |
| `AGENTICA_API_KEY` | — | Required for Agentica backend |
| `OPENROUTER_API_KEY` | — | Required for OpenAI-compatible backend |
| `OPENAI_BASE_URL` | `https://openrouter.ai/api/v1` | API endpoint for OpenAI-compatible |
| `ARXIV2PRODUCT_MODEL` | `anthropic/claude-sonnet-4` | Model slug (OpenRouter format) |

### Search APIs (used during pipeline phases)

| Variable | Default | Description |
|----------|---------|-------------|
| `SERPER_API_KEY` | — | Serper (Google search) API key |
| `EXA_API_KEY` | — | Exa search API key |
| `SEARCH_PROVIDER_MODE` | `auto` | `auto`, `serper`, or `exa` |
| `SEARCH_NUM_RESULTS` | `3` | Results per query (max 10) |
| `SEARCH_TIMEOUT_SECONDS` | `8` | Search timeout |
| `SEARCH_MAX_CALLS_PER_AGENT` | `2` | Budget per agent instance |
| `SEARCH_ENABLE_FALLBACK` | `0` | Enable provider fallback chain |

### Pipeline Tuning

| Variable | Default | Description |
|----------|---------|-------------|
| `PIPELINE_SPEED_PROFILE` | `balanced` | `balanced` or `exhaustive` |
| `AGENT_PHASE_TIMEOUT_SECONDS` | `480` | Timeout per phase (Agentica) |
| `DIRECT_BACKEND_TIMEOUT_SECONDS` | `240` | Timeout per phase (direct backend) |
| `ENABLE_REDTEAM_SEARCH` | `0` | Enable live search during red team phase |
| `ENABLE_AGENT_LOGS` | `0` | Enable verbose agent logging |

### Add-ons

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_PAPER_SEARCH` | `0` | Enable PASA-style topic discovery |
| `PARALLEL_API_KEY` | — | Parallel.ai key for competitor intel |
| `TINYFISH_API_KEY` | — | Tinyfish key for competitor intel |
| `COMPETE_MAX_IDEAS` | `3` | Max ideas to analyze per compete run |
| `COMPETE_MAX_BROWSE_CALLS` | `4` | Tinyfish calls per idea |

---

## Tests

```bash
cd cli
uv run python -m unittest discover -s tests
```

---

## Repository Layout

```
.
├── README.md
├── AGENTS.md              # Repo guidelines for AI assistants
├── cli/
│   ├── .env.example       # Environment variable reference
│   ├── pyproject.toml     # Package definition
│   ├── agentica-docs.md   # Agentica framework reference
│   ├── main.py            # CLI entry point wrapper
│   ├── arxiv2product/     # Package source
│   │   ├── cli.py         # CLI orchestration
│   │   ├── pipeline.py    # Core 5-phase pipeline
│   │   ├── prompts.py     # Agent premises/prompts
│   │   ├── paper_search.py    # PASA-style topic discovery
│   │   ├── compete.py     # Competitor intel CLI
│   │   ├── compete_tools.py   # Parallel.ai + Tinyfish tools
│   │   ├── compete_prompts.py # Competitor intel prompt
│   │   ├── backend.py     # Execution backend abstraction
│   │   ├── research.py    # Web search (Serper/Exa)
│   │   ├── ingestion.py   # arXiv fetch + PDF parse
│   │   ├── reporting.py   # Markdown report builder
│   │   ├── service.py     # FastAPI service
│   │   └── ...
│   └── tests/             # Test suite
```

---

## When to Use What

| Goal | Command | Notes |
|------|---------|-------|
| Analyze a specific paper | `arxiv2product 2603.09229` | Standard 5-phase pipeline |
| Explore a research area | `ENABLE_PAPER_SEARCH=1 arxiv2product "topic"` | Finds best paper, then analyzes |
| Deep-dive on an idea | `arxiv2product-compete report.md --ideas 1,2` | Post-pipeline competitive intel |
| Run as a service | `arxiv2product-api` | FastAPI on port 8010 |

---

## License

MIT
