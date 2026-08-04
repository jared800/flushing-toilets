import { createRouter, useRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { AppErrorComponent } from "./lib/error-component";

function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-4 text-center">
      <p className="font-display text-4xl font-semibold text-harbor">404</p>
      <p className="text-fg-muted">This page is not part of the brand guide.</p>
      <button
        type="button"
        onClick={() => router.navigate({ to: "/" })}
        className="rounded-lg bg-harbor px-4 py-2 text-sm font-medium text-bg-elevated"
      >
        Back to brand system
      </button>
    </div>
  );
}

export function getRouter() {
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: NotFoundPage,
  });
  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
