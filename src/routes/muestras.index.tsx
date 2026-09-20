import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/muestras/")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "muestras", statusCode: 301 });
  },
});
