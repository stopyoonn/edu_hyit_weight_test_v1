import React, { useState, useEffect } from 'react';
import {
  AccessibilitySettings,
  NavigationTab,
  ProgressPhoto,
  UserProfile,
} from './types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_PROGRESS_PHOTOS,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ProfileView } from './components/ProfileView';
import { LogView } from './components/LogView';
import { RoutinesView } from './components/RoutinesView';
import { HomeView } from './components/HomeView';
import { HelpAccessibilityView } from './components/HelpAccessibilityView';
import { ImageUploadModal } from './components/ImageUploadModal';
import { ImagePreviewGalleryModal } from './components/ImagePreviewGalleryModal';
import { ActiveWorkoutModal } from './components/ActiveWorkoutModal';
import { TODAY_EXERCISES } from './data/mockData';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationTab>('profile');

  // Accessibility & Theme State
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('apex_accessibility_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return {
      theme: 'dark',
      textScale: 'normal',
      reduceMotion: false,
      screenReaderAnnouncements: true,
      keyboardNavigationHints: true,
      highContrastFocus: true,
    };
  });

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('apex_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return INITIAL_USER_PROFILE;
  });

  // Progress Photos State
  const [photos, setPhotos] = useState<ProgressPhoto[]>(() => {
    const saved = localStorage.getItem('apex_progress_photos');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        /* fallback */
      }
    }
    return INITIAL_PROGRESS_PHOTOS;
  });

  // Modals
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedPhotoForPreview, setSelectedPhotoForPreview] = useState<ProgressPhoto | null>(null);
  const [isActiveWorkoutOpen, setIsActiveWorkoutOpen] = useState(false);

  // Sync state changes to LocalStorage
  useEffect(() => {
    localStorage.setItem('apex_accessibility_settings', JSON.stringify(accessibilitySettings));
  }, [accessibilitySettings]);

  useEffect(() => {
    localStorage.setItem('apex_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('apex_progress_photos', JSON.stringify(photos));
  }, [photos]);

  // Apply Theme Classes & Font Scale to document root
  useEffect(() => {
    const root = document.documentElement;

    // Reset classes
    root.classList.remove('dark', 'light', 'high-contrast');

    if (accessibilitySettings.theme === 'dark') {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#f1f5f9';
    } else if (accessibilitySettings.theme === 'light') {
      root.classList.add('light');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    } else {
      root.classList.add('high-contrast');
      document.body.style.backgroundColor = '#000000';
      document.body.style.color = '#ffffff';
    }

    // Apply font scale
    if (accessibilitySettings.textScale === 'large') {
      root.style.fontSize = '18px';
    } else if (accessibilitySettings.textScale === 'xlarge') {
      root.style.fontSize = '20px';
    } else {
      root.style.fontSize = '16px';
    }
  }, [accessibilitySettings]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (e.key === '1') setCurrentTab('home');
      if (e.key === '2') setCurrentTab('routines');
      if (e.key === '3') setCurrentTab('log');
      if (e.key === '4') setCurrentTab('profile');
      if (e.key === '5') setCurrentTab('help');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdateAccessibility = (settings: Partial<AccessibilitySettings>) => {
    setAccessibilitySettings((prev) => ({ ...prev, ...settings }));
  };

  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  const handleAddPhoto = (newPhoto: ProgressPhoto) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleDeletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== photoId));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${
        accessibilitySettings.highContrastFocus ? 'focus-visible-high-contrast' : ''
      }`}
    >
      {/* Top Header */}
      <Header
        userProfile={userProfile}
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        accessibilitySettings={accessibilitySettings}
        onUpdateAccessibility={handleUpdateAccessibility}
        onOpenSettings={() => setCurrentTab('help')}
        onOpenUpload={() => setIsUploadModalOpen(true)}
      />

      {/* Main Tab Content */}
      <div className="pb-12">
        {currentTab === 'home' && (
          <HomeView
            userProfile={userProfile}
            photos={photos}
            onNavigate={setCurrentTab}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onStartWorkout={() => setIsActiveWorkoutOpen(true)}
            accessibilitySettings={accessibilitySettings}
          />
        )}

        {currentTab === 'routines' && (
          <RoutinesView
            onStartWorkout={() => setIsActiveWorkoutOpen(true)}
            accessibilitySettings={accessibilitySettings}
          />
        )}

        {currentTab === 'log' && (
          <LogView accessibilitySettings={accessibilitySettings} />
        )}

        {currentTab === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
            photos={photos}
            onOpenUpload={() => setIsUploadModalOpen(true)}
            onSelectPhoto={(photo) => setSelectedPhotoForPreview(photo)}
            accessibilitySettings={accessibilitySettings}
          />
        )}

        {currentTab === 'help' && (
          <HelpAccessibilityView
            accessibilitySettings={accessibilitySettings}
            onUpdateAccessibility={handleUpdateAccessibility}
            onOpenUpload={() => setIsUploadModalOpen(true)}
          />
        )}
      </div>

      {/* Drag & Drop Upload Modal */}
      <ImageUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onAddPhoto={handleAddPhoto}
        accessibilitySettings={accessibilitySettings}
      />

      {/* Progress Photo Detail & Comparison Gallery Modal */}
      <ImagePreviewGalleryModal
        photos={photos}
        selectedPhoto={selectedPhotoForPreview}
        onClose={() => setSelectedPhotoForPreview(null)}
        onDeletePhoto={handleDeletePhoto}
        accessibilitySettings={accessibilitySettings}
      />

      {/* Active Workout Timer Session Modal */}
      <ActiveWorkoutModal
        isOpen={isActiveWorkoutOpen}
        exercises={TODAY_EXERCISES}
        onClose={() => setIsActiveWorkoutOpen(false)}
        onFinishWorkout={({ durationMinutes }) => {
          alert(`축하합니다! ${durationMinutes}분간의 운동을 성공적으로 완료하고 기록했습니다!`);
        }}
        accessibilitySettings={accessibilitySettings}
      />

      {/* Bottom Accessible Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onNavigate={setCurrentTab}
        accessibilitySettings={accessibilitySettings}
      />
    </div>
  );
}
