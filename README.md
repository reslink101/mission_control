# ⚕ Path Peptides — Mission Control

AI-powered healthcare CRM dashboard for managing physician networks, pipelines, compliance, and AI agent automation.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or pnpm / yarn)

### Install & Run

```bash
# 1. Clone the repository
git clone https://github.com/your-org/mission-control.git
cd mission-control

# 2. Install dependencies
npm install

# 3. Start the dev server (opens at http://localhost:5173)
npm run dev
```

### Production Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

---

## 📁 Project Structure

```
mission-control/
├── public/
│   └── index.html                  # Base HTML template
├── src/
│   ├── assets/                     # Static assets (images, icons)
│   ├── hooks/
│   │   ├── useRegistryFlash.ts     # Live-data table flash animation hook
│   │   └── useAutoScroll.ts        # Continuous auto-scroll hook
│   ├── data/
│   │   ├── mockData.ts             # All mock data, builder fns, static constants
│   │   └── mockResponses.ts        # AI bar responses (exact + keyword match)
│   ├── components/
│   │   ├── shared/
│   │   │   ├── IntelligenceAIBar.tsx  # Chat / AI command bar
│   │   │   ├── DonutChart.tsx         # Churn risk donut chart
│   │   │   ├── TierBar.tsx            # Account tier bar chart
│   │   │   └── ActionCard.tsx         # AI action review card
│   │   └── layout/
│   │       ├── Sidebar.tsx            # Navigation + dark mode toggle
│   │       └── Topbar.tsx             # Mobile menu trigger + screen title
│   ├── screens/
│   │   ├── CommandCenter.tsx          # Main dashboard (KPIs, feed, cross-sell)
│   │   ├── CrossEntityPipeline.tsx    # Kanban boards for all 3 entities
│   │   ├── AIActionsQueue.tsx         # Approve / reject AI action cards
│   │   ├── AgentConsole.tsx           # Monitor & trigger AI agents
│   │   ├── ComplianceAlerts.tsx       # License expiry monitoring
│   │   └── KlaviyoStatus.tsx          # Klaviyo ↔ Attio sync status
│   ├── styles/
│   │   └── global.css                 # Static responsive utility classes
│   ├── types.ts                       # Shared TypeScript interfaces
│   ├── App.tsx                        # Root component, theme & routing state
│   └── main.tsx                       # React DOM entry point
├── .gitignore
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

---

## 🛠 Tech Stack

| Layer      | Technology                           |
|------------|--------------------------------------|
| Framework  | React 18 + TypeScript                |
| Build tool | Vite 5                               |
| Styling    | Inline styles + global CSS utilities |
| State      | React `useState` / `useEffect`       |
| Data       | Static mock data (ready for API swap)|

---

## 🌙 Dark Mode

Toggle via the **sidebar** at the bottom-left. The entire palette is computed in `App.tsx` and passed as a `Theme` prop through the component tree — no external theming library required.

---

## 🔌 Connecting a Real Backend

All mock data lives in `src/data/mockData.ts` and `src/data/mockResponses.ts`.

To wire up a real API:
1. Replace the static exports in `mockData.ts` with `fetch` / `axios` calls inside React Query hooks (or SWR).
2. Replace `resolveResponse()` in `mockResponses.ts` with a call to your LLM endpoint.
3. Update the `Theme`-prop-based routing in `App.tsx` with React Router if multi-page navigation is needed.

---

## 📝 Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start Vite dev server (HMR)        |
| `npm run build`   | TypeScript check + production build|
| `npm run preview` | Preview production build locally   |
| `npm run lint`    | ESLint across `src/`               |

---

## 📄 License

MIT © Path Peptides
