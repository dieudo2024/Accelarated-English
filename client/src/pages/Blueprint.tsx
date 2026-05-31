import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Zap, BookOpen, Mic2, Globe } from "lucide-react";
import { Link } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CtaLegend from "@/components/CtaLegend";

interface Strategy {
  id: number;
  title: string;
  timeline: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
}

interface CorePillar {
  id: number;
  title: string;
  description: string;
  example: string;
}

export default function Blueprint(): React.JSX.Element {
  const strategies: Strategy[] = [
    {
      id: 1,
      title: "Target the Top 100 Words First",
      timeline: "Days 1–7",
      description: "Studies show that the top 100 high-frequency words make up roughly 50% of all written and spoken English.",
      details: [
        "Skip obscure vocabulary entirely",
        "Focus on basic pronouns: I, you, we, they",
        "Master essential verbs: is, are, have, do, go",
        "Learn structural connectors: and, but, because, with"
      ],
      icon: <Zap className="w-8 h-8 text-primary" />
    },
    {
      id: 2,
      title: "Master Functional Phrases",
      timeline: "Weeks 2–3",
      description: "Instead of stressing over complex verb tenses, memorize functional phrases as single units.",
      details: [
        "Learn phrases without processing grammar rules",
        "Master: 'Where is the...?'",
        "Practice: 'I would like...'",
        "Study: 'How do I...?' for instant communication"
      ],
      icon: <BookOpen className="w-8 h-8 text-primary" />
    },
    {
      id: 3,
      title: "Implement the Shadowing Technique",
      timeline: "Daily, starting Week 2",
      description: "Find short English audio clips with subtitles. Listen, pause, and immediately repeat out loud.",
      details: [
        "Use unscripted YouTube videos",
        "Try children's cartoons or podcasts",
        "Mimic exact rhythm, speed, and accent",
        "Rewire your mouth muscles and train your ear simultaneously"
      ],
      icon: <Mic2 className="w-8 h-8 text-primary" />
    },
    {
      id: 4,
      title: "Create a Micro-Immersion Bubble",
      timeline: "Ongoing",
      description: "You don't need to move to an English-speaking country to immerse yourself.",
      details: [
        "Change phone and computer OS to English",
        "Watch media with English audio and English subtitles only",
        "Never use your native language subtitles",
        "Narrate your daily actions out loud to yourself"
      ],
      icon: <Globe className="w-8 h-8 text-primary" />
    },
    {
      id: 5,
      title: "Force Real-Time Output",
      timeline: "Week 4 onward",
      description: "You will never learn to speak by only listening. Start speaking immediately.",
      details: [
        "Speak with real people or AI voice partners",
        "Accept that making mistakes is structural progress",
        "Your goal is to convey an idea, not be perfect",
        "Practice consistent daily conversation"
      ],
      icon: <Zap className="w-8 h-8 text-primary" />
    }
  ];

  const pillars: CorePillar[] = [
    {
      id: 1,
      title: "Subject-Verb-Object (SVO)",
      description: "Keep sentences simple and follow the SVO pattern.",
      example: '"I want coffee." "She likes music."'
    },
    {
      id: 2,
      title: "The Big Three Tenses",
      description: "Master these three tenses to survive 90% of daily conversations.",
      example: "Present Simple (I walk), Past Simple (I walked), Future Simple (I will walk)"
    },
    {
      id: 3,
      title: "Contextual Vocabulary",
      description: "Group new words by immediate utility rather than random categories.",
      example: "Tech terms, food, workspace items, daily interactions"
    },
    {
      id: 4,
      title: "Consistency Over Intensity",
      description: "Daily practice yields faster results than sporadic intensive sessions.",
      example: "20 minutes active speaking/listening daily > 4-hour session once a week"
    }
  ];

  const weeks = [
    { week: "Week 1", focus: "Foundation", content: "Top 100 words, basic tenses, SVO structure", id: 1 },
    { week: "Week 2", focus: "Fluency", content: "Functional phrases, shadowing, contextual vocab", id: 2 },
    { week: "Week 3", focus: "Immersion", content: "Micro-immersion bubble, real-time output start", id: 3 },
    { week: "Week 4", focus: "Mastery", content: "Confident speaking, complex ideas, refinement", id: 4 }
  ];

  return (
    <>
      <Header />
      <main>
        <section className="py-16">
          <div className="container max-w-4xl">
            <h1 className="text-4xl font-bold mb-6 font-playfair">Blueprint</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy) => (
                <Card key={strategy.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{strategy.icon}</div>
                    <div className="w-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold mb-1">{strategy.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                          <Clock className="w-4 h-4" />
                          <span>{strategy.timeline}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{strategy.description}</p>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {strategy.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Core Toolkit */}
        <section className="py-16 bg-secondary/20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-playfair">The Beginner's Core Toolkit</h2>
            <p className="text-muted-foreground mb-12">
              When you are starting out, keep your focus narrow to avoid burnout. Prioritize these foundational grammar pillars:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar) => (
                <Card key={pillar.id} className="p-6 border-l-4 border-l-secondary">
                  <h3 className="text-xl font-bold text-foreground mb-3 font-playfair">{pillar.title}</h3>
                  <p className="text-muted-foreground mb-3">{pillar.description}</p>
                  <div className="bg-primary/5 rounded p-3 border-l-2 border-primary">
                    <p className="text-sm font-mono text-primary italic">"{pillar.example}"</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 30-Day Structure */}
        <section className="py-16 bg-background">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-12 font-playfair">Your 30-Day Blueprint</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {weeks.map((w) => (
                <Link key={w.id} href={`/week/${w.id}`}>
                  <Card className="p-4 text-center hover:shadow-lg transition-shadow cursor-pointer">
                    <h3 className="text-lg font-bold text-primary mb-2">{w.week}</h3>
                    <p className="text-sm font-semibold text-foreground mb-2">{w.focus}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{w.content}</p>
                  </Card>
                </Link>
              ))}
            </div>

            <Card className="p-8 bg-primary/5 border-l-4 border-l-primary">
              <h3 className="font-bold text-foreground mb-4">Key Success Factors</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground"><strong>20 minutes daily</strong> beats 4 hours once a week</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground"><strong>Mistakes are progress</strong> — embrace errors as learning opportunities</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground"><strong>Active output beats passive input</strong> — speak from day one</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-foreground"><strong>Context matters</strong> — learn vocabulary by utility, not isolation</span>
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-b from-background to-primary/10">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-playfair">Ready to Transform Your English?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Follow this blueprint for 30 days and watch your English fluency skyrocket. Your journey to confident communication starts today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" title="Start: begin the 30‑day plan">Start</Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10" title="Review: see progress and analytics">Review</Button>
            </div>
            <div className="mt-4">
              <CtaLegend />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
