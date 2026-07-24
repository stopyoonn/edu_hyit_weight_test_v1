import React from 'react';
import { AccessibilitySettings, NavigationTab } from '../types';

interface BottomNavProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  accessibilitySettings: AccessibilitySettings;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onNavigate,
  accessibilitySettings,
}) => {
  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const navItems: { id: NavigationTab; label: string; icon: string }[] = [
    { id: 'home', label: '홈', icon: 'dashboard' },
    { id: 'routines', label: '루틴', icon: 'fitness_center' },
    { id: 'log', label: '기록', icon: 'edit_note' },
    { id: 'profile', label: '프로필', icon: 'person' },
    { id: 'help', label: '도움말', icon: 'help_outline' },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 pb-safe transition-colors duration-200 border-t ${
        isHighContrast
          ? 'bg-black border-[#00ffcc] text-white'
          : isLight
          ? 'bg-white border-slate-200 shadow-lg text-slate-700'
          : 'bg-slate-900 border-slate-800 shadow-2xl text-slate-400'
      }`}
      role="navigation"
      aria-label="주 메뉴 탐색"
    >
      {navItems.map((item) => {
        const isActive = currentTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] min-h-[48px] focus:outline-none focus:ring-2 ${
              isActive
                ? isHighContrast
                  ? 'bg-[#00ffcc] text-black font-extrabold border-2 border-white'
                  : isLight
                  ? 'bg-indigo-100 text-indigo-700 font-bold'
                  : 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/40'
                : isHighContrast
                ? 'text-white hover:text-[#00ffcc]'
                : isLight
                ? 'text-slate-500 hover:text-slate-900'
                : 'text-slate-400 hover:text-indigo-400'
            }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`${item.label} 탭으로 이동`}
          >
            <span
              className="material-symbols-outlined text-2xl"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.icon}
            </span>
            <span
              className={`text-xs mt-0.5 ${
                isActive ? 'font-bold' : 'font-medium'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
