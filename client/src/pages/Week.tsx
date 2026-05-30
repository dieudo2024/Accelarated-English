import React from "react";
import { useRoute, Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DAYS_DATA from "@/lib/days";

export default function Week() {
  const [match, params] = useRoute("/week/:num");
  const weekNum = params?.num ? Number(params.num) : 1;
  const days = DAYS_DATA.filter((d) => d.week === weekNum);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="container max-w-4xl py-12">
        <h1 className="text-3xl font-bold mb-6">Week {weekNum}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {days.map((d) => (
            <Card key={d.day} className="p-4">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h2 className="font-semibold">Day {d.day}</h2>
                    <p className="text-sm text-muted-foreground">{d.title}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">Week {d.week}</div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{d.description}</p>

                <div className="mt-auto flex gap-2">
                  <Link href={`/day/${d.day}`}>
                    <Button className="w-full">Open Day</Button>
                  </Link>
                  <Link href="/progress">
                    <Button variant="ghost">Progress</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
