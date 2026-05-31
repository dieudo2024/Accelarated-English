import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Analytics = {
  total: number;
  mastered: number;
  due: number;
  reviews: number;
};

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Analytics | null>(null);
  const [boxCounts, setBoxCounts] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const resp = await fetch("/api/analytics");
        const data = await resp.json();
        if (!mounted) return;
        setStats(data);

        const deckResp = await fetch("/api/deck?user=local");
        const deck = await deckResp.json();
        if (!mounted) return;
        const counts: Record<string, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        for (const d of deck) counts[String(d.box)] = (counts[String(d.box)] || 0) + 1;
        setBoxCounts(counts);
      } catch (e) {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-12">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">Mastery Analytics</h1>

          <Card className="p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="text-xs uppercase text-muted-foreground">Total words</div>
                <div className="text-2xl font-bold">{loading ? "—" : stats?.total ?? 0}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Mastered (Box 5)</div>
                <div className="text-2xl font-bold">{loading ? "—" : stats?.mastered ?? 0}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Due now</div>
                <div className="text-2xl font-bold">{loading ? "—" : stats?.due ?? 0}</div>
              </div>
              <div>
                <div className="text-xs uppercase text-muted-foreground">Reviews</div>
                <div className="text-2xl font-bold">{loading ? "—" : stats?.reviews ?? 0}</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="font-bold mb-3">Leitner Distribution</h2>
            {loading ? (
              <p className="text-muted-foreground">Loading...</p>
            ) : (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((b) => (
                  <div key={b} className="flex items-center gap-3">
                    <div className="w-16">Box {b}</div>
                    <div className="flex-1 bg-muted h-4 rounded overflow-hidden">
                      <div
                        style={{ width: `${((boxCounts?.[String(b)] ?? 0) / Math.max(1, stats?.total ?? 1)) * 100}%` }}
                        className="h-4 bg-primary"
                      />
                    </div>
                    <div className="w-12 text-right">{boxCounts?.[String(b)] ?? 0}</div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <div className="flex gap-2">
            <Button onClick={() => location.reload()}>Refresh</Button>
            <Button variant="outline" onClick={async () => { await fetch('/api/analytics'); location.reload(); }}>Fetch</Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
