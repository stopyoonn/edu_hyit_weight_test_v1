import React from 'react';
import { AccessibilitySettings, NavigationTab, ProgressPhoto, UserProfile } from '../types';

interface HomeViewProps {
  userProfile: UserProfile;
  photos: ProgressPhoto[];
  onNavigate: (tab: NavigationTab) => void;
  onOpenUpload: () => void;
  onStartWorkout: () => void;
  accessibilitySettings: AccessibilitySettings;
}

export const HomeView: React.FC<HomeViewProps> = ({
  userProfile,
  photos,
  onNavigate,
  onOpenUpload,
  onStartWorkout,
  accessibilitySettings,
}) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const latestPhoto = photos[0];

  return (
    <main className="pt-20 pb-28 px-4 md:px-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <section
        className={`p-6 rounded-2xl relative overflow-hidden transition-all shadow-xl ${
          isHighContrast
            ? 'bg-black border-2 border-[#00ffcc] text-white'
            : isLight
            ? 'bg-gradient-to-r from-indigo-600 to-indigo-900 text-white'
            : 'bg-slate-900 border border-slate-800 text-slate-100'
        }`}
      >
        <div className="relative z-10 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-indigo-500 text-white shadow-sm">
                LVL {userProfile.level} • {userProfile.levelLabel}
              </span>
              <span className="text-xs text-slate-400">연속 12일 달성 🔥</span>
            </div>
            <h2 className="text-2xl font-extrabold tracking-tight mb-1 text-slate-100">
              반갑습니다, {userProfile.name}님!
            </h2>
            <p className="text-xs text-slate-400">
              오늘의 목표: <strong className="text-indigo-400">등 & 이두 65분 완료하기</strong>
            </p>
          </div>

          <button
            onClick={onStartWorkout}
            className={`px-4 py-3 rounded-xl font-extrabold text-sm shadow-lg active:scale-95 transition-transform flex items-center gap-1.5 ${
              isHighContrast
                ? 'bg-[#00ffcc] text-black border border-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30 border border-indigo-500/30'
            }`}
          >
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            <span className="hidden sm:inline">오늘 운동</span> 시작
          </button>
        </div>
      </section>

      {/* Drag & Drop Upload Highlight Box */}
      <section
        className={`p-5 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
          isHighContrast
            ? 'bg-black border-[#00ffcc] text-white hover:bg-[#00ffcc]/10'
            : isLight
            ? 'bg-indigo-50/50 border-indigo-300 hover:border-indigo-600 text-slate-900'
            : 'bg-slate-900/50 border-slate-700 hover:border-indigo-500 hover:bg-slate-900 text-slate-100'
        }`}
        onClick={onOpenUpload}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">add_a_photo</span>
            </div>
            <div>
              <h3 className="text-sm font-bold flex items-center gap-2 text-slate-200">
                드래그 앤 드롭 변화 사진 등록
                <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.5 rounded font-semibold uppercase">
                  드래그/핫링크
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                이곳으로 이미지 파일이나 웹 핫링크 URL을 가져와 실시간 미리보기 후 업로드하세요.
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-500">arrow_forward</span>
        </div>
      </section>

      {/* Quick Physical Metrics Overview */}
      <section className="grid grid-cols-3 gap-3">
        <div
          onClick={() => onNavigate('profile')}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center cursor-pointer hover:border-indigo-500 transition-all"
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase">신장 (Height)</span>
          <p className="text-xl font-extrabold text-indigo-400 mt-0.5">{userProfile.heightCm} cm</p>
        </div>

        <div
          onClick={() => onNavigate('profile')}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center cursor-pointer hover:border-emerald-400 transition-all"
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase">체중 (Weight)</span>
          <p className="text-xl font-extrabold text-emerald-400 mt-0.5">{userProfile.weightKg} kg</p>
        </div>

        <div
          onClick={() => onNavigate('profile')}
          className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center cursor-pointer hover:border-indigo-300 transition-all"
        >
          <span className="text-[11px] font-bold text-slate-400 uppercase">체지방 (Fat)</span>
          <p className="text-xl font-extrabold text-indigo-300 mt-0.5">{userProfile.bodyFatPercent} %</p>
        </div>
      </section>

      {/* Recent Body Transformation Banner */}
      {latestPhoto && (
        <section
          onClick={() => onNavigate('profile')}
          className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 cursor-pointer hover:border-slate-700 transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-800 flex-shrink-0 bg-slate-950">
              <img
                src={latestPhoto.url}
                alt="최신 변화 사진"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                최신 변화 기록 • {latestPhoto.date}
              </span>
              <h4 className="text-sm font-bold text-slate-200 mt-0.5">
                {latestPhoto.title || '신체 프레임 기록'}
              </h4>
              <p className="text-xs text-slate-400 truncate max-w-[200px]">
                {latestPhoto.note || '지속적인 피트니스 루틴 기록'}
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-500">chevron_right</span>
        </section>
      )}

      {/* Quick Access Grid */}
      <section className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onNavigate('routines')}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-indigo-500 transition-all group"
        >
          <span className="material-symbols-outlined text-2xl text-indigo-400 mb-2 group-hover:scale-110 transition-transform">
            fitness_center
          </span>
          <h4 className="text-sm font-bold text-slate-200">맞춤 루틴 관리</h4>
          <p className="text-xs text-slate-400 mt-1">4분할 종목 & 자세 가이드 확인</p>
        </button>

        <button
          onClick={() => onNavigate('log')}
          className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left hover:border-emerald-400 transition-all group"
        >
          <span className="material-symbols-outlined text-2xl text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
            calendar_month
          </span>
          <h4 className="text-sm font-bold text-slate-200">운동 캘린더</h4>
          <p className="text-xs text-slate-400 mt-1">이번 달 18회 달성 현황</p>
        </button>
      </section>
    </main>
  );
};
