# GreenQuest – Nghiên cứu & thiết kế ứng dụng giáo dục, game hoá nhằm nâng cao ý thức và hành động xây dựng Green University

> Tài liệu đề xuất đề tài / dự án. Đi kèm bản mẫu (prototype) chạy được trong thư mục `green-campus/`.

---

## 1. Bối cảnh và vấn đề

- Phát triển bền vững đã trở thành định hướng chung của giáo dục đại học: các trường tham gia bảng xếp hạng **UI GreenMetric**, **THE Impact Rankings** (theo 17 SDGs), và Việt Nam cam kết **phát thải ròng bằng 0 vào năm 2050** (COP26).
- Phần lớn các tiêu chí "trường xanh" (điện, nước, rác, giao thông) **phụ thuộc trực tiếp vào hành vi hằng ngày** của hàng chục nghìn sinh viên, giảng viên, nhân viên – không chỉ vào đầu tư hạ tầng.
- Các khảo sát về môi trường trong sinh viên thường cho thấy một **"khoảng cách thái độ – hành vi"** (attitude–behaviour gap): người học có hiểu biết và thái độ tích cực nhưng không chuyển thành hành động đều đặn. Nguyên nhân thường gặp: thiếu nhắc nhở đúng lúc, không thấy kết quả của hành động cá nhân, không có động lực xã hội, thiếu kênh để tham gia.
- Các hoạt động truyền thống (hội thảo, chiến dịch một ngày, băng rôn) tạo nhận thức ngắn hạn nhưng **khó duy trì thói quen** và **không đo lường được**.

**Vấn đề nghiên cứu:** Làm thế nào để một ứng dụng di động kết hợp giáo dục ngắn (micro-learning) và cơ chế game hoá có thể (1) nâng cao nhận thức, (2) chuyển nhận thức thành hành vi xanh lặp lại, và (3) tạo dữ liệu hữu ích cho nhà trường trong lộ trình Green University?

## 2. Mục tiêu và câu hỏi nghiên cứu

**Mục tiêu tổng quát:** Thiết kế, phát triển và đánh giá ứng dụng *GreenQuest* cho cộng đồng trường đại học.

**Mục tiêu cụ thể**
1. Xác định các hành vi xanh trọng tâm của sinh viên gắn với tiêu chí UI GreenMetric.
2. Xây dựng mô hình game hoá dựa trên lý thuyết thay đổi hành vi.
3. Phát triển ứng dụng (MVP → bản chính thức) và thử nghiệm thực địa.
4. Đánh giá tác động lên nhận thức, ý định và hành vi; ước tính tác động môi trường.

**Câu hỏi nghiên cứu**
- RQ1: Những yếu tố nào (thái độ, chuẩn chủ quan, nhận thức kiểm soát, động lực game) ảnh hưởng đến ý định và hành vi xanh của sinh viên khi dùng ứng dụng?
- RQ2: Những cơ chế game hoá nào (điểm, huy hiệu, bảng xếp hạng, nhiệm vụ, thi đua tập thể, phần thưởng) có hiệu quả nhất, và có làm suy giảm động lực nội tại không?
- RQ3: Sau thời gian thử nghiệm, hành vi và chỉ số vận hành của trường (điện, rác phân loại…) có thay đổi đáng kể so với nhóm đối chứng / cùng kỳ không?

## 3. Cơ sở lý thuyết

### 3.1 Green University và UI GreenMetric

UI GreenMetric World University Rankings (Universitas Indonesia, từ 2010) đánh giá 6 nhóm tiêu chí:

| Mã | Nhóm tiêu chí | Trọng số | Hành vi cá nhân có thể đóng góp |
|---|---|---|---|
| SI | Setting & Infrastructure | 15% | Chăm sóc cây xanh, giữ gìn không gian xanh |
| EC | Energy & Climate Change | 21% | Tắt thiết bị, điều hoà ≥ 26°C, thang bộ, hạn chế in |
| WS | Waste | 18% | Từ chối nhựa dùng một lần, phân loại rác, không bỏ thừa thức ăn |
| WR | Water | 10% | Khoá vòi, tắm ngắn, báo rò rỉ |
| TR | Transportation | 18% | Đi bộ, xe đạp, xe buýt, đi chung xe |
| ED | Education & Research | 18% | Học, tham gia sự kiện, câu lạc bộ, nghiên cứu về bền vững |

