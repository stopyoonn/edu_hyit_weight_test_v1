import React, { useState } from 'react';
import { AccessibilitySettings, ProgressPhoto, UserProfile } from '../types';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  photos: ProgressPhoto[];
  onOpenUpload: () => void;
  onSelectPhoto: (photo: ProgressPhoto) => void;
  accessibilitySettings: AccessibilitySettings;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  photos,
  onOpenUpload,
  onSelectPhoto,
  accessibilitySettings,
}) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  // Inline editing state
  const [isEditingMetrics, setIsEditingMetrics] = useState(false);
  const [height, setHeight] = useState(userProfile.heightCm.toString());
  const [weight, setWeight] = useState(userProfile.weightKg.toString());
  const [bodyFat, setBodyFat] = useState(userProfile.bodyFatPercent.toString());
  const [showToast, setShowToast] = useState(false);

  const handleSaveMetrics = () => {
    const parsedHeight = parseFloat(height) || userProfile.heightCm;
    const parsedWeight = parseFloat(weight) || userProfile.weightKg;
    const parsedBodyFat = parseFloat(bodyFat) || userProfile.bodyFatPercent;

    onUpdateProfile({
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      bodyFatPercent: parsedBodyFat,
    });

    setIsEditingMetrics(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <main className="pt-20 pb-28 px-4 md:px-6 max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* Toast notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-emerald-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined">check_circle</span>
          신체 정보가 성공적으로 업데이트되었습니다!
        </div>
      )}

      {/* Profile Summary Section */}
      <section className="flex flex-col items-center text-center space-y-3">
        <div className="relative inline-block">
          <div
            className={`w-28 h-28 rounded-full border-4 overflow-hidden shadow-2xl ${
              isHighContrast
                ? 'border-[#00ffcc]'
                : isLight
                ? 'border-indigo-600'
                : 'border-indigo-500 shadow-indigo-500/20'
            }`}
          >
            <img
              src={userProfile.avatarUrl}
              alt={userProfile.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`absolute -bottom-1 -right-1 px-3 py-1 rounded-full text-xs font-extrabold shadow-md ${
              isHighContrast
                ? 'bg-[#00ffcc] text-black border border-white'
                : 'bg-indigo-500 text-white'
            }`}
          >
            LVL {userProfile.level}
          </div>
        </div>

        <div>
          <h2
            className={`text-2xl md:text-3xl font-extrabold tracking-tight ${
              isHighContrast
                ? 'text-[#00ffcc]'
                : isLight
                ? 'text-slate-900'
                : 'text-slate-100'
            }`}
          >
            {userProfile.name}
          </h2>
          <p
            className={`text-sm ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            {userProfile.startDate} • {userProfile.experienceLevel}
          </p>
        </div>
      </section>

      {/* Physical Metrics Grid */}
      <section className="grid grid-cols-3 gap-3">
        {/* Height Card */}
        <div
          className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-sm'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            키
          </span>
          <div className="flex items-baseline gap-0.5">
            {isEditingMetrics ? (
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-16 text-center text-xl md:text-2xl font-extrabold bg-slate-950 text-indigo-400 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <span className="text-2xl md:text-4xl font-extrabold text-indigo-400">
                {userProfile.heightCm}
              </span>
            )}
            <span className="text-xs text-slate-400 ml-0.5">cm</span>
          </div>
        </div>

        {/* Weight Card */}
        <div
          className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all border ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border-indigo-200 shadow-sm'
              : 'bg-slate-900 border-indigo-500/30'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            몸무게
          </span>
          <div className="flex items-baseline gap-0.5">
            {isEditingMetrics ? (
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-16 text-center text-xl md:text-2xl font-extrabold bg-slate-950 text-emerald-400 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            ) : (
              <span className="text-2xl md:text-4xl font-extrabold text-emerald-400">
                {userProfile.weightKg}
              </span>
            )}
            <span className="text-xs text-slate-400 ml-0.5">kg</span>
          </div>
        </div>

        {/* Body Fat Card */}
        <div
          className={`p-4 rounded-xl flex flex-col items-center justify-center space-y-1 transition-all ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-sm'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            체지방
          </span>
          <div className="flex items-baseline gap-0.5">
            {isEditingMetrics ? (
              <input
                type="number"
                value={bodyFat}
                onChange={(e) => setBodyFat(e.target.value)}
                className="w-16 text-center text-xl md:text-2xl font-extrabold bg-slate-950 text-indigo-300 rounded border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            ) : (
              <span className="text-2xl md:text-4xl font-extrabold text-indigo-300">
                {userProfile.bodyFatPercent}
              </span>
            )}
            <span className="text-xs text-slate-400 ml-0.5">%</span>
          </div>
        </div>
      </section>

      {/* Goals & Performance */}
      <section className="space-y-4">
        {/* Goal Setting */}
        <div
          className={`p-5 rounded-2xl space-y-4 ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-sm'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-200">목표 설정</h3>
            <button
              onClick={() => {
                const newGoal = prompt('새로운 주요 목표를 입력하세요:', userProfile.mainGoal);
                if (newGoal) onUpdateProfile({ mainGoal: newGoal });
              }}
              className="p-1 rounded text-slate-400 hover:text-white transition-colors"
              title="목표 수정"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl flex items-center gap-4 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-indigo-950/50 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">fitness_center</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">주요 목표</p>
              <p className="text-base font-bold text-slate-100">{userProfile.mainGoal}</p>
            </div>
          </div>
        </div>

        {/* Workout Level */}
        <div
          className={`p-5 rounded-2xl space-y-3 ${
            isHighContrast
              ? 'bg-black border-2 border-[#00ffcc]'
              : isLight
              ? 'bg-white border border-slate-200 shadow-sm'
              : 'bg-slate-900 border border-slate-800'
          }`}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-200">운동 수준</h3>
            <span className="px-3 py-1 bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 rounded-full text-xs font-extrabold">
              {userProfile.experienceLevel}
            </span>
          </div>

          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.6)]"
              style={{ width: `${100 - userProfile.topPercentage}%` }}
            ></div>
          </div>

          <p className="text-xs text-slate-400">
            이번 달 해당 카테고리 내 상위 {userProfile.topPercentage}%의 사용자입니다.
          </p>
        </div>
      </section>

      {/* Progress Gallery (변화 기록) */}
      <section className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h3 className="text-lg font-bold text-slate-200">변화 기록</h3>
          <button
            onClick={onOpenUpload}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 uppercase flex items-center gap-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add_a_photo</span>
            사진 추가
          </button>
        </div>

        {/* Photo Horizontal Scrollable Gallery */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => onSelectPhoto(photo)}
              className="flex-shrink-0 w-32 h-44 rounded-xl overflow-hidden relative group cursor-pointer border border-slate-800 hover:border-indigo-500 transition-all duration-200 shadow-lg"
            >
              <img
                src={photo.url}
                alt={photo.title || '변화 기록'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 left-2 text-[10px] font-bold bg-slate-950/80 text-slate-200 px-2 py-0.5 rounded border border-slate-700">
                {photo.date}
              </div>
            </div>
          ))}

          {/* Add Photo Button Tile */}
          <button
            onClick={onOpenUpload}
            className="flex-shrink-0 w-32 h-44 rounded-xl border-2 border-dashed border-slate-700 hover:border-indigo-500 flex flex-col items-center justify-center gap-2 transition-all bg-slate-900/50 hover:bg-slate-900 text-slate-400 hover:text-indigo-400"
            title="드래그 앤 드롭 또는 클릭하여 사진 추가"
          >
            <span className="material-symbols-outlined text-3xl text-indigo-400">add_a_photo</span>
            <span className="text-xs font-bold">새 사진 추가</span>
          </button>
        </div>
      </section>

      {/* Physical Info Update Button */}
      <div className="pt-2">
        {isEditingMetrics ? (
          <div className="flex gap-3">
            <button
              onClick={() => setIsEditingMetrics(false)}
              className="flex-1 py-4 bg-slate-800 text-slate-200 font-bold rounded-xl text-sm border border-slate-700 hover:bg-slate-700"
            >
              취소
            </button>
            <button
              onClick={handleSaveMetrics}
              className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30"
            >
              <span className="material-symbols-outlined">check</span>
              저장하기
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingMetrics(true)}
            className={`w-full h-14 font-extrabold text-base rounded-xl shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 ${
              isHighContrast
                ? 'bg-[#00ffcc] text-black border-2 border-white'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30 border border-indigo-500/30'
            }`}
          >
            <span className="material-symbols-outlined">sync</span>
            신체 정보 업데이트
          </button>
        )}
      </div>
    </main>
  );
};
