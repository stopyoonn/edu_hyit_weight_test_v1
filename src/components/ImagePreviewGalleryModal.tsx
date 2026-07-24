import React, { useState } from 'react';
import { AccessibilitySettings, ProgressPhoto } from '../types';

interface ImagePreviewGalleryModalProps {
  photos: ProgressPhoto[];
  selectedPhoto: ProgressPhoto | null;
  onClose: () => void;
  onDeletePhoto: (photoId: string) => void;
  accessibilitySettings: AccessibilitySettings;
}

export const ImagePreviewGalleryModal: React.FC<ImagePreviewGalleryModalProps> = ({
  photos,
  selectedPhoto,
  onClose,
  onDeletePhoto,
  accessibilitySettings,
}) => {
  if (!selectedPhoto) return null;

  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  const [compareWithPhotoId, setCompareWithPhotoId] = useState<string | null>(null);
  const comparePhoto = photos.find((p) => p.id === compareWithPhotoId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/90 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="변화 기록 상세보기 및 비교"
    >
      <div
        className={`w-full max-w-4xl rounded-2xl p-4 md:p-6 shadow-2xl transition-all max-h-[92vh] overflow-y-auto ${
          isHighContrast
            ? 'bg-black border-4 border-[#00ffcc] text-white'
            : isLight
            ? 'bg-white text-slate-900 border border-slate-200'
            : 'bg-slate-900 text-slate-100 border border-slate-800'
        }`}
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-slate-100">
              <span className="material-symbols-outlined text-indigo-400">photo_camera</span>
              {selectedPhoto.title || `${selectedPhoto.date} 변화 기록`}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              촬영일자: {selectedPhoto.fullDate || selectedPhoto.date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Side-by-Side Photo View or Single Photo View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Main Selected Photo */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-wider">
              [현재 선택된 사진 - {selectedPhoto.date}]
            </span>
            <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title || '변화 사진'}
                className="w-full h-full object-contain"
              />
              <span className="absolute bottom-2 left-2 text-xs bg-slate-950/80 text-slate-200 px-2.5 py-1 rounded-md font-bold border border-slate-800">
                {selectedPhoto.date}
              </span>
            </div>
            {selectedPhoto.note && (
              <p className="text-xs text-slate-300 mt-2 bg-slate-950/50 p-2 rounded-lg w-full text-center border border-slate-800">
                💬 {selectedPhoto.note}
              </p>
            )}
          </div>

          {/* Comparison Photo (if selected) or Selector */}
          <div className="flex flex-col items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wider">
              [비교할 과거 사진 선택]
            </span>

            {comparePhoto ? (
              <div className="w-full flex flex-col items-center">
                <div className="relative w-full h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  <img
                    src={comparePhoto.url}
                    alt={comparePhoto.title || '비교 사진'}
                    className="w-full h-full object-contain"
                  />
                  <span className="absolute bottom-2 left-2 text-xs bg-slate-950/80 text-slate-200 px-2.5 py-1 rounded-md font-bold border border-slate-800">
                    {comparePhoto.date}
                  </span>
                  <button
                    onClick={() => setCompareWithPhotoId(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-slate-100 hover:bg-red-600"
                    title="비교 해제"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                {comparePhoto.note && (
                  <p className="text-xs text-slate-300 mt-2 bg-slate-950/50 p-2 rounded-lg w-full text-center border border-slate-800">
                    💬 {comparePhoto.note}
                  </p>
                )}
              </div>
            ) : (
              <div className="w-full h-80 rounded-xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center p-4 text-center bg-slate-950/50">
                <span className="material-symbols-outlined text-4xl text-slate-500 mb-2">
                  compare
                </span>
                <p className="text-sm font-semibold mb-2 text-slate-300">
                  다른 날짜 사진과 1:1 비교하기
                </p>
                <div className="flex flex-wrap gap-2 justify-center max-h-40 overflow-y-auto">
                  {photos
                    .filter((p) => p.id !== selectedPhoto.id)
                    .map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setCompareWithPhotoId(p.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30"
                      >
                        {p.date} 비교
                      </button>
                    ))}
                  {photos.length <= 1 && (
                    <p className="text-xs text-slate-400">
                      비교할 과거 사진이 없거나 추가 사진이 필요합니다.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-800">
          <button
            onClick={() => {
              if (confirm('이 변화 기록 사진을 삭제하시겠습니까?')) {
                onDeletePhoto(selectedPhoto.id);
                onClose();
              }
            }}
            className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/60 border border-red-500/30 flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">delete</span>
            사진 삭제
          </button>

          <button
            onClick={onClose}
            className={`px-5 py-2 text-sm font-bold rounded-xl transition-all ${
              isHighContrast
                ? 'bg-[#00ffcc] text-black'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md'
            }`}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
