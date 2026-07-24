export type ThemeMode = 'dark' | 'light' | 'high-contrast';
export type TextScale = 'normal' | 'large' | 'xlarge';
export type NavigationTab = 'home' | 'routines' | 'log' | 'profile' | 'help';

export interface UserProfile {
  name: string;
  startDate: string;
  level: number;
  levelLabel: string;
  avatarUrl: string;
  headerBgUrl?: string;
  heightCm: number;
  weightKg: number;
  bodyFatPercent: number;
  mainGoal: string;
  experienceLevel: string;
  topPercentage: number;
}

export interface ProgressPhoto {
  id: string;
  date: string; // e.g. "5월 12일" or ISO string
  fullDate: string; // e.g. "2024-05-12"
  url: string;
  title?: string;
  note?: string;
  category?: 'front' | 'back' | 'side' | 'flex';
}

export interface ExerciseSet {
  setNumber: number;
  targetReps: string;
  weightKg?: number;
  weightLbs?: number;
  rpe?: number;
  completed: boolean;
}

export interface Exercise {
  id: string;
  name: string;
  targetDescription: string;
  targetMuscles: string[];
  imageUrl: string;
  muscleMapUrl?: string;
  setsCount: number;
  repsText: string;
  rpeOrWeightOrRest: {
    label: string;
    value: string;
  };
  setsData?: ExerciseSet[];
  instructions?: string[];
}

export interface DayRoutine {
  dayNumber: number;
  title: string;
  subtitle: string;
  icon: string;
  status: 'completed' | 'today' | 'rest' | 'upcoming';
  isToday?: boolean;
}

export interface DailyWorkoutSummary {
  dateKey: string; // "2024-05-20"
  displayDate: string; // "5월 20일"
  statusLabel: string; // "완료됨"
  routineName: string; // "등 & 이두 루틴"
  timeRange: string; // "오후 7:30 - 오후 8:35"
  durationMinutes: number; // 65
  totalVolumeKg: number; // 4200
  avgHeartRateBpm: number; // 138
  performedExercises: string[]; // ["풀업", "바벨 로우", "바이셉 컬", "랫 풀 다운"]
}

export interface AccessibilitySettings {
  theme: ThemeMode;
  textScale: TextScale;
  reduceMotion: boolean;
  screenReaderAnnouncements: boolean;
  keyboardNavigationHints: boolean;
  highContrastFocus: boolean;
}
