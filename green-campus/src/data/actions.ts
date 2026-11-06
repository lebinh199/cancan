/**
 * Danh mục hành động xanh. Mỗi hành động gắn với một tiêu chí của
 * UI GreenMetric để nhà trường có thể tổng hợp dữ liệu phục vụ báo cáo.
 *
 * Hệ số tác động là ƯỚC TÍNH để giáo dục (xem docs/NGHIEN-CUU.md, mục 6.3).
 * Hệ số phát thải lưới điện Việt Nam lấy tròn 0,66 kg CO2/kWh.
 */
export type Category = 'energy' | 'waste' | 'water' | 'transport' | 'food' | 'community';

export interface Impact {
  co2Kg?: number;
  kwh?: number;
  plasticG?: number;
  waterL?: number;
}

export interface GreenAction {
  id: string;
  title: string;
  description: string;
  category: Category;
  icon: string;
  xp: number;
  points: number;
  /** Số lần tối đa được ghi nhận mỗi ngày (chống gian lận / spam). */
  dailyLimit: number;
  impact: Impact;
}

export const CATEGORIES: Record<Category, { label: string; color: string; greenMetric: string }> = {
  energy: { label: 'Năng lượng', color: '#e0a100', greenMetric: 'EC – Energy & Climate Change' },
  waste: { label: 'Rác thải', color: '#8a5a2b', greenMetric: 'WS – Waste' },
  water: { label: 'Nước', color: '#1d7fc4', greenMetric: 'WR – Water' },
  transport: { label: 'Di chuyển', color: '#6b4fbb', greenMetric: 'TR – Transportation' },
  food: { label: 'Ăn uống', color: '#d0563b', greenMetric: 'EC / WS' },
  community: { label: 'Cộng đồng', color: '#1f7a4d', greenMetric: 'ED – Education & Research' },
};

export const ACTIONS: GreenAction[] = [
  {
    id: 'bottle',
    title: 'Dùng bình nước cá nhân',
    description: 'Từ chối chai nhựa dùng một lần, mang bình riêng tới lớp.',
    category: 'waste',
    icon: '🥤',
    xp: 10,
    points: 5,
    dailyLimit: 2,
    impact: { co2Kg: 0.08, plasticG: 20 },
  },
  {
    id: 'bag',
    title: 'Mang túi vải / từ chối túi nilon',
    description: 'Khi mua đồ ở căng-tin hoặc cửa hàng quanh trường.',
    category: 'waste',
    icon: '👜',
    xp: 8,
    points: 4,
    dailyLimit: 2,
    impact: { co2Kg: 0.03, plasticG: 8 },
  },
  {
    id: 'sort',
    title: 'Phân loại rác đúng thùng',
    description: 'Tách rác tái chế, hữu cơ và rác còn lại tại điểm thu gom.',
    category: 'waste',
    icon: '♻️',
    xp: 10,
    points: 5,
    dailyLimit: 3,
    impact: { co2Kg: 0.1 },
  },
  {
    id: 'lights',
    title: 'Tắt đèn, quạt, điều hoà khi rời phòng',
    description: 'Người cuối cùng rời phòng học là "người giữ điện".',
    category: 'energy',
    icon: '💡',
    xp: 12,
    points: 6,
    dailyLimit: 3,
    impact: { kwh: 1, co2Kg: 0.66 },
  },
  {
    id: 'stairs',
    title: 'Đi thang bộ thay thang máy',
    description: 'Tốt cho sức khoẻ, tiết kiệm điện.',
    category: 'energy',
    icon: '🪜',
    xp: 6,
    points: 3,
    dailyLimit: 4,
    impact: { kwh: 0.05, co2Kg: 0.03 },
  },
  {
    id: 'ac26',
    title: 'Đặt điều hoà ≥ 26°C',
    description: 'Mỗi độ tăng lên tiết kiệm khoảng 5–7% điện năng.',
    category: 'energy',
    icon: '🌡️',
    xp: 8,
    points: 4,
    dailyLimit: 1,
    impact: { kwh: 0.5, co2Kg: 0.33 },
  },
  {
    id: 'digital',
    title: 'Nộp bài / học bằng tài liệu số',
    description: 'Hạn chế in ấn; nếu cần in thì in hai mặt.',
    category: 'energy',
    icon: '📄',
    xp: 6,
    points: 3,
    dailyLimit: 2,
    impact: { co2Kg: 0.05 },
  },
  {
    id: 'tap',
    title: 'Khoá vòi nước khi không dùng',
    description: 'Khi rửa tay, đánh răng ở ký túc xá.',
    category: 'water',
    icon: '🚰',
    xp: 6,
    points: 3,
    dailyLimit: 3,
    impact: { waterL: 6 },
  },
  {
    id: 'shower',
    title: 'Tắm dưới 5 phút',
    description: 'Dành cho sinh viên ở ký túc xá.',
    category: 'water',
    icon: '🚿',
    xp: 8,
    points: 4,
    dailyLimit: 1,
    impact: { waterL: 30, kwh: 0.3, co2Kg: 0.2 },
  },
  {
    id: 'bike',
    title: 'Đi bộ / xe đạp tới trường',
    description: 'Thay cho một chuyến xe máy khoảng 5 km.',
    category: 'transport',
    icon: '🚲',
    xp: 15,
    points: 8,
    dailyLimit: 2,
    impact: { co2Kg: 0.5 },
  },
  {
    id: 'bus',
    title: 'Đi xe buýt / đi chung xe',
    description: 'Giảm số phương tiện cá nhân vào khuôn viên.',
    category: 'transport',
    icon: '🚌',
    xp: 12,
    points: 6,
    dailyLimit: 2,
    impact: { co2Kg: 0.35 },
  },
  {
    id: 'veggie',
    title: 'Một bữa ăn chay / ít thịt',
    description: 'Thực phẩm từ thực vật có dấu chân carbon thấp hơn nhiều.',
    category: 'food',
    icon: '🥗',
    xp: 12,
    points: 6,
    dailyLimit: 1,
    impact: { co2Kg: 1 },
  },
  {
    id: 'nowaste',
    title: 'Ăn hết khẩu phần, không bỏ thừa',
    description: 'Lấy vừa đủ ở căng-tin.',
    category: 'food',
    icon: '🍱',
    xp: 8,
    points: 4,
    dailyLimit: 2,
    impact: { co2Kg: 0.2 },
  },
  {
    id: 'report',
    title: 'Báo cáo điểm lãng phí',
    description: 'Vòi rò rỉ, đèn sáng ban ngày, thùng rác đầy… gửi cho phòng Quản trị.',
    category: 'community',
    icon: '📣',
    xp: 20,
    points: 10,
    dailyLimit: 2,
    impact: {},
  },
  {
    id: 'event',
    title: 'Tham gia sự kiện xanh',
    description: 'Trồng cây, nhặt rác, đổi giấy lấy cây, hội thảo… (quét QR tại sự kiện).',
    category: 'community',
    icon: '🌳',
    xp: 40,
    points: 25,
    dailyLimit: 1,
    impact: { co2Kg: 2 },
  },
];

export const ACTION_BY_ID: Record<string, GreenAction> = Object.fromEntries(
  ACTIONS.map((a) => [a.id, a]),
);