→ Trong GreenQuest, **mọi hành động đều được gắn mã tiêu chí**, nên dữ liệu tổng hợp có thể dùng làm minh chứng hoạt động cộng đồng (đặc biệt cho ED) và chỉ ra điểm nóng cần cải thiện.

### 3.2 Lý thuyết thay đổi hành vi

| Lý thuyết | Ý chính | Áp dụng vào thiết kế |
|---|---|---|
| **Theory of Planned Behaviour** (Ajzen, 1991) | Ý định ← Thái độ + Chuẩn chủ quan + Nhận thức kiểm soát hành vi | Bài học thay đổi thái độ; bảng tin & thi đua khoa tạo chuẩn xã hội; hành động nhỏ, cụ thể tăng cảm giác "làm được" |
| **Fogg Behavior Model** (B = M·A·P) | Hành vi xảy ra khi Động lực, Khả năng và Lời nhắc cùng xuất hiện | Nhiệm vụ đơn giản (≤ 1 phút), nút "Đã làm" 1 chạm, nhắc nhở theo ngữ cảnh (giờ ra về, giờ ăn trưa) |
| **COM-B / Behaviour Change Wheel** (Michie et al., 2011) | Capability – Opportunity – Motivation | Capability: micro-learning; Opportunity: QR tại thùng rác/sự kiện, kênh báo cáo lãng phí; Motivation: game hoá |
| **Self-Determination Theory** (Deci & Ryan) | Động lực nội tại cần Tự chủ – Năng lực – Gắn kết | Cho chọn hành động (tự chủ), cấp độ/huy hiệu (năng lực), cây tập thể của khoa (gắn kết) |
| **Hình thành thói quen** (Lally et al., 2010) | Thói quen hình thành trung bình ~66 ngày (dao động lớn), cần lặp lại trong cùng ngữ cảnh | Chuỗi ngày (streak), nhiệm vụ hằng ngày, mốc 7/21 ngày; chiến dịch kéo dài ≥ 8–10 tuần |

### 3.3 Game hoá (Gamification)

- Định nghĩa: *sử dụng các yếu tố thiết kế game trong bối cảnh không phải game* (Deterding et al., 2011).
- Tổng quan thực nghiệm (Hamari, Koivisto & Sarsa, 2014): game hoá **nhìn chung có tác động tích cực**, nhưng phụ thuộc vào bối cảnh và đặc điểm người dùng; hiệu ứng mới lạ (novelty effect) có thể giảm dần.
- Khung **Octalysis** (Yu-kai Chou) – 8 động lực cốt lõi, dùng để kiểm tra độ phủ của thiết kế:

| Động lực Octalysis | Cơ chế trong GreenQuest |
|---|---|
| 1. Ý nghĩa & sứ mệnh | Thông điệp "cùng xây Green University", quy đổi tác động ra kg CO₂ / số cây |
| 2. Phát triển & thành tựu | XP, 6 cấp độ (Hạt giống → Người giữ rừng), huy hiệu |
| 3. Sáng tạo & phản hồi | Báo cáo điểm lãng phí, (roadmap) đề xuất sáng kiến xanh |
| 4. Sở hữu | Điểm Xanh, bộ sưu tập huy hiệu, cây mang tên mình |
| 5. Ảnh hưởng xã hội | Bảng tin campus, xếp hạng khoa, (roadmap) thử thách nhóm bạn |
| 6. Khan hiếm & nóng lòng | Quà số lượng có hạn, nhiệm vụ chỉ trong ngày |
| 7. Bất ngờ | Thưởng chuỗi ngày, (roadmap) sự kiện ngẫu nhiên "giờ vàng" |
| 8. Sợ mất | Chuỗi ngày bị reset nếu bỏ lỡ (dùng tiết chế) |

