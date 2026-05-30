import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, BookOpen, Mic2, Globe, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DAYS_DATA from "@/lib/days";

/**
 * Accelerated English Blueprint - Main Learning Platform
 * Design Philosophy: Modern Minimalism with Warm Accents
 * Color Palette: Warm cream background, terracotta accents, sage green secondary
 * Typography: Playfair Display (headings) + Inter (body)
 */



export default function Home() {
  const [selectedDay, setSelectedDay] = useState(1);
  const currentDay = DAYS_DATA.find((d) => d.day === selectedDay) || DAYS_DATA[0];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://d2xsxph8kpxj0f.cloudfront.net/310519663681527715/Jki8txSQgvPbcJXUJHvwPG/hero-english-blueprint-W5HUWothPq8Q9wQHd2xwWd.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent"></div>
        <div className="relative z-10 container max-w-4xl">
          <div className="space-y-6">
            <div className="space-y-3">
              <h1 className="text-6xl font-bold text-foreground leading-tight">
                Learn English <span className="text-primary">Faster</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                From absolute beginner to confident speaker in 30 days. High-frequency focus meets immediate output.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Start Your Journey
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Overview */}
      <section className="py-20 bg-background">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16 text-foreground">The Blueprint</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "High-Frequency Focus",
                description: "Master the top 100 words that make up 50% of English.",
              },
              {
                icon: MessageSquare,
                title: "Functional Phrases",
                description: "Learn phrases as single units for instant communication.",
              },
              {
                icon: Mic2,
                title: "Shadowing Technique",
                description: "Rewire your mouth and train your ear simultaneously.",
              },
              {
                icon: Globe,
                title: "Micro-Immersion",
                description: "Create an English bubble without leaving home.",
              },
              {
                icon: Zap,
                title: "Real-Time Output",
                description: "Speak from day one. Mistakes are progress.",
              },
              {
                icon: BookOpen,
                title: "Consistency",
                description: "20 minutes daily beats 4 hours once a week.",
              },
            ].map((item, idx) => (
              <Card key={idx} className="p-6 border-border hover:shadow-lg transition-shadow">
                <item.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 30-Day Roadmap */}
      <section className="py-20 bg-white/50">
        <div className="container max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">Your 30-Day Roadmap</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Each day builds on the previous one. Follow the structured activities and watch your English fluency grow.
          </p>

          <Tabs defaultValue="week1" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="week1">Week 1</TabsTrigger>
              <TabsTrigger value="week2">Week 2</TabsTrigger>
              <TabsTrigger value="week3">Week 3</TabsTrigger>
              <TabsTrigger value="week4">Week 4</TabsTrigger>
            </TabsList>

            {[1, 2, 3, 4].map((week) => (
              <TabsContent key={week} value={`week${week}`} className="space-y-4">
                <div className="grid gap-4">
                  {DAYS_DATA.filter((d) => d.week === week).map((day) => (
                    <Card
                      key={day.day}
                      className={`p-6 cursor-pointer border-2 transition-all ${
                        selectedDay === day.day
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedDay(day.day)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                              {day.day}
                            </span>
                            <h3 className="text-lg font-semibold text-foreground">{day.title}</h3>
                          </div>
                          <p className="text-muted-foreground text-sm">{day.description}</p>
                        </div>
                        <Play className="w-5 h-5 text-primary flex-shrink-0" />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Day Detail Section */}
      {selectedDay && (
        <section className="py-20 bg-background">
          <div className="container max-w-6xl">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left: Day Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary">Day {currentDay.day}</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">{currentDay.title}</h2>
                      <p className="text-muted-foreground">Week {currentDay.week}</p>
                    </div>
                  </div>
                  <p className="text-lg text-foreground leading-relaxed">{currentDay.description}</p>
                </div>

                {/* Video Section */}
                {currentDay.videoUrl && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-semibold text-foreground">Learning Video</h3>
                    <div className="aspect-video rounded-lg overflow-hidden border-2 border-border">
                      <iframe
                        width="100%"
                        height="100%"
                        src={currentDay.videoUrl}
                        title={currentDay.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Activities */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-foreground">Today's Activities</h3>
                  <div className="space-y-3">
                    {currentDay.activities.map((activity, idx) => (
                      <div key={idx} className="flex gap-4 p-4 bg-white/50 rounded-lg border border-border">
                        <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {idx + 1}
                        </div>
                        <p className="text-foreground">{activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Focus & Summary */}
              <div className="space-y-6">
                <Card className="p-6 border-primary bg-primary/5">
                  <h3 className="text-lg font-semibold text-foreground mb-3">Today's Focus</h3>
                  <p className="text-foreground leading-relaxed">{currentDay.focus}</p>
                </Card>

                <Card className="p-6 border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Quick Tips</h3>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Spend 20 minutes on this day's content</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Watch the video at least twice</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Practice speaking all activities aloud</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Record yourself for self-assessment</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Review previous days' content</span>
                    </li>
                  </ul>
                </Card>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6">
                  Mark Day {currentDay.day} Complete
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-4xl text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Transform Your English?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            The Accelerated English Blueprint combines proven language learning techniques with practical daily activities. Start today and speak with confidence in 30 days.
          </p>
          <Button size="lg" variant="secondary" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90">
            Begin Day 1 Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
