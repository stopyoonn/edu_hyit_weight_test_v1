import React, { useState, useRef } from 'react';
import { AccessibilitySettings, ProgressPhoto } from '../types';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPhoto: (photo: ProgressPhoto) => void;
  accessibilitySettings: AccessibilitySettings;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  onAddPhoto,
  accessibilitySettings,
}) => {
  if (!isOpen) return null;

  const isHighContrast = accessibilitySettings.theme === 'high-contrast';
  const isLight = accessibilitySettings.theme === 'light';

  // Drag & drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [imageUrl, setImageUrl] = useState('');
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [category, setCategory] = useState<'front' | 'back' | 'side' | 'flex'>('front');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('이미지 파일(JPG, PNG, WEBP 등)만 업로드할 수 있습니다.');
      return;
    }
    setErrorMessage('');
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPreviewSrc(event.target.result as string);
        setImageUrl(''); // Clear hotlink text
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  // Hotlink URL change
  const handleHotlinkChange = (url: string) => {
    setImageUrl(url);
    if (url.trim()) {
      setPreviewSrc(url.trim());
      setErrorMessage('');
    } else {
      setPreviewSrc(null);
    }
  };

  // Preset sample hotlink images for convenience
  const handleSampleHotlink = (sampleUrl: string, sampleTitle: string) => {
    setImageUrl(sampleUrl);
    setPreviewSrc(sampleUrl);
    setTitle(sampleTitle);
    setErrorMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewSrc || imageUrl;
    if (!finalUrl) {
      setErrorMessage('이미지 파일 또는 이미지 URL(핫링크)을 입력해주세요.');
      return;
    }

    // Format display date e.g. "5월 20일"
    const dateObj = new Date(selectedDate);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const displayDateStr = `${month}월 ${day}일`;

    const newPhoto: ProgressPhoto = {
      id: 'photo-' + Date.now(),
      date: displayDateStr,
      fullDate: selectedDate,
      url: finalUrl,
      title: title || `${displayDateStr} 변화 기록`,
      note: note || '신체 변화 기록 사진',
      category: category,
    };

    onAddPhoto(newPhoto);
    // Reset and close
    setPreviewSrc(null);
    setImageUrl('');
    setTitle('');
    setNote('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div
        className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-all duration-200 max-h-[90vh] overflow-y-auto ${
          isHighContrast
            ? 'bg-black border-4 border-[#00ffcc] text-white'
            : isLight
            ? 'bg-white border border-slate-200 text-slate-900'
            : 'bg-slate-900 border border-slate-800 text-slate-100'
        }`}
      >
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-800">
          <h2
            id="upload-modal-title"
            className={`text-xl font-bold flex items-center gap-2 ${
              isHighContrast ? 'text-[#00ffcc]' : isLight ? 'text-indigo-700' : 'text-indigo-400'
            }`}
          >
            <span className="material-symbols-outlined">add_a_photo</span>
            변화 기록 사진 업로드
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="닫기"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-red-400">error</span>
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Drag & Drop Zone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-slate-400">
              1. 파일 드래그 앤 드롭 또는 선택
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                  : isHighContrast
                  ? 'border-[#00ffcc] hover:bg-[#00ffcc]/10'
                  : isLight
                  ? 'border-slate-300 hover:border-indigo-600 bg-slate-50'
                  : 'border-slate-800 hover:border-indigo-500 bg-slate-950'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
                aria-label="사진 파일 직접 선택"
              />
              <span className="material-symbols-outlined text-4xl text-indigo-400 mb-2">
                cloud_upload
              </span>
              <p className="font-semibold text-sm mb-1 text-slate-200">
                이곳에 사진을 끌어다 놓으세요 (Drag & Drop)
              </p>
              <p className="text-xs text-slate-400">
                또는 클릭하여 내 기기에서 이미지 선택 (JPG, PNG, WEBP)
              </p>
            </div>
          </div>

          {/* HTML Hotlink Image URL Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
              2. 이미지 URL (핫링크) 직접 입력
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => handleHotlinkChange(e.target.value)}
                placeholder="https://example.com/my-progress-photo.jpg"
                className={`flex-grow px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 ${
                  isHighContrast
                    ? 'bg-black border-[#00ffcc] text-white focus:ring-[#00ffcc]'
                    : isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-900 focus:ring-indigo-600'
                    : 'bg-slate-950 border-slate-800 text-slate-100 focus:ring-indigo-500'
                }`}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              * 웹에 있는 이미지 주소를 복사하여 붙여넣으면 즉시 불러옵니다.
            </p>

            {/* Quick Sample Hotlink Buttons */}
            <div className="mt-2 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-slate-400 font-semibold">샘플 핫링크:</span>
              <button
                type="button"
                onClick={() =>
                  handleSampleHotlink(
                    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
                    '등 근육 포즈 체크'
                  )
                }
                className="text-[11px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30"
              >
                등 포즈
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSampleHotlink(
                    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
                    '복근 체크'
                  )
                }
                className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30"
              >
                복근 포즈
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSampleHotlink(
                    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
                    '팔 근육 수축 포즈'
                  )
                }
                className="text-[11px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30"
              >
                이두 포즈
              </button>
            </div>
          </div>

          {/* Live Image Preview Section */}
          {previewSrc && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="block text-xs font-bold uppercase tracking-wider mb-2 text-indigo-400 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">visibility</span>
                실시간 이미지 미리보기
              </span>
              <div className="relative w-full h-56 rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center border border-slate-800">
                <img
                  src={previewSrc}
                  alt="미리보기"
                  className="w-full h-full object-cover"
                  onError={() => {
                    setErrorMessage('이미지 URL을 불러올 수 없습니다. URL을 확인해 주세요.');
                    setPreviewSrc(null);
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewSrc(null);
                    setImageUrl('');
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-slate-100 hover:bg-red-600 transition-colors"
                  title="미리보기 지우기"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          )}

          {/* Additional Metadata Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">촬영 날짜</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  isHighContrast
                    ? 'bg-black border-[#00ffcc] text-white'
                    : isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-slate-800 text-slate-100'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">부위 / 카테고리</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className={`w-full px-3 py-2 text-sm rounded-lg border ${
                  isHighContrast
                    ? 'bg-black border-[#00ffcc] text-white'
                    : isLight
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-slate-950 border-slate-800 text-slate-100'
                }`}
              >
                <option value="front">전면 (Front)</option>
                <option value="back">후면 (Back)</option>
                <option value="side">측면 (Side)</option>
                <option value="flex">수축/포즈 (Flex)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">사진 제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 5월 20일 등 근육 데피니션"
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                isHighContrast
                  ? 'bg-black border-[#00ffcc] text-white'
                  : isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-slate-950 border-slate-800 text-slate-100'
              }`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">메모 / 특이사항</label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="예: 체지방 18% 유지, 공복 상태 촬영"
              className={`w-full px-3 py-2 text-sm rounded-lg border ${
                isHighContrast
                  ? 'bg-black border-[#00ffcc] text-white'
                  : isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-900'
                  : 'bg-slate-950 border-slate-800 text-slate-100'
              }`}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold border ${
                isLight
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                  : 'border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              취소
            </button>
            <button
              type="submit"
              className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform ${
                isHighContrast
                  ? 'bg-[#00ffcc] text-black font-extrabold border-2 border-white'
                  : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'
              }`}
            >
              <span className="material-symbols-outlined text-lg">check_circle</span>
              변화 사진 저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