**Rủi ro cần kiểm soát:** hiệu ứng *overjustification* (phần thưởng vật chất làm giảm động lực nội tại), gian lận để lấy điểm, cạnh tranh gây áp lực. Giải pháp: phần thưởng chủ yếu mang tính biểu tượng/cộng đồng, thi đua **tập thể** quan trọng hơn cá nhân, giới hạn số lần/ngày, xác minh minh chứng, bảng xếp hạng reset theo tháng.

### 3.4 Các ứng dụng tham khảo

- **JouleBug, Aworld, Klima, Earth Hero**: ứng dụng theo dõi thói quen bền vững, thử thách, tính dấu chân carbon.
- **Ecosia, Forest**: dùng hình ảnh cây xanh làm phản hồi trực quan cho hành vi.
- **Duolingo**: chuẩn mực về micro-learning, streak, nhắc nhở.

**Khoảng trống:** các ứng dụng trên hướng tới cá nhân toàn cầu, **không gắn với bối cảnh một trường cụ thể** (khoa, sự kiện, cơ sở vật chất, điểm rèn luyện) và **không cung cấp dữ liệu cho nhà trường**. GreenQuest lấp khoảng trống này.

## 4. Mô hình nghiên cứu đề xuất

```
 Bài học & quiz ──► Kiến thức/Thái độ ─┐
 Bảng tin, thi đua khoa ─► Chuẩn chủ quan ─┼─► Ý định hành vi xanh ─► Hành vi xanh (log + quan sát)
 Nhiệm vụ nhỏ, QR, nhắc nhở ─► Nhận thức kiểm soát ─┘           ▲
 Trải nghiệm game hoá (thích thú, thành tựu, gắn kết) ───────────┘ (biến điều tiết/trung gian)
```

Giả thuyết ví dụ:
- H1–H3: Thái độ, chuẩn chủ quan, nhận thức kiểm soát tác động dương đến ý định.
- H4: Trải nghiệm game hoá tác động dương đến ý định và điều tiết quan hệ ý định → hành vi.
- H5: Nhóm dùng ứng dụng có mức tăng hành vi xanh lớn hơn nhóm đối chứng.

## 5. Thiết kế giải pháp GreenQuest

### 5.1 Đối tượng
Sinh viên (chính), giảng viên, cán bộ; quản trị viên (Phòng CTSV, Đoàn – Hội, Phòng Quản trị – Thiết bị).

### 5.2 Vòng lặp cốt lõi (core loop)

**Học** (3 phút) → **Hành động** (nhiệm vụ trong ngày) → **Nhận phản hồi** (XP, tác động CO₂, cây lớn lên) → **Thi đua & chia sẻ** (khoa, bảng tin) → **Đổi quà / được ghi nhận** → quay lại hôm sau (streak).

### 5.3 Tính năng

| Nhóm | Tính năng | MVP (đã làm) | Bản chính thức |
|---|---|---|---|
| Hành động | 15 hành động xanh thuộc 6 nhóm, gắn tiêu chí GreenMetric, giới hạn lượt/ngày, ghi chú | ✅ | + ảnh minh chứng, QR, định vị, xác minh chéo |
| Nhiệm vụ | 3 nhiệm vụ/ngày (khác nhóm, giống nhau toàn trường), thưởng hoàn thành | ✅ | + nhiệm vụ tuần/chiến dịch theo chủ đề |
| Học | Bài học dạng thẻ + quiz, chỉ thưởng phần cải thiện | ✅ (5 bài) | + video ngắn, nội dung do giảng viên tạo |
| Tiến trình | XP, 6 cấp độ, chuỗi ngày, thưởng mốc 7 ngày | ✅ | + "đóng băng chuỗi" khi ốm/nghỉ lễ |
| Huy hiệu | 14 huy hiệu (thói quen, nhóm hành vi, học tập, tác động) | ✅ | + huy hiệu sự kiện, NFT/chứng nhận số (tuỳ chọn) |
| Xã hội | Xếp hạng khoa & cá nhân, cây tập thể của khoa, bảng tin campus | ✅ (dữ liệu mô phỏng) | Dữ liệu thật, thử thách nhóm/lớp, bình luận, thả tim |
| Phần thưởng | Đổi Điểm Xanh lấy quà, mã nhận quà | ✅ | Tích hợp đối tác căng-tin, điểm rèn luyện (CTSV duyệt) |
| Tác động | CO₂, kWh, nhựa, nước – cá nhân | ✅ | Dashboard toàn trường, xuất báo cáo GreenMetric |
| Báo cáo lãng phí | Hành động "Báo cáo điểm lãng phí" có ghi chú | ✅ (cơ bản) | Ảnh + vị trí, chuyển ticket tới Phòng Quản trị, phản hồi trạng thái |
| Quản trị | — | — | CMS nội dung, tạo sự kiện + QR, duyệt minh chứng, phân tích |

