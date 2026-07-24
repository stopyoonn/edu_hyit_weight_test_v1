import React, { useState, useEffect } from 'react';
import { AccessibilitySettings, Exercise } from '../types';

interface ActiveWorkoutModalProps {
  isOpen: boolean;
  exercises: Exercise[];
  onClose: () => void;
  onFinishWorkout: (summary: { durationMinutes: number; totalVolumeKg: number }) => void;
  accessibilitySettings: AccessibilitySettings;
}

export const ActiveWorkoutModal: React.FC<ActiveWorkoutModalProps> = ({
  isOpen,
  exercises,
  onClose,
  onFinishWorkout,
  accessibilitySettings,
}) => {
  if (!isOpen) return null;

  const isHighContrast = accessibilitySettings.theme === 'high-contrast';

  // Stopwatch timer state
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Active exercises completion tracking
  const [exerciseProgress, setExerciseProgress] = useState(
    exercises.map((ex) => ({
      id: ex.id,
      name: ex.name,
      sets: ex.setsData || [
        { setNumber: 1, targetReps: '10회', completed: false },
        { setNumber: 2, targetReps: '10회', completed: false },
        { setNumber: 3, targetReps: '10회', completed: false },
      ],
    }))
  );

  // Rest timer state
  const [restCountdown, setRestCountdown] = useState<number | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    let restInterval: any = null;
    if (restCountdown !== null && restCountdown > 0) {
      restInterval = setInterval(() => {
        setRestCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(restInterval);
  }, [restCountdown]);

  const toggleSetCompleted = (exIndex: number, setIndex: number) => {
    const updated = [...exerciseProgress];
    const targetSet = updated[exIndex].sets[setIndex];
    targetSet.completed = !targetSet.completed;

    if (targetSet.completed) {
      // Start 60 second rest countdown
      setRestCountdown(60);
    }

    setExerciseProgress(updated);
  };

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  const handleFinish = () => {
    const durationMins = Math.max(1, Math.round(secondsElapsed / 60));
    onFinishWorkout({
      durationMinutes: durationMins,
      totalVolumeKg: 4250,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="실시간 운동 세션 진행중"
    >
      <div
        className={`w-full max-w-xl rounded-2xl p-5 shadow-2xl transition-all max-h-[92vh] overflow-y-auto ${
          isHighContrast
            ? 'bg-black border-4 border-[#00ffcc] text-white'
            : 'bg-slate-900 border border-slate-800 text-slate-100'
        }`}
      >
        {/* Header with Stopwatch */}
        <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              실시간 운동 세션 진행중
            </span>
            <h2 className="text-xl font-bold text-slate-100">등 & 이두 루틴 (오늘)</h2>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-400 block font-bold uppercase">소요 시간</span>
            <span className="text-2xl font-extrabold text-indigo-400 font-mono">
              {formatTimer(secondsElapsed)}
            </span>
          </div>
        </div>

        {/* Rest Timer Banner */}
        {restCountdown !== null && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex justify-between items-center animate-pulse">
            <span className="text-xs font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-base">timer</span>
              세트 완료! 세트 간 휴식 시간 타이머
            </span>
            <span className="text-lg font-mono font-extrabold">{restCountdown}초</span>
          </div>
        )}

        {/* Exercise Sets Checkboxes */}
        <div className="space-y-4 mb-6">
          {exerciseProgress.map((ex, exIdx) => (
            <div key={ex.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <h3 className="text-sm font-bold text-indigo-400 mb-2">{ex.name}</h3>
              <div className="space-y-1.5">
                {ex.sets.map((set, setIdx) => (
                  <div
                    key={setIdx}
                    onClick={() => toggleSetCompleted(exIdx, setIdx)}
                    className={`p-2.5 rounded-lg border flex justify-between items-center cursor-pointer transition-all ${
                      set.completed
                        ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-400'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-bold">
                      SET {set.setNumber} ({set.targetReps})
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold">
                      {set.completed ? '완료됨 ✓' : '터치하여 완료'}
                      <span className="material-symbols-outlined text-sm">
                        {set.completed ? 'check_box' : 'check_box_outline_blank'}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-slate-800 text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-700 transition-colors"
          >
            일시 정지 / 취소
          </button>
          <button
            onClick={handleFinish}
            className={`flex-1 py-3 font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 ${
              isHighContrast
                ? 'bg-[#00ffcc] text-black'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'
            }`}
          >
            <span className="material-symbols-outlined">emoji_events</span>
            운동 완료 및 저장
          </button>
        </div>
      </div>
    </div>
  );
};
