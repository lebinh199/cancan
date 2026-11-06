/** Khoa, phần thưởng, cấp độ – có thể thay đổi theo từng trường. */

export interface Faculty {
  id: string;
  name: string;
  short: string;
  /** Điểm nền mô phỏng các thành viên khác (prototype không có máy chủ). */
  basePoints: number;
}

export const FACULTIES: Faculty[] = [
  { id: 'acc', name: 'Khoa Kế toán', short: 'KT', basePoints: 4210 },
  { id: 'ba', name: 'Khoa Quản trị kinh doanh', short: 'QTKD', basePoints: 4580 },
  { id: 'ib', name: 'Khoa Kinh doanh quốc tế', short: 'KDQT', basePoints: 3950 },
  { id: 'fin', name: 'Khoa Tài chính', short: 'TC', basePoints: 3720 },
  { id: 'bank', name: 'Khoa Ngân hàng', short: 'NH', basePoints: 3310 },
  { id: 'mkt', name: 'Khoa Marketing', short: 'MKT', basePoints: 4890 },
  { id: 'tour', name: 'Khoa Du lịch', short: 'DL', basePoints: 3480 },
  { id: 'ecom', name: 'Khoa Thương mại điện tử', short: 'TMĐT', basePoints: 3150 },
  { id: 'sit', name: 'Khoa Thống kê – Tin học', short: 'TKTH', basePoints: 2980 },
  { id: 'eco', name: 'Khoa Kinh tế', short: 'KTe', basePoints: 3600 },
  { id: 'law', name: 'Khoa Luật', short: 'L', basePoints: 2870 },
  { id: 'staff', name: 'Cán bộ – Giảng viên', short: 'CB', basePoints: 2400 },
];

export interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  cost: number;
  stock: number;
}

export const REWARDS: Reward[] = [
  { id: 'coffee', title: 'Giảm 20% đồ uống căng-tin', description: 'Khi mang cốc/bình cá nhân.', icon: '☕', cost: 50, stock: 200 },
  { id: 'tree', title: 'Nhận 1 cây sen đá', description: 'Nhận tại ngày hội "Đổi giấy lấy cây".', icon: '🪴', cost: 120, stock: 80 },
  { id: 'bottle', title: 'Bình nước GreenQuest', description: 'Bình inox in logo trường.', icon: '🧴', cost: 300, stock: 40 },
  { id: 'drl', title: '+2 điểm rèn luyện', description: 'Mục "Hoạt động cộng đồng" – cần CTSV xác nhận.', icon: '🎓', cost: 400, stock: 999 },
  { id: 'plant', title: 'Trồng 1 cây mang tên bạn', description: 'Tại vườn cây Green Campus của trường.', icon: '🌳', cost: 800, stock: 20 },
];

export interface LevelDef {
  level: number;
  title: string;
  minXp: number;
  icon: string;
}

export const LEVELS: LevelDef[] = [
  { level: 1, title: 'Hạt giống', minXp: 0, icon: '🌰' },
  { level: 2, title: 'Mầm xanh', minXp: 100, icon: '🌱' },
  { level: 3, title: 'Cây non', minXp: 300, icon: '🌿' },
  { level: 4, title: 'Cây trưởng thành', minXp: 700, icon: '🪴' },
  { level: 5, title: 'Đại thụ', minXp: 1500, icon: '🌳' },
  { level: 6, title: 'Người giữ rừng', minXp: 3000, icon: '🏞️' },
];
