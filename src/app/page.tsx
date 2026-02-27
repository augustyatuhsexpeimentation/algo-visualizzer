import Link from "next/link";

const features = [
  {
    title: "Sorting Algorithms",
    description:
      "Visualize Bubble Sort, Merge Sort, and Quick Sort with animated bar charts and step-by-step execution.",
    href: "/sorting",
    icon: "📊",
    color: "from-indigo-500 to-purple-600",
  },
  {
    title: "Graph Algorithms",
    description:
      "Explore BFS, DFS, and Dijkstra's algorithm on interactive graphs you can build yourself.",
    href: "/graph",
    icon: "🔗",
    color: "from-emerald-500 to-cyan-600",
  },
];

const highlights = [
  "Step-by-step animation engine",
  "Pause, resume & speed control",
  "Pseudocode with active-line highlighting",
  "Time & space complexity display",
  "Custom graph builder",
  "Dark mode support",
  "Keyboard shortcuts",
  "Fully responsive design",
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
          Interactive Learning Tool
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          Algorithm{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Visualizer
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-500 dark:text-slate-400">
          Watch algorithms come to life. Understand sorting and graph algorithms
          through interactive, step-by-step visualizations with real-time
          pseudocode highlighting.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/sorting"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Start Exploring
          </Link>
          <Link
            href="/graph"
            className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Graph Algorithms
          </Link>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature) => (
          <Link
            key={feature.href}
            href={feature.href}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`}
            />
            <div className="mb-4 text-4xl">{feature.icon}</div>
            <h2 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
              {feature.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {feature.description}
            </p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
              Explore →
            </div>
          </Link>
        ))}
      </div>

      {/* Highlights */}
      <div className="text-center">
        <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
          Features
        </h2>
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {highlights.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}