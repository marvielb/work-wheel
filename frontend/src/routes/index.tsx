import { MainLayout } from "@/components/Layout";
import { RootRoute, Router } from "@tanstack/react-router";

const rootRoute = new RootRoute({
  component: MainLayout,
});

const routeTree = rootRoute.addChildren([]);

export const router = new Router({ routeTree });
