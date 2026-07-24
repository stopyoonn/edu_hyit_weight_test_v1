import React, { useState } from 'react';
import { AccessibilitySettings, DailyWorkoutSummary } from '../types';
import { WORKOUT_CALENDAR_ACTIVE_DAYS, DAILY_WORKOUT_SUMMARIES } from '../data/mockData';

interface LogViewProps {
  accessibilitySettings: AccessibilitySettings;
}

export const LogView: React.FC<LogViewProps> = ({ accessibilitySettings }) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const [selectedDay, setSelectedDay] = useState(20);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);

  // Calendar dates mock setup for May 2024
  const daysInMonth = 31;
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const selectedDateKey = `2024-05-${selectedDay < 10 ? '0' + selectedDay : selectedDay}`;
  const currentSummary: DailyWorkoutSummary = DAILY_WORKOUT_SUMMARIES[selectedDateKey] || {
    dateKey: selectedDateKey,
    displayDate: `5월 ${selectedDay}일`,
    statusLabel: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay) ? '완료됨' : '휴식일',
    routineName: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay)
      ? '전신 컨디셔닝 & 코어'
      : '지정된 운동 기록 없음',
    timeRange: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay)
      ? '오후 6:00 - 오후 7:00'
      : '-',
    durationMinutes: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay) ? 60 : 0,
    totalVolumeKg: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay) ? 3800 : 0,
    avgHeartRateBpm: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay) ? 132 : 0,
    performedExercises: WORKOUT_CALENDAR_ACTIVE_DAYS.includes(selectedDay)
      ? ['스트레칭', '폼롤러 리커버리', '코어 플랭크']
      : [],
  };

  return (
    <main className="pt-20 pb-28 px-4 md:px-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2
            className={`text-2xl md:text-3xl font-extrabold ${
              isHighContrast ? 'text-[#00ffcc]' : isLight ? 'text-slate-900' : 'text-slate-100'
            }`}
          >
            운동 캘린더
          </h2>
          <p className="text-xs text-slate-400">월별 히스토리 및 세부 스트릭 관리</p>
        </div>
      </div>

      {/* Monthly Stats Overview (Bento Style) */}
      <section className="grid grid-cols-2 gap-3">
        <div
          className={`p-4 rounded-xl flex flex-col justify-between transition-all ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-sm'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase">이번 달 총 운동</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span
              className={`text-3xl md:text-4xl font-extrabold ${
                isHighContrast ? 'text-[#00ffcc]' : 'text-indigo-400'
              }`}
            >
              18
            </span>
            <span className="text-xs text-slate-400 font-bold">회</span>
          </div>
        </div>

        <div
          className={`p-4 rounded-xl flex flex-col justify-between transition-all ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-sm'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase">총 운동 시간</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span
              className={`text-3xl md:text-4xl font-extrabold ${
                isHighContrast ? 'text-[#00ffcc]' : 'text-emerald-400'
              }`}
            >
              24
            </span>
            <span className="text-xs text-slate-400 font-bold">시간</span>
          </div>
        </div>
      </section>

      {/* Calendar Component */}
      <section
        className={`rounded-2xl p-4 transition-all shadow-xl ${
          isHighContrast
            ? 'bg-black border-2 border-[#00ffcc]'
            : isLight
            ? 'bg-white border border-slate-200'
            : 'bg-slate-900 border border-slate-800'
        }`}
      >
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="text-lg font-bold text-slate-100">2024년 5월</h3>
          <div className="flex gap-2">
            <button
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="이전 달"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="다음 달"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Day Header */}
        <div className="grid grid-cols-7 text-center text-xs font-bold text-slate-500 mb-2">
          <div>일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div>토</div>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm font-semibold">
          {/* Previous Month Padding */}
          <div className="py-2 text-slate-600 opacity-30">28</div>
          <div className="py-2 text-slate-600 opacity-30">29</div>
          <div className="py-2 text-slate-600 opacity-30">30</div>

          {/* Current Month Days */}
          {daysArray.map((day) => {
            const hasWorkout = WORKOUT_CALENDAR_ACTIVE_DAYS.includes(day);
            const isSelected = selectedDay === day;

            return (
              <div key={day} className="py-1 flex items-center justify-center">
                <button
                  onClick={() => setSelectedDay(day)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isSelected
                      ? 'ring-2 ring-indigo-400 bg-indigo-600 text-white font-extrabold scale-105 shadow-md shadow-indigo-600/30'
                      : hasWorkout
                      ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-sm hover:scale-105'
                      : isLight
                      ? 'hover:bg-slate-200 text-slate-800'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                  aria-label={`5월 ${day}일 ${hasWorkout ? '운동 완료' : ''}`}
                >
                  {day}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Daily Summary Section */}
      <section className="space-y-3">
        <div className="flex justify-between items-end">
          <h3 className="text-lg font-bold text-slate-200">{currentSummary.displayDate} 운동 요약</h3>
          <span
            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
              currentSummary.statusLabel === '완료됨'
                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            {currentSummary.statusLabel}
          </span>
        </div>

        <div
          className={`rounded-2xl p-5 relative overflow-hidden transition-all ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-md'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          {/* Header row */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="text-xl font-bold mb-0.5 text-slate-100">{currentSummary.routineName}</h4>
              <p className="text-xs text-slate-400">{currentSummary.timeRange}</p>
            </div>
            {currentSummary.durationMinutes > 0 && (
              <div className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                {currentSummary.durationMinutes}분
              </div>
            )}
          </div>

          {currentSummary.durationMinutes > 0 ? (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-indigo-400">
                    <span className="material-symbols-outlined">fitness_center</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">총 볼륨</p>
                    <p className="text-lg font-extrabold text-slate-100">
                      {currentSummary.totalVolumeKg.toLocaleString()}kg
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-emerald-400">
                    <span className="material-symbols-outlined">monitor_heart</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase">평균 심박수</p>
                    <p className="text-lg font-extrabold text-slate-100">{currentSummary.avgHeartRateBpm} bpm</p>
                  </div>
                </div>
              </div>

              {/* Performed exercises tags */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">수행된 운동</p>
                <div className="flex flex-wrap gap-2">
                  {currentSummary.performedExercises.map((exName, idx) => (
                    <span
                      key={idx}
                      className="bg-slate-950 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-200 border border-slate-800 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      {exName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detail button */}
              <div className="mt-5 pt-3 border-t border-slate-800 flex justify-center">
                <button
                  onClick={() => setShowAnalysisModal(true)}
                  className="text-indigo-400 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                >
                  상세 분석 보기
                  <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-slate-400 text-center py-4">
              해당 날짜에는 기록된 운동이 없습니다. 새로운 운동을 시작해 보세요!
            </p>
          )}
        </div>
      </section>

      {/* Detailed Analysis Modal */}
      {showAnalysisModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full text-slate-100 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-400">
                <span className="material-symbols-outlined text-emerald-400">analytics</span>
                {currentSummary.displayDate} 상세 분석
              </h3>
              <button
                onClick={() => setShowAnalysisModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-950 rounded-xl space-y-1 border border-slate-800">
                <p className="text-xs font-bold text-slate-400">칼로리 소모 추정치</p>
                <p className="text-xl font-bold text-emerald-400">540 kcal</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl space-y-1 border border-slate-800">
                <p className="text-xs font-bold text-slate-400">최대 심박수 (Peak HR)</p>
                <p className="text-xl font-bold text-indigo-300">165 bpm</p>
              </div>
              <div className="p-3 bg-slate-950 rounded-xl space-y-1 border border-slate-800">
                <p className="text-xs font-bold text-slate-400">운동 효율 점수</p>
                <p className="text-xl font-bold text-indigo-400">94 / 100점 (상위 5%)</p>
              </div>
            </div>

            <button
              onClick={() => setShowAnalysisModal(false)}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-500"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </main>
  );
};
