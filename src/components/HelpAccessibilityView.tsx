import React, { useState } from 'react';
import { AccessibilitySettings, TextScale, ThemeMode } from '../types';
import { HELP_FAQ_ITEMS } from '../data/mockData';

interface HelpAccessibilityViewProps {
  accessibilitySettings: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  onOpenUpload: () => void;
}

export const HelpAccessibilityView: React.FC<HelpAccessibilityViewProps> = ({
  accessibilitySettings,
  onUpdateAccessibility,
  onOpenUpload,
}) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <main className="pt-20 pb-28 px-4 md:px-6 max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2
          className={`text-2xl md:text-3xl font-extrabold flex items-center gap-2 ${
            isHighContrast ? 'text-[#00ffcc]' : isLight ? 'text-indigo-700' : 'text-indigo-400'
          }`}
        >
          <span className="material-symbols-outlined text-3xl">accessibility_new</span>
          도움말 & 접근성 설정
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          모든 사용자가 편안하게 사용할 수 있는 고대비 테마, 시각 및 조작 접근성 옵션을 설정하세요.
        </p>
      </div>

      {/* Accessibility Controls Panel */}
      <section
        className={`p-5 rounded-2xl space-y-5 ${
          isHighContrast
            ? 'bg-black border-4 border-[#00ffcc] text-white'
            : isLight
            ? 'bg-white border border-slate-200 shadow-md text-slate-900'
            : 'bg-slate-900 border border-slate-800 text-slate-100'
        }`}
      >
        <h3 className="text-lg font-bold pb-2 border-b border-slate-800 flex items-center gap-2 text-slate-100">
          <span className="material-symbols-outlined text-emerald-400">tune</span>
          화면 및 테마 접근성
        </h3>

        {/* Theme Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            1. 테마 선택 (다크 모드 / 라이트 모드 / 고대비 테마)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onUpdateAccessibility({ theme: 'dark' })}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                accessibilitySettings.theme === 'dark'
                  ? 'bg-slate-950 border-indigo-500 text-indigo-400 font-extrabold ring-2 ring-indigo-500/40'
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              <span className="material-symbols-outlined">dark_mode</span>
              <span className="text-xs">다크 모드</span>
            </button>

            <button
              onClick={() => onUpdateAccessibility({ theme: 'light' })}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                accessibilitySettings.theme === 'light'
                  ? 'bg-slate-100 border-indigo-600 text-indigo-700 font-extrabold ring-2 ring-indigo-600/40'
                  : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              <span className="material-symbols-outlined">light_mode</span>
              <span className="text-xs">라이트 모드</span>
            </button>

            <button
              onClick={() => onUpdateAccessibility({ theme: 'high-contrast' })}
              className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center gap-1 ${
                accessibilitySettings.theme === 'high-contrast'
                  ? 'bg-black border-[#00ffcc] text-[#00ffcc] font-extrabold ring-2 ring-[#00ffcc]'
                  : 'bg-black border-yellow-400 text-yellow-300 hover:border-[#00ffcc]'
              }`}
            >
              <span className="material-symbols-outlined">contrast</span>
              <span className="text-xs">고대비 (High Contrast)</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            * 고대비 테마는 약시 또는 저시력 사용자를 위해 높은 대비율(WCAG AAA)로 요소들을 명확하게 강조합니다.
          </p>
        </div>

        {/* Text Scale Selector */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            2. 글자 크기 확대 (Font Scale)
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['normal', 'large', 'xlarge'] as TextScale[]).map((scale) => {
              const labelMap = { normal: '기본 (100%)', large: '크게 (115%)', xlarge: '매우 크게 (130%)' };
              const isSelected = accessibilitySettings.textScale === scale;
              return (
                <button
                  key={scale}
                  onClick={() => onUpdateAccessibility({ textScale: scale })}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                      : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-slate-500'
                  }`}
                >
                  {labelMap[scale]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles: Reduce Motion, High Contrast Focus */}
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            3. 동작 및 초점 보조 기능
          </label>

          <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-sm font-bold block text-slate-100">줄인 동작 모드 (Reduce Motion)</span>
              <span className="text-xs text-slate-400">화면 전환 애니메이션 및 화면 흔들림을 최소화합니다.</span>
            </div>
            <button
              onClick={() => onUpdateAccessibility({ reduceMotion: !accessibilitySettings.reduceMotion })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                accessibilitySettings.reduceMotion ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  accessibilitySettings.reduceMotion ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-sm font-bold block text-slate-100">키보드 초점 가시성 강화</span>
              <span className="text-xs text-slate-400">키보드로 탐색 시 포커스 영역을 밝은 테두리로 크게 표시합니다.</span>
            </div>
            <button
              onClick={() => onUpdateAccessibility({ highContrastFocus: !accessibilitySettings.highContrastFocus })}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                accessibilitySettings.highContrastFocus ? 'bg-indigo-600' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  accessibilitySettings.highContrastFocus ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Guide */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-slate-100">
        <h3 className="text-base font-bold flex items-center gap-2 text-indigo-400">
          <span className="material-symbols-outlined">keyboard</span>
          키보드 단축키 가이드
        </h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
            <span className="text-slate-400">1 ~ 5 번 키</span>
            <span className="font-bold text-emerald-400">탭 메인 이동</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Space 키</span>
            <span className="font-bold text-emerald-400">세트 완료 체크</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Esc 키</span>
            <span className="font-bold text-emerald-400">모달 창 닫기</span>
          </div>
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex justify-between">
            <span className="text-slate-400">Tab 키</span>
            <span className="font-bold text-emerald-400">다음 포커스 이동</span>
          </div>
        </div>
      </section>

      {/* Detailed Drag & Drop Upload Guide */}
      <section className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-slate-100">
        <h3 className="text-base font-bold flex items-center gap-2 text-emerald-400">
          <span className="material-symbols-outlined">cloud_upload</span>
          드래그 앤 드롭 & 이미지 핫링크 기능 설명
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Apex Athletic은 사진 파일을 드래그하여 바로 올릴 수 있는 Drag & Drop 업로더 및 외부 이미지 URL(핫링크)을 직접 붙여넣어 사용하는 편의 기능을 완벽 지원합니다.
        </p>
        <button
          onClick={onOpenUpload}
          className="w-full py-3 bg-indigo-600 text-white hover:bg-indigo-500 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
        >
          <span className="material-symbols-outlined text-base">add_a_photo</span>
          드래그 앤 드롭 업로더 모달 바로 열기
        </button>
      </section>

      {/* Accessible FAQ Accordion */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
          <span className="material-symbols-outlined text-indigo-300">quiz</span>
          자주 묻는 질문 (FAQ)
        </h3>

        <div className="space-y-2">
          {HELP_FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-sm flex justify-between items-center text-slate-100 hover:bg-slate-800"
                  aria-expanded={isOpen}
                >
                  <span>Q. {item.q}</span>
                  <span className="material-symbols-outlined text-slate-400">
                    {isOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-300 bg-slate-950 border-t border-slate-800 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};
