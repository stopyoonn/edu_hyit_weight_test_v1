import { UserProfile, ProgressPhoto, DayRoutine, Exercise, DailyWorkoutSummary } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Alex Thompson',
  startDate: '2024년 1월부터 활동 중',
  level: 24,
  levelLabel: '중급자',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  heightCm: 180,
  weightKg: 75,
  bodyFatPercent: 18,
  mainGoal: '근육량 증가',
  experienceLevel: '중급자',
  topPercentage: 15,
};

export const INITIAL_PROGRESS_PHOTOS: ProgressPhoto[] = [
  {
    id: 'p1',
    date: '5월 12일',
    fullDate: '2024-05-12',
    url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    title: '등 후면 포즈 (Gym Harder)',
    note: '광배근 데피니션 및 상부 등 선명도 개선',
    category: 'back',
  },
  {
    id: 'p2',
    date: '4월 28일',
    fullDate: '2024-04-28',
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    title: '복근 및 코어 선명도 체크',
    note: '공복 유산소 및 식단 조절 4주차',
    category: 'front',
  },
  {
    id: 'p3',
    date: '3월 15일',
    fullDate: '2024-03-15',
    url: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    title: '이두/삼두 수축 측면 체크',
    note: '2024년 3월 진행 상황',
    category: 'flex',
  },
];

export const WEEKLY_ROUTINE_DAYS: DayRoutine[] = [
  {
    dayNumber: 1,
    title: '하체',
    subtitle: '스쿼트 & 데드리프트',
    icon: 'check_circle',
    status: 'completed',
  },
  {
    dayNumber: 2,
    title: '등 & 이두',
    subtitle: '오늘의 루틴',
    icon: 'fitness_center',
    status: 'today',
    isToday: true,
  },
  {
    dayNumber: 3,
    title: '휴식',
    subtitle: '적극적 회복',
    icon: 'bedtime',
    status: 'rest',
  },
  {
    dayNumber: 4,
    title: '가슴 & 삼두',
    subtitle: '벤치프레스 & 디핑',
    icon: 'bolt',
    status: 'upcoming',
  },
];

export const TODAY_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    name: '풀업',
    targetDescription: '광배근 및 상부 등 근육 강화',
    targetMuscles: ['광배근', '상부 등'],
    imageUrl: 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=600&q=80',
    setsCount: 4,
    repsText: '실패 지점까지',
    rpeOrWeightOrRest: {
      label: 'RPE',
      value: '9',
    },
    setsData: [
      { setNumber: 1, targetReps: '12회', rpe: 8, completed: true },
      { setNumber: 2, targetReps: '10회', rpe: 8.5, completed: true },
      { setNumber: 3, targetReps: '8회', rpe: 9, completed: false },
      { setNumber: 4, targetReps: '실패지점', rpe: 9.5, completed: false },
    ],
    instructions: [
      '어깨너비보다 넓게 그립을 잡습니다.',
      '가슴을 하늘 방향으로 들어 올리며 광배근의 힘으로 당깁니다.',
      '최고 수축 지점에서 1초간 정지 후 천천히 이완합니다.',
    ],
  },
  {
    id: 'ex-2',
    name: '렛 풀다운',
    targetDescription: '광배근 발달 및 등 너비 확장',
    targetMuscles: ['광배근', '대원근'],
    imageUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80',
    setsCount: 3,
    repsText: '8-12',
    rpeOrWeightOrRest: {
      label: '중량',
      value: '185 lbs',
    },
    setsData: [
      { setNumber: 1, targetReps: '12회', weightLbs: 165, completed: true },
      { setNumber: 2, targetReps: '10회', weightLbs: 185, completed: true },
      { setNumber: 3, targetReps: '8회', weightLbs: 185, completed: false },
    ],
    instructions: [
      '허벅지 패드를 단단히 고정합니다.',
      '바를 쇄골 방향으로 당기면서 팔꿈치를 아래쪽으로 누릅니다.',
      '반동을 최소화하여 광배근 자극에 집중합니다.',
    ],
  },
  {
    id: 'ex-3',
    name: '바벨 로우',
    targetDescription: '등의 두께감 및 중부 승모근 강화',
    targetMuscles: ['중부 승모근', '능형근'],
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    setsCount: 4,
    repsText: '6-8',
    rpeOrWeightOrRest: {
      label: '휴식',
      value: '120초',
    },
    setsData: [
      { setNumber: 1, targetReps: '8회', weightKg: 70, completed: true },
      { setNumber: 2, targetReps: '8회', weightKg: 80, completed: true },
      { setNumber: 3, targetReps: '6회', weightKg: 85, completed: false },
      { setNumber: 4, targetReps: '6회', weightKg: 85, completed: false },
    ],
    instructions: [
      '상체를 45도 정도 숙이고 척추 중립을 유지합니다.',
      '바벨을 배꼽 방향으로 수직으로 끌어올립니다.',
      '견갑골을 조여주며 최대 수축을 느낍니다.',
    ],
  },
  {
    id: 'ex-4',
    name: '바이셉 컬',
    targetDescription: '상완이두근의 선명도 및 크기 증가',
    targetMuscles: ['상완이두근', '상완근'],
    imageUrl: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80',
    setsCount: 3,
    repsText: '12-15',
    rpeOrWeightOrRest: {
      label: '템포',
      value: '3-0-1-0',
    },
    setsData: [
      { setNumber: 1, targetReps: '15회', weightKg: 14, completed: true },
      { setNumber: 2, targetReps: '12회', weightKg: 16, completed: false },
      { setNumber: 3, targetReps: '12회', weightKg: 16, completed: false },
    ],
    instructions: [
      '팔꿈치를 옆구리에 고정합니다.',
      '상완이두근 힘으로 덤벨 또는 바벨을 올립니다.',
      '3초 동안 천천히 버티며 이완합니다.',
    ],
  },
];

