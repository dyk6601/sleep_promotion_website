"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type AchievementKey =
  | "first_visit"
  | "quiz_taker"
  | "quiz_master"
  | "tracker_starter"
  | "tracker_streak"
  | "scale_explorer"
  | "education_enthusiast"
  | "tips_explorer"
  | "ai_program_user";

export interface Achievement {
  key: AchievementKey;
  title: string;
  description: string;
  icon: string;
}

const ACHIEVEMENTS: Record<AchievementKey, Achievement> = {
  first_visit: {
    key: "first_visit",
    title: "First Visit!",
    description: "Welcome! You visited the homepage for the first time.",
    icon: "👋"
  },
  quiz_taker: {
    key: "quiz_taker",
    title: "Quiz Taker",
    description: "You completed your first quiz!",
    icon: "📝"
  },
  quiz_master: {
    key: "quiz_master",
    title: "Quiz Master",
    description: "You scored 100% on a quiz!",
    icon: "🏆"
  },
  tracker_starter: {
    key: "tracker_starter",
    title: "Sleep Tracker Starter",
    description: "You logged your first sleep entry!",
    icon: "🛏️"
  },
  tracker_streak: {
    key: "tracker_streak",
    title: "Sleep Tracker Streak",
    description: "You logged sleep for 7 consecutive days!",
    icon: "🔥"
  },
  scale_explorer: {
    key: "scale_explorer",
    title: "Scale Explorer",
    description: "You completed a sleep scale assessment!",
    icon: "📊"
  },
  education_enthusiast: {
    key: "education_enthusiast",
    title: "Education Enthusiast",
    description: "You explored 3 resources in the Education Hub!",
    icon: "📚"
  },
  tips_explorer: {
    key: "tips_explorer",
    title: "Tips Explorer",
    description: "You viewed the Tips page!",
    icon: "💡"
  },
  ai_program_user: {
    key: "ai_program_user",
    title: "AI Program User",
    description: "You generated an AI sleep program!",
    icon: "🤖"
  }
};

interface AchievementsContextType {
  unlocked: AchievementKey[];
  unlock: (key: AchievementKey) => void;
  modal: Achievement | null;
  closeModal: () => void;
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<AchievementKey[]>([]);
  const [modal, setModal] = useState<Achievement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("achievements");
    if (saved) setUnlocked(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("achievements", JSON.stringify(unlocked));
  }, [unlocked]);

  const unlock = (key: AchievementKey) => {
    if (!unlocked.includes(key)) {
      setUnlocked((prev) => [...prev, key]);
      setModal(ACHIEVEMENTS[key]);
    }
  };

  const closeModal = () => setModal(null);

  return (
    <AchievementsContext.Provider value={{ unlocked, unlock, modal, closeModal }}>
      {children}
      {modal && (
        <div className="fixed inset-0 flex items-end justify-center z-50 pointer-events-none">
          <div className="mb-12 bg-white/90 text-black rounded-xl shadow-2xl px-8 py-6 flex items-center gap-4 animate-fade-in pointer-events-auto">
            <span className="text-4xl">{modal.icon}</span>
            <div>
              <div className="font-bold text-lg">Achievement Unlocked!</div>
              <div className="font-semibold">{modal.title}</div>
              <div className="text-sm text-gray-700">{modal.description}</div>
            </div>
            <button onClick={closeModal} className="ml-4 px-3 py-1 rounded bg-purple-500 text-white font-bold">Close</button>
          </div>
        </div>
      )}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementsContext);
  if (!ctx) throw new Error("useAchievements must be used within AchievementsProvider");
  return ctx;
} 