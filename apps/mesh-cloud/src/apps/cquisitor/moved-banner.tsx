import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export const CQUISITOR_HOME_URL = "https://cardananium.github.io/cquisitor/";
const REDIRECT_AFTER_SECONDS = 8;

/**
 * Notice shown on the legacy Mesh Cloud Cquisitor pages.
 * Counts down and sends the visitor to the original Cquisitor site,
 * with a button to go immediately and one to stay on this page.
 */
export function MovedBanner() {
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_AFTER_SECONDS);
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    if (cancelled) return;
    if (secondsLeft <= 0) {
      window.location.assign(CQUISITOR_HOME_URL);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, cancelled]);

  return (
    <Alert className="border-orange-500/50 bg-orange-500/10">
      <AlertTitle className="text-base">Cquisitor has moved</AlertTitle>
      <AlertDescription className="flex flex-col gap-3">
        <p>
          Cquisitor has returned to its original home and is maintained by its
          original author, Evgenii Lisitskii. This page is no longer updated.
        </p>
        <p aria-live="polite">
          {cancelled
            ? "Automatic redirect cancelled. You can continue here or open the new site below."
            : `Redirecting to the new site in ${secondsLeft} second${secondsLeft === 1 ? "" : "s"}…`}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <a href={CQUISITOR_HOME_URL}>Open Cquisitor now</a>
          </Button>
          {!cancelled && (
            <Button variant="outline" onClick={() => setCancelled(true)}>
              Stay on this page
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}
