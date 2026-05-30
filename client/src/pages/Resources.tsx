import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Mic2, MessageSquare, Download, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface VocabList {
  id: number;
  title: string;
  category: string;
  words: { word: string; pronunciation: string; example: string }[];
}

interface PhrasBank {
  id: number;
  title: string;
  context: string;
  phrases: { phrase: string; usage: string }[];
}

interface AudioResource {
  id: number;
  title: string;
  type: string;
  duration: string;
  level: string;
  description: string;
  url: string;
}

export default function Resources(): React.ReactNode {
  const [activeTab, setActiveTab] = useState("vocab");

  const vocabularyLists: VocabList[] = [
    {
      id: 1,
      title: "Top 100 High-Frequency Words",
      category: "Foundation",
      words: [
        { word: "the", pronunciation: "ðə", example: "The book is here" },
        { word: "be", pronunciation: "bi", example: "I am happy" },
        { word: "to", pronunciation: "tu", example: "I want to go" },
        { word: "of", pronunciation: "əv", example: "Cup of tea" },
        { word: "and", pronunciation: "ænd", example: "You and me" }
      ]
    },
    {
      id: 2,
      title: "Food & Dining",
      category: "Contextual",
      words: [
        { word: "water", pronunciation: "ˈwɔːtər", example: "I need water" },
        { word: "coffee", pronunciation: "ˈkɔːfi", example: "Can I have coffee?" },
        { word: "food", pronunciation: "fuːd", example: "The food is delicious" },
        { word: "restaurant", pronunciation: "ˈrestrɔːnt", example: "Let's go to a restaurant" },
        { word: "menu", pronunciation: "ˈmenjuː", example: "May I see the menu?" }
      ]
    },
    {
      id: 3,
      title: "Workplace & Technology",
      category: "Contextual",
      words: [
        { word: "computer", pronunciation: "kəmˈpjuːtər", example: "I work on a computer" },
        { word: "email", pronunciation: "ˈiːmeɪl", example: "Send me an email" },
        { word: "meeting", pronunciation: "ˈmiːtɪŋ", example: "We have a meeting at 3" },
        { word: "deadline", pronunciation: "ˈdedlaɪn", example: "The deadline is Friday" },
        { word: "project", pronunciation: "ˈprɑːdʒekt", example: "I am working on a project" }
      ]
    },
    {
      id: 4,
      title: "Essential Verbs",
      category: "Grammar",
      words: [
        { word: "have", pronunciation: "hæv", example: "I have a book" },
        { word: "do", pronunciation: "duː", example: "What do you do?" },
        { word: "go", pronunciation: "ɡoʊ", example: "Let's go home" },
        { word: "make", pronunciation: "meɪk", example: "Make a coffee" },
        { word: "get", pronunciation: "ɡet", example: "I need to get milk" }
      ]
    }
  ];

  const phraseBanks: PhrasBank[] = [
    {
      id: 1,
      title: "Greetings & Introductions",
      context: "Meeting people for the first time",
      phrases: [
        { phrase: "Hello, my name is...", usage: "Introduction" },
        { phrase: "Nice to meet you", usage: "Greeting" },
        { phrase: "How are you?", usage: "Casual greeting" },
        { phrase: "What is your name?", usage: "Asking for name" },
        { phrase: "Where are you from?", usage: "Getting to know someone" }
      ]
    },
    {
      id: 2,
      title: "Asking for Information",
      context: "Getting help or finding something",
      phrases: [
        { phrase: "Where is the...?", usage: "Asking for location" },
        { phrase: "How do I...?", usage: "Asking for instructions" },
        { phrase: "What time is it?", usage: "Asking for time" },
        { phrase: "Can you help me?", usage: "Requesting assistance" },
        { phrase: "Do you understand?", usage: "Checking comprehension" }
      ]
    },
    {
      id: 3,
      title: "Making Requests",
      context: "Polite requests and orders",
      phrases: [
        { phrase: "I would like...", usage: "Polite request" },
        { phrase: "Can I have...?", usage: "Requesting something" },
        { phrase: "Could you please...?", usage: "Polite request" },
        { phrase: "May I...?", usage: "Formal request" },
        { phrase: "Do you have...?", usage: "Checking availability" }
      ]
    },
    {
      id: 4,
      title: "Daily Conversations",
      context: "Common everyday phrases",
      phrases: [
        { phrase: "Good morning/afternoon/evening", usage: "Time-specific greeting" },
        { phrase: "Thank you very much", usage: "Expressing gratitude" },
        { phrase: "You're welcome", usage: "Responding to thanks" },
        { phrase: "Excuse me", usage: "Getting attention" },
        { phrase: "See you later", usage: "Saying goodbye" }
      ]
    }
  ];

  const audioResources: AudioResource[] = [
    {
      id: 1,
      title: "BBC Learning English - 6 Minute English",
      type: "Podcast",
      duration: "~6 min",
      level: "Beginner to Intermediate",
      description: "Short English lessons with natural conversation, perfect for shadowing practice",
      url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english"
    },
    {
      id: 2,
      title: "TED-Ed Videos with Subtitles",
      type: "Video",
      duration: "5-10 min",
      level: "All Levels",
      description: "Educational videos with English subtitles for micro-immersion practice",
      url: "https://www.ted.com/"
    },
    {
      id: 3,
      title: "Easy English YouTube Channel",
      type: "Video",
      duration: "10-15 min",
      level: "Beginner to Intermediate",
      description: "Street interviews and real conversations with authentic English",
      url: "https://www.youtube.com/@EasyEnglish"
    },
    {
      id: 4,
      title: "Spotify: Easy English Podcasts",
      type: "Podcast",
      duration: "Various",
      level: "Beginner to Intermediate",
      description: "Curated playlists of podcasts designed for English learners",
      url: "https://www.spotify.com/"
    },
    {
      id: 5,
      title: "Shadowing Technique Practice",
      type: "Exercise",
      duration: "15-20 min",
      level: "Beginner to Advanced",
      description: "Step-by-step guide to the shadowing technique with practice material",
      url: "#"
    },
    {
      id: 6,
      title: "Forvo - Pronunciation Dictionary",
      type: "Reference",
      duration: "On-demand",
      level: "All Levels",
      description: "Hear real native speakers pronounce any word or phrase",
      url: "https://www.forvo.com/"
    }
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair">
              Learning Resources
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Curated vocabulary lists, functional phrase banks, and audio resources to accelerate your English learning journey.
            </p>
          </div>
        </section>

        {/* Resources Tabs */}
        <section className="py-12 bg-background">
          <div className="container max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="vocab" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Vocabulary
                </TabsTrigger>
                <TabsTrigger value="phrases" className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Phrases
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  Audio
                </TabsTrigger>
              </TabsList>

              {/* Vocabulary Tab */}
              <TabsContent value="vocab" className="space-y-6">
                <p className="text-muted-foreground">
                  Organized vocabulary lists grouped by utility and learning phase. Download flashcards or study with our interactive tools.
                </p>
                {vocabularyLists.map((list) => (
                  <Card key={list.id} className="overflow-hidden border-l-4 border-l-primary">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2 font-playfair">{list.title}</h3>
                          <Badge variant="secondary">{list.category}</Badge>
                        </div>
                        <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Word</th>
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Pronunciation</th>
                              <th className="text-left py-2 px-3 text-muted-foreground font-medium">Example</th>
                            </tr>
                          </thead>
                          <tbody>
                            {list.words.map((item, idx) => (
                              <tr key={idx} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                                <td className="py-3 px-3 font-semibold text-foreground">{item.word}</td>
                                <td className="py-3 px-3 text-muted-foreground font-mono text-xs">{item.pronunciation}</td>
                                <td className="py-3 px-3 text-muted-foreground italic">"{item.example}"</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Phrases Tab */}
              <TabsContent value="phrases" className="space-y-6">
                <p className="text-muted-foreground">
                  Functional phrase banks organized by context. Learn these as single units for instant communication.
                </p>
                {phraseBanks.map((bank) => (
                  <Card key={bank.id} className="overflow-hidden border-l-4 border-l-secondary">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 font-playfair">{bank.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{bank.context}</p>

                      <div className="space-y-3">
                        {bank.phrases.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 bg-secondary/20 rounded-lg hover:bg-secondary/30 transition-colors">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary">{idx + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-foreground mb-1">"{item.phrase}"</p>
                              <p className="text-sm text-muted-foreground">{item.usage}</p>
                            </div>
                            <button className="flex-shrink-0 text-primary hover:text-primary/80 transition-colors" title="Play audio">
                              <Mic2 className="w-5 h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>

              {/* Audio Resources Tab */}
              <TabsContent value="audio" className="space-y-6">
                <p className="text-muted-foreground">
                  Curated audio and video resources for shadowing practice, listening comprehension, and micro-immersion.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {audioResources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
                      <div className="p-6 flex-1">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="flex-shrink-0">
                            {resource.type === "Podcast" && (
                              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Headphones className="w-5 h-5 text-primary" />
                              </div>
                            )}
                            {resource.type === "Video" && (
                              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <Mic2 className="w-5 h-5 text-primary" />
                              </div>
                            )}
                            {(resource.type === "Exercise" || resource.type === "Reference") && (
                              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <Badge variant="outline" className="text-xs mb-2">{resource.type}</Badge>
                            <h3 className="font-bold text-foreground">{resource.title}</h3>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary" className="text-xs">{resource.duration}</Badge>
                          <Badge variant="secondary" className="text-xs">{resource.level}</Badge>
                        </div>
                      </div>

                      <div className="p-4 bg-secondary/20 border-t border-border">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="w-full text-primary hover:bg-primary/10"
                          onClick={() => window.open(resource.url, "_blank")}
                          disabled={resource.url === "#"}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Explore Resource
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* How to Use Resources */}
        <section className="py-12 bg-secondary/20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair">How to Use These Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Vocabulary Lists",
                  description: "Start with the Top 100 Words list. Use each word in 3 sentences daily."
                },
                {
                  step: "2",
                  title: "Phrase Banks",
                  description: "Memorize phrases as complete units. Practice them in context with audio resources."
                },
                {
                  step: "3",
                  title: "Audio Resources",
                  description: "Use for shadowing practice. Listen, pause, and repeat immediately to match native pronunciation."
                }
              ].map((item, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-b from-background to-primary/10">
          <div className="container max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4 font-playfair">Ready to Build Your Foundation?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start with the vocabulary lists and phrase banks. Use the audio resources for daily shadowing practice.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Begin Your Learning
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
