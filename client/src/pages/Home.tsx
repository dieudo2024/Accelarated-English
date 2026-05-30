import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, BookOpen, Mic2, Globe, MessageSquare, Zap } from "lucide-react";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/**
 * Accelerated English Blueprint - Main Learning Platform
 * Design Philosophy: Modern Minimalism with Warm Accents
 * Color Palette: Warm cream background, terracotta accents, sage green secondary
 * Typography: Playfair Display (headings) + Inter (body)
 */

interface DayContent {
  day: number;
  week: number;
  title: string;
  description: string;
  activities: string[];
  videoUrl?: string;
  focus: string;
}

const DAYS_DATA: DayContent[] = [
  {
    day: 1,
    week: 1,
    title: "Foundation: Top 100 Words",
    description: "Master the 100 most common English words that make up 50% of all spoken English.",
    activities: [
      "Learn 20 high-frequency pronouns and verbs",
      "Practice pronunciation with shadowing",
      "Create flashcards for daily review",
      "Narrate 3 daily actions in English",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Pronouns (I, you, we, they) & Essential Verbs (is, are, have, do, go)",
  },
  {
    day: 2,
    week: 1,
    title: "Structural Connectors",
    description: "Learn the connecting words that hold sentences together.",
    activities: [
      "Study 15 structural connectors (and, but, because, with)",
      "Build simple sentences using connectors",
      "Listen to native speakers using these words",
      "Write 5 sentences with each connector",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Connectors: and, but, because, with, or, if, when",
  },
  {
    day: 3,
    week: 1,
    title: "Present Simple Tense",
    description: "Master the most frequently used tense in English conversation.",
    activities: [
      "Learn Present Simple formation and usage",
      "Practice with 20 common verbs",
      "Create affirmative, negative, and question sentences",
      "Shadowing exercise: 10 minutes of native speech",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Present Simple: I walk, you go, she likes",
  },
  {
    day: 4,
    week: 1,
    title: "Past Simple Tense",
    description: "Learn to talk about completed actions and past events.",
    activities: [
      "Study irregular and regular past tense verbs",
      "Practice 25 common past tense forms",
      "Tell 5 simple stories about your day",
      "Listen to past tense in context",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Past Simple: I walked, you went, she liked",
  },
  {
    day: 5,
    week: 1,
    title: "Future Simple Tense",
    description: "Express plans, predictions, and future intentions.",
    activities: [
      "Learn 'will' and 'going to' structures",
      "Practice 20 future tense sentences",
      "Discuss your plans for the week",
      "Shadowing: Future tense expressions",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Future Simple: I will walk, you're going to go",
  },
  {
    day: 6,
    week: 1,
    title: "Subject-Verb-Object Sentences",
    description: "Build simple, clear sentences with proper structure.",
    activities: [
      "Master SVO sentence construction",
      "Create 30 simple sentences",
      "Practice with different subjects and objects",
      "Speak 10 SVO sentences aloud",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "SVO: I want coffee. She likes music.",
  },
  {
    day: 7,
    week: 1,
    title: "Week 1 Review & Consolidation",
    description: "Review all Week 1 content and practice integrated skills.",
    activities: [
      "Review all 100 high-frequency words",
      "Practice all three tenses in context",
      "Record yourself speaking for 5 minutes",
      "Complete a comprehension quiz",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Integration: Combine all Week 1 concepts",
  },
  {
    day: 8,
    week: 2,
    title: "Functional Phrases: Introductions",
    description: "Master essential phrases for meeting and greeting.",
    activities: [
      "Learn 15 greeting and introduction phrases",
      "Practice: 'Where is...?', 'How are you?'",
      "Role-play introductions",
      "Shadowing: Native speaker introductions",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Phrases: 'Hello, my name is...', 'Nice to meet you'",
  },
  {
    day: 9,
    week: 2,
    title: "Functional Phrases: Requests & Questions",
    description: "Learn how to ask for things and get information.",
    activities: [
      "Master 'Where is...?', 'How do I...?', 'Can I...?'",
      "Practice polite request phrases",
      "Create 20 question sentences",
      "Shadowing: Question intonation",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Phrases: 'Where is...?', 'How do I...?', 'I would like...'",
  },
  {
    day: 10,
    week: 2,
    title: "Functional Phrases: Daily Conversations",
    description: "Learn phrases for everyday interactions.",
    activities: [
      "Study 20 common daily conversation phrases",
      "Practice ordering food, asking for directions",
      "Role-play common scenarios",
      "Shadowing: Conversational speech",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Phrases: 'What time is it?', 'How much?', 'Thank you'",
  },
  {
    day: 11,
    week: 2,
    title: "Shadowing Technique Mastery",
    description: "Perfect your shadowing technique for fluency.",
    activities: [
      "15 minutes of scripted shadowing",
      "10 minutes of audio-only shadowing",
      "Record and compare your output",
      "Focus on rhythm and intonation",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Shadowing: Mimic rhythm, speed, and accent",
  },
  {
    day: 12,
    week: 2,
    title: "Contextual Vocabulary: Food & Dining",
    description: "Learn vocabulary for food and restaurant situations.",
    activities: [
      "Learn 30 food-related vocabulary words",
      "Practice ordering at a restaurant",
      "Describe your favorite foods",
      "Shadowing: Restaurant dialogues",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Vocabulary: Food, drinks, dining phrases",
  },
  {
    day: 13,
    week: 2,
    title: "Contextual Vocabulary: Work & Technology",
    description: "Learn professional and tech-related vocabulary.",
    activities: [
      "Learn 30 workplace vocabulary words",
      "Practice tech-related conversations",
      "Describe your job or field",
      "Shadowing: Professional dialogues",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Vocabulary: Work, tech, professional terms",
  },
  {
    day: 14,
    week: 2,
    title: "Week 2 Review & Real-Time Output",
    description: "Review Week 2 and begin real-time speaking practice.",
    activities: [
      "Review all functional phrases",
      "Practice with AI voice partner (simulated)",
      "Record 5-minute conversation",
      "Evaluate your progress",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Integration: Functional phrases + real output",
  },
  {
    day: 15,
    week: 3,
    title: "Micro-Immersion: Phone Setup",
    description: "Create your micro-immersion bubble.",
    activities: [
      "Change phone OS language to English",
      "Install English learning apps",
      "Set up English notifications",
      "Watch 20 minutes of English media with subtitles",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Immersion: Change device settings to English",
  },
  {
    day: 16,
    week: 3,
    title: "Micro-Immersion: Media Consumption",
    description: "Immerse yourself in English content.",
    activities: [
      "Watch 30 minutes of English video with English subtitles",
      "Choose content at your level (children's shows, podcasts)",
      "Take notes on new words",
      "Narrate 10 minutes of your daily actions aloud",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Immersion: English audio + English subtitles",
  },
  {
    day: 17,
    week: 3,
    title: "Real-Time Output: Speaking Practice",
    description: "Start speaking with real people or AI partners.",
    activities: [
      "30-minute conversation practice (AI or language partner)",
      "Focus on expressing ideas, not perfection",
      "Record and review your speech",
      "Identify areas for improvement",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Output: Speak, make mistakes, learn",
  },
  {
    day: 18,
    week: 3,
    title: "Real-Time Output: Confidence Building",
    description: "Build confidence through consistent speaking.",
    activities: [
      "30-minute conversation practice",
      "Try new topics and vocabulary",
      "Ask for corrections and feedback",
      "Celebrate small wins",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Output: Build fluency through repetition",
  },
  {
    day: 19,
    week: 3,
    title: "Consistency Check: Daily Routine",
    description: "Establish a sustainable daily learning routine.",
    activities: [
      "20 minutes: Shadowing practice",
      "15 minutes: Vocabulary review",
      "20 minutes: Speaking practice",
      "Reflect on your progress",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Consistency: 20 minutes daily beats 4 hours once",
  },
  {
    day: 20,
    week: 3,
    title: "Advanced Phrases: Opinions & Preferences",
    description: "Express your thoughts and preferences.",
    activities: [
      "Learn 20 opinion and preference phrases",
      "Practice: 'I think...', 'I prefer...', 'I like...'",
      "Discuss your opinions on various topics",
      "Shadowing: Opinion expressions",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Phrases: 'I think...', 'I prefer...', 'I believe...'",
  },
  {
    day: 21,
    week: 3,
    title: "Week 3 Review & Integration",
    description: "Review all three weeks and integrate all skills.",
    activities: [
      "Review vocabulary from all three weeks",
      "Practice all three tenses in context",
      "30-minute conversation practice",
      "Evaluate overall progress",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Integration: Combine all skills learned",
  },
  {
    day: 22,
    week: 4,
    title: "Listening Comprehension: Unscripted Speech",
    description: "Train your ear for natural, unscripted English.",
    activities: [
      "Listen to unscripted YouTube videos (5 minutes)",
      "Identify familiar words and phrases",
      "Watch with English subtitles",
      "Repeat key phrases",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Listening: Unscripted, natural speech",
  },
  {
    day: 23,
    week: 4,
    title: "Listening Comprehension: Podcasts & Audiobooks",
    description: "Expand listening to diverse content.",
    activities: [
      "Listen to English podcast (15 minutes)",
      "Choose beginner-friendly content",
      "Take notes on new vocabulary",
      "Repeat difficult phrases",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Listening: Podcasts, audiobooks, natural speech",
  },
  {
    day: 24,
    week: 4,
    title: "Speaking Fluency: Storytelling",
    description: "Practice speaking through storytelling.",
    activities: [
      "Tell a 5-minute story about your day",
      "Use all three tenses naturally",
      "Record and review your speech",
      "Identify areas for improvement",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Speaking: Tell stories naturally",
  },
  {
    day: 25,
    week: 4,
    title: "Speaking Fluency: Debates & Discussions",
    description: "Engage in more complex conversations.",
    activities: [
      "Discuss a topic with a language partner",
      "Express and defend your opinions",
      "Ask follow-up questions",
      "Record and analyze your speech",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Speaking: Debate, discuss, express opinions",
  },
  {
    day: 26,
    week: 4,
    title: "Vocabulary Expansion: Advanced Topics",
    description: "Learn vocabulary for more complex topics.",
    activities: [
      "Learn 30 new vocabulary words on a topic of interest",
      "Read simple articles on that topic",
      "Discuss the topic in conversation",
      "Create a personal vocabulary list",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Vocabulary: Topic-based, contextual learning",
  },
  {
    day: 27,
    week: 4,
    title: "Grammar in Context: Complex Sentences",
    description: "Learn to form more complex sentences.",
    activities: [
      "Study conditional sentences (if...then)",
      "Learn relative clauses (who, which, that)",
      "Practice in conversation",
      "Write 10 complex sentences",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Grammar: Conditionals, relative clauses",
  },
  {
    day: 28,
    week: 4,
    title: "Pronunciation & Accent Training",
    description: "Refine your pronunciation and accent.",
    activities: [
      "Focus on difficult English sounds",
      "Shadowing: 20 minutes on pronunciation",
      "Record and compare with native speaker",
      "Practice word stress and intonation",
    ],
    videoUrl: "https://www.youtube.com/embed/ZG_OtQD2XuY",
    focus: "Pronunciation: Sounds, stress, intonation",
  },
  {
    day: 29,
    week: 4,
    title: "Comprehensive Review & Assessment",
    description: "Review all 30 days of learning.",
    activities: [
      "Complete a comprehensive vocabulary test",
      "Record a 10-minute conversation",
      "Evaluate your progress across all areas",
      "Identify remaining challenges",
    ],
    videoUrl: "https://www.youtube.com/embed/OP5YABLFy7s",
    focus: "Review: Assess all skills learned",
  },
  {
    day: 30,
    week: 4,
    title: "Celebration & Next Steps",
    description: "Celebrate your progress and plan your future learning.",
    activities: [
      "Reflect on your 30-day journey",
      "Record a final 5-minute speech",
      "Plan your next learning phase",
      "Set new goals for continued growth",
    ],
    videoUrl: "https://www.youtube.com/embed/hWYiI4euoDM",
    focus: "Celebration: You've built a foundation!",
  },
];

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