### 5.4 Hệ số tác động (ước tính giáo dục)

| Hành động | Giả định | Ước tính |
|---|---|---|
| Tắt đèn/quạt/điều hoà khi rời phòng | ~1 kWh tránh lãng phí | 1 kWh; 0,66 kg CO₂ |
| Đặt điều hoà ≥ 26°C | ~0,5 kWh/ngày | 0,33 kg CO₂ |
| Đi bộ/xe đạp thay xe máy | 5 km × ~0,1 kg CO₂/km | 0,5 kg CO₂ |
| Xe buýt/đi chung | giảm ~70% so với xe máy cá nhân | 0,35 kg CO₂ |
| Bình nước cá nhân | 1 chai PET ~20 g | 20 g nhựa; ~0,08 kg CO₂ |
| Bữa ăn chay | so với bữa có thịt | ~1 kg CO₂e |
| Tắm < 5 phút | giảm ~30 lít nước (có bình nóng lạnh) | 30 L; 0,3 kWh |

- Hệ số phát thải lưới điện Việt Nam: Bộ TN&MT công bố **0,6766 tCO₂/MWh (2022)** và **0,6592 tCO₂/MWh (2023)**; ứng dụng dùng giá trị làm tròn 0,66 kg CO₂/kWh.
- Một cây xanh trưởng thành hấp thụ khoảng **~22 kg CO₂/năm** (giá trị quy đổi phổ biến, dùng để minh hoạ).
- Đây là **ước tính để giáo dục và tạo động lực**, không phải số liệu kiểm kê khí nhà kính. Bản chính thức nên được hiệu chỉnh với giảng viên chuyên ngành môi trường và dữ liệu đồng hồ điện/nước của trường.

### 5.5 Chống gian lận và bảo đảm tính xác thực
1. Giới hạn số lần/ngày cho từng hành động (đã có trong MVP).
2. Hành động giá trị cao (sự kiện) bắt buộc quét **QR động** do ban tổ chức tạo, có thời hạn.
3. Ảnh minh chứng + **xác minh chéo ngẫu nhiên** bởi người dùng khác (thưởng XP cho người xác minh).
4. Phát hiện bất thường (tần suất, thời điểm, ảnh trùng lặp).
5. Thi đua **tập thể** làm giảm động cơ gian lận cá nhân; điểm rèn luyện chỉ cộng khi CTSV duyệt.

## 6. Kiến trúc kỹ thuật

### 6.1 MVP (trong repo)
- **React 19 + TypeScript + Vite**, dạng **PWA** (cài lên màn hình điện thoại, không cần qua App Store).
- Logic game nằm trong `src/game/engine.ts` – hàm thuần, có **unit test** (Vitest), dễ chuyển lên máy chủ.
- Dữ liệu lưu `localStorage`; dữ liệu cộng đồng (khoa, bạn bè, bảng tin) là **mô phỏng**.

### 6.2 Bản chính thức (đề xuất)

