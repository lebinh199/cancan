# GreenQuest 🌱

Ứng dụng web (PWA) **giáo dục + game hoá** giúp sinh viên, giảng viên học – hành động – thi đua vì một **Green University**.

- 📄 Tài liệu nghiên cứu & thiết kế: [`docs/NGHIEN-CUU.md`](docs/NGHIEN-CUU.md)
- 📐 Phân tích chuẩn Đại học Xanh (UI GreenMetric 2026, THE, QS, văn bản VN) → người cần, tính năng ưu tiên: [`docs/CHUAN-DH-XANH.md`](docs/CHUAN-DH-XANH.md)
- 📏 Đo lường thực tế (hành vi nào đo được, đo ở đâu, đo tập thể thế nào): [`docs/DO-LUONG.md`](docs/DO-LUONG.md)
- 🧩 Đây là **bản mẫu (MVP)**: dữ liệu lưu trên thiết bị, dữ liệu cộng đồng là mô phỏng.

## Tính năng

| Màn hình | Nội dung |
|---|---|
| Trang chủ | Cấp độ & XP, chuỗi ngày 🔥, 3 nhiệm vụ hôm nay, cây tập thể của khoa, tác động (CO₂, kWh, nhựa, nước), bảng tin campus |
| Hành động | 15 hành động xanh thuộc 6 nhóm, gắn tiêu chí UI GreenMetric, giới hạn lượt/ngày, ghi chú |
| Học | Bài học dạng thẻ 3 phút + quiz, chỉ thưởng phần cải thiện |
| Xếp hạng | Thi đua theo khoa và cá nhân |
| Hồ sơ | Hồ sơ xanh theo nhóm, 14 huy hiệu, đổi Điểm Xanh 🍃 lấy quà, lịch sử |

## Chạy thử

```bash
cd green-campus
npm install
npm run dev      # http://localhost:5173
npm test         # unit test cho engine game hoá
npm run build    # bản tĩnh trong dist/ – deploy lên bất kỳ static hosting nào
```

## Cấu trúc

```
src/
  data/       actions.ts (hành động + hệ số tác động), lessons.ts, catalog.ts (khoa, quà, cấp độ)
  game/       engine.ts (logic thuần + test), store.tsx (React state + localStorage), social.ts (dữ liệu mô phỏng)
  views/      Onboarding, Home, Act, Learn, Rank, Me
  components/ CampusTree, Progress, Toasts
```

Tuỳ biến cho trường khác: sửa danh sách khoa, hành động, bài học, phần thưởng trong `src/data/`.
