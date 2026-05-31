import React from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DAYS_DATA from "@/lib/days";
import { toEmbedUrl } from "@/lib/safeVideo";
import { Link } from "wouter";
import CtaLegend from "@/components/CtaLegend";

export default function Day() {
  const [match, params] = useRoute("/day/:id");
  const id = params?.id ? Number(params.id) : NaN;
  const day = DAYS_DATA.find((d: any) => d.day === id) || DAYS_DATA[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container max-w-3xl py-12">
        <Card className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">{day.title}</h1>
              <p className="text-sm text-muted-foreground">Day {day.day} • Week {day.week}</p>
            </div>
              <div className="space-x-2">
              <Link href={`/week/${day.week}`}>
                <Button variant="ghost">Back to Week</Button>
              </Link>
              <Link href="/progress">
                <Button variant="outline" title="Review: see progress for this course">Review</Button>
              </Link>
            </div>
          </div>
            <div className="mt-4">
              <CtaLegend />
            </div>

          <p className="text-muted-foreground mb-6">{day.description}</p>

          <h3 className="font-semibold mb-2">Focus</h3>
          <p className="mb-6">{day.focus}</p>

          <h3 className="font-semibold mb-2">Activities</h3>
          <details className="mb-6">
            <summary className="cursor-pointer text-sm font-semibold">Today's Activities</summary>
            <ul className="list-disc pl-5 mt-3">
              {day.activities.map((a: any, idx: number) => (
                <li key={idx} className="mb-2 text-foreground">{a}</li>
              ))}
            </ul>
          </details>

          {day.videoUrl && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Lesson Video</h3>
              <div className="aspect-video">
                {toEmbedUrl(day.videoUrl) ? (
                  <iframe title={`Day ${day.day} video`} src={toEmbedUrl(day.videoUrl) as string} className="w-full h-full" allowFullScreen />
                ) : (
                  <div className="p-4 text-sm text-muted-foreground">Video cannot be embedded. <Button onClick={() => window.open(day.videoUrl, "_blank")} size="sm">Open</Button></div>
                )}
              </div>
            </div>
          )}
        </Card>
      </main>
      <Footer />
    </div>
  );
}
