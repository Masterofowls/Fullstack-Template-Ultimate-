export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">About</h1>
      <div className="prose prose-slate max-w-none dark:prose-invert">
        <p className="text-slate-600 dark:text-slate-400">
          This is the Vite SPA portion of the advanced TypeScript React fullstack monorepo template.
          It shares UI components and utilities with the Next.js application via workspace packages.
        </p>
        <ul className="mt-4 space-y-2 text-slate-600 dark:text-slate-400">
          <li>
            Shared <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">@template/ui</code>{" "}
            components
          </li>
          <li>
            Shared{" "}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">@template/utils</code>{" "}
            helpers
          </li>
          <li>Biome linting + formatting</li>
          <li>Jest-compatible bun test runner</li>
        </ul>
      </div>
    </div>
  );
}
