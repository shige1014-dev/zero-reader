"use client";

import { useState } from "react";

type Props = {
  techId: string;
  title: string;
};

export function ObserveButton({ techId, title }: Props) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function saveObservation() {
    setState("saving");
    try {
      const response = await fetch("/api/black-tech/observe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ techId })
      });

      if (!response.ok) throw new Error(await response.text());
      setState("saved");
    } catch {
      setState("error");
    }
  }

  const label =
    state === "saving"
      ? "暂存中"
      : state === "saved"
        ? "已观察"
        : state === "error"
          ? "重试"
          : "我观察到";

  return (
    <button
      type="button"
      className="blacktech-observe"
      onClick={saveObservation}
      disabled={state === "saving" || state === "saved"}
      aria-label={`把 ${title} 暂存到 OBI vault`}
    >
      {label}
    </button>
  );
}