```
[PWA / React Native] ──HTTPS──► [API: Supabase (Postgres + Auth + Storage + Edge Functions)]
        │                                 │
        │ Đăng nhập SSO email trường       ├── Bảng: users, faculties, actions, logs, lessons,
        │ Thông báo đẩy (Web Push/FCM)     │          quiz_results, badges, rewards, events, reports
        ▼                                 ├── Row Level Security theo vai trò
 [Web quản trị: CTSV, Đoàn, P.QT]  ◄──────┘── Dashboard, xuất CSV/PDF báo cáo GreenMetric
```

- Xác thực bằng email trường (`@due.edu.vn`…) để mỗi người một tài khoản, gắn khoa/lớp từ dữ liệu đào tạo.
- Engine tính điểm chạy phía máy chủ (Edge Function) để chống sửa điểm phía client.
- Tuân thủ **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân: xin đồng ý, tối thiểu hoá dữ liệu, ẩn danh khi phân tích nghiên cứu, cho phép xoá tài khoản.

## 7. Tổ chức triển khai tại trường

| Bên liên quan | Vai trò |
|---|---|
| Ban Giám hiệu / Ban chỉ đạo Green Campus | Chủ trì, gắn với kế hoạch phát triển bền vững |
| Phòng Công tác sinh viên | Quy đổi điểm rèn luyện, truyền thông |
| Đoàn Thanh niên – Hội Sinh viên, CLB môi trường | Tổ chức sự kiện, chiến dịch tháng, đại sứ xanh ở mỗi khoa |
| Phòng Quản trị – Thiết bị | Nhận & xử lý báo cáo lãng phí, cung cấp số liệu điện/nước |
| Giảng viên | Biên soạn nội dung học, lồng ghép vào học phần |
| Căng-tin, đối tác | Tài trợ quà, ưu đãi khi dùng bình/cốc cá nhân |

**Lịch chiến dịch mẫu (theo tháng):** Tháng "Không nhựa" → Tháng "Tiết kiệm điện" (gắn Giờ Trái Đất) → Tháng "Di chuyển xanh" → Tháng "Phân loại rác"… Mỗi tháng có thử thách chủ đề, nhân hệ số điểm cho nhóm hành động tương ứng, trao Cúp Green Campus cho khoa dẫn đầu.

## 8. Phương pháp đánh giá

### 8.1 Thiết kế
- **Bán thực nghiệm (quasi-experiment) có nhóm đối chứng**, đo trước – sau (pre/post), thời gian thử nghiệm **8–12 tuần** (đủ dài so với thời gian hình thành thói quen).
- Nhóm thực nghiệm: một số lớp/khoa dùng GreenQuest; nhóm đối chứng: lớp/khoa tương đương chỉ nhận truyền thông thông thường.
- Phỏng vấn sâu / thảo luận nhóm (định tính) về trải nghiệm, động lực, rào cản.

### 8.2 Công cụ đo
- Bảng hỏi Likert 5 mức: thái độ, chuẩn chủ quan, nhận thức kiểm soát, ý định, hành vi tự báo cáo (thang TPB); trải nghiệm game hoá (VD: thang GAMEFULQUEST); động lực nội tại (IMI).
- Bài kiểm tra kiến thức môi trường trước – sau.
- **Dữ liệu hành vi khách quan từ app**: số hành động, tỷ lệ hoàn thành nhiệm vụ, streak.
- **Dữ liệu vận hành của trường**: điện năng toà nhà (kWh/tháng so với cùng kỳ), khối lượng rác tái chế thu gom, số lượt gửi xe máy.
- Chỉ số sử dụng: DAU/MAU, tỷ lệ giữ chân D1/D7/D30, thời gian học.

### 8.3 Phân tích
- Thống kê mô tả; kiểm định Cronbach's Alpha, EFA/CFA.
- **PLS-SEM** (SmartPLS) kiểm định mô hình mục 4.
- So sánh nhóm: t-test / ANCOVA / Difference-in-Differences cho dữ liệu vận hành.

### 8.4 KPI mục tiêu (gợi ý cho học kỳ thí điểm)

