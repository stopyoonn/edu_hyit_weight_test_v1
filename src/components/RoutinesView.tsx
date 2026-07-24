import React, { useState } from 'react';
import { AccessibilitySettings, Exercise } from '../types';
import { WEEKLY_ROUTINE_DAYS, TODAY_EXERCISES } from '../data/mockData';

interface RoutinesViewProps {
  onStartWorkout: () => void;
  accessibilitySettings: AccessibilitySettings;
}

export const RoutinesView: React.FC<RoutinesViewProps> = ({
  onStartWorkout,
  accessibilitySettings,
}) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  return (
    <main className="pt-20 pb-28 px-4 md:px-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header Section */}
      <section className="space-y-2">
        <h2
          className={`text-2xl md:text-3xl font-extrabold ${
            isHighContrast ? 'text-[#00ffcc]' : isLight ? 'text-slate-900' : 'text-slate-100'
          }`}
        >
          당신을 위한 맞춤 루틴
        </h2>
        <div className="flex gap-2">
          <span className="bg-slate-900 px-3 py-1 rounded-full text-xs font-extrabold text-indigo-400 border border-indigo-500/30 uppercase">
            근육량 증가
          </span>
          <span className="bg-slate-900 px-3 py-1 rounded-full text-xs font-extrabold text-emerald-400 border border-emerald-500/30 uppercase">
            상급자
          </span>
        </div>
      </section>

      {/* Weekly Split Horizontal Carousel */}
      <section className="overflow-x-auto no-scrollbar pb-1">
        <div className="flex gap-3 min-w-max">
          {WEEKLY_ROUTINE_DAYS.map((day) => {
            if (day.isToday) {
              return (
                <div
                  key={day.dayNumber}
                  className={`w-32 p-4 rounded-xl text-white flex flex-col items-center ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-950 transition-transform transform scale-105 shadow-xl ${
                    isHighContrast
                      ? 'bg-[#00ffcc] text-black ring-white'
                      : 'bg-indigo-600'
                  }`}
                >
                  <span className="text-xs font-bold opacity-90 mb-1">{day.dayNumber}일차</span>
                  <span
                    className="material-symbols-outlined text-2xl mb-1"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {day.icon}
                  </span>
                  <span className="text-sm font-extrabold">{day.title}</span>
                  <span className="mt-1 text-[10px] font-extrabold bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full uppercase border border-indigo-400/30">
                    오늘
                  </span>
                </div>
              );
            }

            return (
              <div
                key={day.dayNumber}
                className={`w-28 p-4 rounded-xl flex flex-col items-center border transition-all ${
                  day.status === 'completed'
                    ? 'border-indigo-500/50 bg-slate-900'
                    : day.status === 'rest'
                    ? 'border-slate-800 bg-slate-900/40 opacity-60'
                    : 'border-slate-800 bg-slate-900'
                }`}
              >
                <span className="text-xs font-bold text-slate-400 mb-1">{day.dayNumber}일차</span>
                <span
                  className={`material-symbols-outlined text-xl mb-1 ${
                    day.status === 'completed' ? 'text-emerald-400' : 'text-slate-400'
                  }`}
                  style={day.status === 'completed' ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {day.icon}
                </span>
                <span className="text-xs font-bold text-slate-300 text-center leading-tight">
                  {day.title}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Target Muscle Guide Card */}
      <section
        className={`p-4 rounded-xl border transition-all ${
          isHighContrast
            ? 'bg-black border-2 border-[#00ffcc]'
            : isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-slate-900 border-slate-800'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border border-indigo-500/30 bg-slate-950">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80"
              alt="해부학적 근육 시각화"
              className="w-full h-full object-cover opacity-90"
            />
          </div>
          <div>
            <h3 className="text-sm font-bold text-indigo-400 mb-1 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">info</span>
              오늘의 타겟 근육 가이드
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              이 분할 루틴은 근비대 회복을 극대화하도록 설계되었습니다. 오늘 후면 사슬(등)과
              팔꿈치 굴곡근(이두근)을 고립시킴으로써, 하체 운동과의 겹침을 방지하여 모든 세트에서
              최대 강도를 낼 수 있게 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Today's Exercise List */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-slate-200">오늘의 운동</h3>
          <span className="text-xs text-slate-400 font-semibold">4가지 종목 • 65분</span>
        </div>

        <div className="space-y-3">
          {TODAY_EXERCISES.map((ex) => (
            <div
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className={`p-3 rounded-xl border flex gap-3 items-center cursor-pointer transition-all hover:border-indigo-500 ${
                isHighContrast
                  ? 'bg-black border-[#00ffcc]'
                  : isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-slate-900 border-slate-800 hover:bg-slate-900/80'
              }`}
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-slate-950 border border-slate-800">
                <img
                  src={ex.imageUrl}
                  alt={ex.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow min-w-0">
                <h4 className="text-base font-bold text-slate-100 mb-0.5">{ex.name}</h4>
                <p className="text-xs text-indigo-400 mb-1.5 truncate">{ex.targetDescription}</p>

                {/* Target Muscle Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {ex.targetMuscles.map((m, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/20"
                    >
                      • {m}
                    </span>
                  ))}
                </div>

                {/* Specs */}
                <div className="flex gap-4 text-xs text-slate-400">
                  <div>
                    <span className="text-[10px] font-bold block uppercase text-slate-500">
                      세트
                    </span>
                    <span className="font-bold text-slate-200">{ex.setsCount}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block uppercase text-slate-500">
                      회수
                    </span>
                    <span className="font-bold text-slate-200">{ex.repsText}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold block uppercase text-slate-500">
                      {ex.rpeOrWeightOrRest.label}
                    </span>
                    <span className="font-bold text-emerald-400">
                      {ex.rpeOrWeightOrRest.value}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="text-slate-400 hover:text-indigo-400 p-1"
                title="운동 상세 정보 및 자세 보기"
                aria-label={`${ex.name} 상세 정보`}
              >
                <span className="material-symbols-outlined text-2xl">play_circle</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Start Workout Button */}
      <div className="pt-2">
        <button
          onClick={onStartWorkout}
          className={`w-full py-4 text-lg font-extrabold rounded-xl shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
            isHighContrast
              ? 'bg-[#00ffcc] text-black border-2 border-white'
              : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30 border border-indigo-500/30'
          }`}
        >
          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            play_arrow
          </span>
          운동 시작
        </button>
      </div>

      {/* Exercise Details Guide Modal */}
      {selectedExercise && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full text-slate-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400">fitness_center</span>
                {selectedExercise.name} 자세 가이드
              </h3>
              <button
                onClick={() => setSelectedExercise(null)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="w-full h-48 rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={selectedExercise.imageUrl}
                alt={selectedExercise.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">운동 수행 팁 & 자세</h4>
              <ul className="space-y-2 text-sm text-slate-200">
                {selectedExercise.instructions?.map((inst, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <span className="w-5 h-5 rounded-full bg-indigo-950 text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-indigo-500/30">
                      {idx + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setSelectedExercise(null)}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-500"
            >
              확인 및 닫기
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
