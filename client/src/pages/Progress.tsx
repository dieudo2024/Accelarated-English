import React, { useState, useMemo, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Circle, Flame, TrendingUp, Trophy, Target } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DayProgress {
  day: number;
  week: number;
  completed: boolean;
  title: string;
}

export default function Progress(): React.ReactNode {
  // Initialize from localStorage if available, otherwise fallback to sample days
  const [completedDays, setCompletedDays] = useState<Set<number>>(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const raw = window.localStorage.getItem("ae_progress_completed_days");
        if (raw) {
          const arr = JSON.parse(raw) as number[];
          return new Set(arr);
        }
      }
    } catch (e) {
      // ignore and fall back
    }

    return new Set([1, 2, 3, 4, 5, 6, 8, 9]);
  });

  const daysData: DayProgress[] = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    week: Math.ceil((i + 1) / 7),
    completed: completedDays.has(i + 1),
    title: `Day ${i + 1}`
  }));

  const toggleDayComplete = (day: number) => {
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedDays(newCompleted);
  };

  // Persist completed days to localStorage whenever they change
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(
          "ae_progress_completed_days",
          JSON.stringify(Array.from(completedDays))
        );
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [completedDays]);

  // Stats
  const stats = useMemo(() => {
    const completed = completedDays.size;
    const total = 30;
    const percentage = Math.round((completed / total) * 100);
    
    // Calculate current streak
    let streak = 0;
    for (let i = 30; i >= 1; i--) {
      if (completedDays.has(i)) streak++;
      else break;
    }

    return { completed, total, percentage, streak };
  }, [completedDays]);

  const daysByWeek = useMemo(() => {
    return {
      week1: daysData.filter(d => d.week === 1),
      week2: daysData.filter(d => d.week === 2),
      week3: daysData.filter(d => d.week === 3),
      week4: daysData.filter(d => d.week === 4)
    };
  }, [completedDays]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-12 md:py-20">
          <div className="container max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-playfair">
              Your Learning Progress
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Track your 30-day journey to English fluency. Every completed day is a step closer to confident communication.
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-12 bg-background">
          <div className="container max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
                  label: "Days Completed",
                  value: stats.completed,
                  total: stats.total
                },
                {
                  icon: <Target className="w-8 h-8 text-primary" />,
                  label: "Progress",
                  value: `${stats.percentage}%`,
                  total: ""
                },
                {
                  icon: <Flame className="w-8 h-8 text-primary" />,
                  label: "Current Streak",
                  value: stats.streak,
                  total: "days"
                },
                {
                  icon: <Trophy className="w-8 h-8 text-primary" />,
                  label: "Milestone",
                  value: stats.percentage < 50 ? "Halfway There!" : stats.percentage < 100 ? "Almost Done!" : "Completed!",
                  total: ""
                }
              ].map((stat, idx) => (
                <Card key={idx} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-3">{stat.icon}</div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">
                    {stat.value}
                    {stat.total && <span className="text-lg text-muted-foreground ml-1">{stat.total}</span>}
                  </p>
                </Card>
              ))}
            </div>

            {/* Progress Bar */}
            <Card className="p-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-foreground">Overall Progress</h3>
                <span className="text-2xl font-bold text-primary">{stats.percentage}%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500"
                  style={{ width: `${stats.percentage}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                {stats.completed} of {stats.total} days completed • {stats.streak} day streak
              </p>
            </Card>
          </div>
        </section>

        {/* Weekly Breakdown */}
        <section className="py-12 bg-secondary/20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair">Weekly Breakdown</h2>
            <Tabs defaultValue="week1" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="week1">Week 1</TabsTrigger>
                <TabsTrigger value="week2">Week 2</TabsTrigger>
                <TabsTrigger value="week3">Week 3</TabsTrigger>
                <TabsTrigger value="week4">Week 4</TabsTrigger>
              </TabsList>

              {[
                { tabValue: "week1", label: "Week 1: Foundation", days: daysByWeek.week1 },
                { tabValue: "week2", label: "Week 2: Fluency", days: daysByWeek.week2 },
                { tabValue: "week3", label: "Week 3: Immersion", days: daysByWeek.week3 },
                { tabValue: "week4", label: "Week 4: Mastery", days: daysByWeek.week4 }
              ].map(({ tabValue, label, days }) => {
                const weekCompleted = days.filter(d => d.completed).length;
                const weekPercentage = Math.round((weekCompleted / 7) * 100);

                return (
                  <TabsContent key={tabValue} value={tabValue}>
                    <Card className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-foreground font-playfair">{label}</h3>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">{weekCompleted}/7</p>
                          <p className="text-sm text-muted-foreground">days completed</p>
                        </div>
                      </div>

                      <div className="bg-secondary rounded-full h-2 w-full mb-6 overflow-hidden">
                        <div
                          className="bg-primary h-full transition-all duration-500"
                          style={{ width: `${weekPercentage}%` }}
                        />
                      </div>

                      <div className="grid grid-cols-7 gap-3">
                        {days.map(day => (
                          <button
                            key={day.day}
                            onClick={() => toggleDayComplete(day.day)}
                            className={`aspect-square rounded-lg flex flex-col items-center justify-center font-semibold transition-all hover:shadow-lg ${
                              day.completed
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-foreground hover:bg-secondary/80"
                            }`}
                            title={`Day ${day.day}`}
                          >
                            {day.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span className="text-lg">{day.day}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </Card>
                  </TabsContent>
                );
              })}
            </Tabs>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-12 bg-background">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: "🔥",
                  title: "First Day Done",
                  description: "Complete your first day of learning",
                  unlocked: stats.completed >= 1
                },
                {
                  icon: "⭐",
                  title: "Week One Complete",
                  description: "Finish your first full week",
                  unlocked: stats.completed >= 7
                },
                {
                  icon: "🎯",
                  title: "Halfway There",
                  description: "Complete 50% of the 30-day challenge",
                  unlocked: stats.completed >= 15
                },
                {
                  icon: "🏆",
                  title: "Consistency King",
                  description: "Maintain a 7-day streak",
                  unlocked: stats.streak >= 7
                },
                {
                  icon: "💪",
                  title: "Two Weeks Strong",
                  description: "Complete 14 days of learning",
                  unlocked: stats.completed >= 14
                },
                {
                  icon: "🎓",
                  title: "30-Day Master",
                  description: "Complete the full 30-day blueprint",
                  unlocked: stats.completed >= 30
                }
              ].map((achievement, idx) => (
                <Card
                  key={idx}
                  className={`p-6 transition-all ${
                    achievement.unlocked
                      ? "bg-primary/10 border-primary/50"
                      : "bg-secondary/20 opacity-60 border-secondary/30"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-1 ${
                        achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {achievement.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      {achievement.unlocked && (
                        <p className="text-xs text-primary font-semibold mt-2">✓ Unlocked</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Insights */}
        <section className="py-12 bg-secondary/20">
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold text-foreground mb-8 font-playfair">Your Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Learning Momentum
                </h3>
                <p className="text-muted-foreground mb-4">
                  You're maintaining great consistency! {stats.streak > 0 ? `Your current streak of ${stats.streak} days is excellent.` : "Start your first streak today!"}
                </p>
                <div className="bg-primary/5 p-3 rounded border-l-2 border-primary">
                  <p className="text-sm font-semibold text-primary">Pro Tip: 20 minutes daily beats 4 hours once a week</p>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Next Goals
                </h3>
                {stats.completed < 7 ? (
                  <p className="text-muted-foreground mb-4">Complete Week 1 to master the top 100 high-frequency words and foundational grammar.</p>
                ) : stats.completed < 14 ? (
                  <p className="text-muted-foreground mb-4">You're in Week 2! Focus on functional phrases and shadowing technique mastery.</p>
                ) : stats.completed < 21 ? (
                  <p className="text-muted-foreground mb-4">Week 3: Time to create your micro-immersion bubble and practice real-time output.</p>
                ) : (
                  <p className="text-muted-foreground mb-4">You're in the final week! Polish your skills and celebrate your transformation.</p>
                )}
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Continue Learning
                </Button>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