| Chỉ số | Mục tiêu |
|---|---|
| Người dùng kích hoạt | ≥ 30% sinh viên khoa thí điểm |
| Tỷ lệ giữ chân D30 | ≥ 25% |
| Hành động được ghi nhận | ≥ 20.000 |
| Điểm kiến thức tăng | ≥ 20% so với đầu kỳ |
| Điện năng toà nhà thí điểm | giảm 5–10% so với cùng kỳ |
| Báo cáo lãng phí được xử lý | ≥ 80% trong 7 ngày |

## 9. Lộ trình

| Giai đoạn | Thời gian | Nội dung |
|---|---|---|
| 0. Khảo sát | Tháng 1–2 | Khảo sát nhận thức – hành vi đầu kỳ (n ≥ 400), chọn hành vi trọng tâm, phỏng vấn bên liên quan |
| 1. MVP | Tháng 2–3 | **Đã có bản mẫu**; thử nghiệm khả dụng (usability) với 20–30 sinh viên, chỉnh sửa |
| 2. Bản chính thức | Tháng 3–5 | Backend, SSO, web quản trị, QR sự kiện, ảnh minh chứng, thông báo đẩy |
| 3. Thí điểm | Tháng 5–8 | Triển khai 2–4 khoa, 2–3 chiến dịch tháng, thu dữ liệu |
| 4. Đánh giá & nhân rộng | Tháng 8–10 | Phân tích, viết báo cáo/bài báo, mở rộng toàn trường và các trường thành viên |

## 10. Rủi ro và giải pháp

| Rủi ro | Giải pháp |
|---|---|
| Người dùng chán sau vài tuần (novelty effect) | Chiến dịch theo tháng, nội dung mới, sự kiện offline, reset bảng xếp hạng |
| Gian lận điểm | Mục 5.5 |
| Phần thưởng làm giảm động lực nội tại | Ưu tiên ghi nhận xã hội & tập thể; quà mang tính biểu tượng; luôn hiển thị ý nghĩa tác động |
| Áp lực cạnh tranh | Tập trung thi đua khoa; cho phép ẩn tên trên bảng cá nhân |
| Dữ liệu cá nhân | Tuân thủ NĐ 13/2023, ẩn danh trong nghiên cứu |
| Phụ thuộc nhóm phát triển | Mã nguồn mở, tài liệu, chuyển giao cho Trung tâm CNTT của trường |

## 11. Sản phẩm dự kiến
1. Ứng dụng GreenQuest (PWA) + web quản trị.
2. Bộ nội dung học về Green University bằng tiếng Việt.
3. Báo cáo đánh giá tác động; 1–2 bài báo khoa học.
4. Dữ liệu minh chứng phục vụ báo cáo UI GreenMetric / THE Impact Rankings (SDG 4, 7, 11, 12, 13).

## 12. Tài liệu tham khảo

- Ajzen, I. (1991). The theory of planned behavior. *Organizational Behavior and Human Decision Processes*, 50(2), 179–211.
- Deci, E. L., & Ryan, R. M. (2000). The "what" and "why" of goal pursuits. *Psychological Inquiry*, 11(4), 227–268.
- Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining "gamification". *Proc. MindTrek '11*.
- Fogg, B. J. (2009). A behavior model for persuasive design. *Proc. Persuasive '09*.
- Hamari, J., Koivisto, J., & Sarsa, H. (2014). Does gamification work? A literature review of empirical studies on gamification. *Proc. HICSS-47*.
- Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. *European Journal of Social Psychology*, 40(6), 998–1009.
- Michie, S., van Stralen, M. M., & West, R. (2011). The behaviour change wheel. *Implementation Science*, 6, 42.
- Chou, Y. (2015). *Actionable Gamification: Beyond Points, Badges, and Leaderboards*.
- UI GreenMetric World University Rankings – Guideline (bản mới nhất), Universitas Indonesia.
- Bộ Tài nguyên và Môi trường – Thông báo hệ số phát thải lưới điện Việt Nam các năm 2022, 2023.
- Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.

> Ghi chú: trọng số UI GreenMetric và hệ số phát thải nên được đối chiếu lại với văn bản mới nhất trước khi đưa vào báo cáo chính thức.
