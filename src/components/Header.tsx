import React from 'react';
import { AccessibilitySettings, NavigationTab, UserProfile } from '../types';

interface HeaderProps {
  userProfile: UserProfile;
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  accessibilitySettings: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  onOpenSettings: () => void;
  onOpenUpload: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userProfile,
  onNavigate,
  accessibilitySettings,
  onUpdateAccessibility,
  onOpenSettings,
  onOpenUpload,
}) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const toggleTheme = () => {
    if (accessibilitySettings.theme === 'dark') {
      onUpdateAccessibility({ theme: 'light' });
    } else if (accessibilitySettings.theme === 'light') {
      onUpdateAccessibility({ theme: 'high-contrast' });
    } else {
      onUpdateAccessibility({ theme: 'dark' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 transition-colors duration-200 border-b ${
      isHighContrast
        ? 'bg-black border-[#00ffcc] text-white'
        : isLight
        ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-sm'
        : 'bg-slate-900/90 backdrop-blur-md border-slate-800 text-slate-100'
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full border-2 border-indigo-500 overflow-hidden transition-transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          title="프로필 보기"
          aria-label="프로필로 이동"
        >
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="w-full h-full object-cover"
          />
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="text-left focus:outline-none flex items-center gap-2"
        >
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <div className="w-3.5 h-3.5 border-2 border-white rounded-sm" />
          </div>
          <h1 className={`font-bold text-xl md:text-2xl tracking-tight ${
            isHighContrast ? 'text-[#00ffcc] underline' : isLight ? 'text-slate-900' : 'text-slate-100'
          }`}>
            Apex Athletic <span className="text-indigo-400 font-normal">Pro</span>
          </h1>
        </button>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Quick Drag & Drop Upload Button */}
        <button
          onClick={onOpenUpload}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all active:scale-95 ${
            isHighContrast
              ? 'bg-[#00ffcc] text-black border-2 border-white'
              : isLight
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm border border-indigo-500/30'
          }`}
          title="사진 업로드 (드래그 앤 드롭 / 핫링크)"
          aria-label="변화 사진 드래그 앤 드롭 업로드 모달 열기"
        >
          <span className="material-symbols-outlined text-lg">add_a_photo</span>
          <span className="hidden sm:inline">사진 추가</span>
        </button>

        {/* Theme Quick Toggle Button */}
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 ${
            isHighContrast
              ? 'bg-yellow-400 text-black font-bold'
              : isLight
              ? 'bg-slate-100 text-slate-800 hover:bg-slate-200'
              : 'bg-slate-800 text-indigo-300 hover:bg-slate-700 border border-slate-700'
          }`}
          title={`현재 테마: ${accessibilitySettings.theme}. 클릭하여 테마 변경`}
          aria-label="테마 전환"
        >
          <span className="material-symbols-outlined text-xl">
            {accessibilitySettings.theme === 'dark' ? 'dark_mode' : accessibilitySettings.theme === 'light' ? 'light_mode' : 'contrast'}
          </span>
        </button>

        {/* Accessibility / Help Quick Link */}
        <button
          onClick={() => onNavigate('help')}
          className={`p-2 rounded-lg transition-all ${
            isHighContrast
              ? 'text-[#00ffcc] border border-[#00ffcc]'
              : isLight
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="도움말 및 접근성 가이드"
          aria-label="도움말 및 접근성 가이드로 이동"
        >
          <span className="material-symbols-outlined text-xl">help_outline</span>
        </button>

        {/* Settings button */}
        <button
          onClick={onOpenSettings}
          className={`p-2 rounded-lg transition-all active:scale-95 ${
            isHighContrast
              ? 'text-white hover:text-[#00ffcc]'
              : isLight
              ? 'text-slate-700 hover:bg-slate-100'
              : 'text-indigo-300 hover:text-white hover:bg-slate-800'
          }`}
          title="설정 및 접근성 옵션"
          aria-label="설정 메뉴 열기"
        >
          <span className="material-symbols-outlined text-xl">settings</span>
        </button>
      </div>
    </header>
  );
};