export const WORKOUT_CALENDAR_ACTIVE_DAYS: number[] = [2, 4, 6, 7, 9, 13, 15, 16, 18, 20, 23, 25, 27, 29, 30];

export const DAILY_WORKOUT_SUMMARIES: Record<string, DailyWorkoutSummary> = {
  '2024-05-20': {
    dateKey: '2024-05-20',
    displayDate: '5월 20일',
    statusLabel: '완료됨',
    routineName: '등 & 이두 루틴',
    timeRange: '오후 7:30 - 오후 8:35',
    durationMinutes: 65,
    totalVolumeKg: 4200,
    avgHeartRateBpm: 138,
    performedExercises: ['풀업', '바벨 로우', '바이셉 컬', '랫 풀 다운'],
  },
  '2024-05-18': {
    dateKey: '2024-05-18',
    displayDate: '5월 18일',
    statusLabel: '완료됨',
    routineName: '가슴 & 삼두 루틴',
    timeRange: '오전 10:00 - 오전 11:10',
    durationMinutes: 70,
    totalVolumeKg: 5100,
    avgHeartRateBpm: 142,
    performedExercises: ['벤치프레스', '인클라인 덤벨프레스', '딥스', '케이블 트라이셉 익스텐션'],
  },
  '2024-05-16': {
    dateKey: '2024-05-16',
    displayDate: '5월 16일',
    statusLabel: '완료됨',
    routineName: '하체 & 코어 루틴',
    timeRange: '오후 8:00 - 오후 9:15',
    durationMinutes: 75,
    totalVolumeKg: 6800,
    avgHeartRateBpm: 150,
    performedExercises: ['바벨 스쿼트', '루마니안 데드리프트', '레그 프레스', '플랭크'],
  },
};

export const HELP_FAQ_ITEMS = [
  {
    q: 'Apex Athletic에서 드래그 앤 드롭 사진 업로드는 어떻게 하나요?',
    a: '프로필 또는 홈 화면의 [변화 기록] 섹션에서 "새 사진 추가" 카드 위로 PC/모바일에서 이미지를 끌어다 놓으시거나(Drag & Drop), 파일 선택 창 또는 이미지 웹 URL(핫링크) 입력칸에 주소를 직접 붙여넣으시면 실시간 미리보기 후 즉시 업로드할 수 있습니다.',
  },
  {
    q: '고대비(High Contrast) 테마는 어떠한 접근성을 지원하나요?',
    a: '고대비 테마는 시각적 구분이 어려운 사용자를 위해 WCAG AAA 대비율 기준을 준수하는 선명한 네온 컬러 border와 고명도 텍스트를 제공합니다. 또한 초점 명확화(High Contrast Focus)가 적용되어 키보드 탐색 시 손쉽게 위치를 파악할 수 있습니다.',
  },
  {
    q: '운동 기록과 신체 데이터는 어디에 저장되나요?',
    a: 'Apex Athletic의 모든 수치(키, 체지방률, 몸무게, 변화 기록 사진, 운동 수행 로그)는 브라우저 내 안전한 로컬 저장소(localStorage)에 지속적으로 보관되어 앱을 재방문하거나 닫아도 소중한 피트니스 기록이 유지됩니다.',
  },
  {
    q: '키보드 단축키 및 접근성 기능은 어떻게 이용하나요?',
    a: '상단 아이콘이나 접근성 가이드 메뉴에서 [글자 크기 키우기], [줄인 동작 모드], [화면 읽기 스크린리더 지원]을 활성화할 수 있습니다. 키보드 숫자키 1~5번으로 탭 전환이 가능하며, Space키로 세트 완료를 토글할 수 있습니다.',
  },
];
