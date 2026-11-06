# Chuẩn Đại học Xanh và cách truy ngược ra hướng phát triển app

> Tài liệu này đi kèm ý tưởng **EcoRush** (Google Doc "Idea app Đại học xanh") và bản mẫu GreenQuest trong repo.
> Mục tiêu: hiểu rõ trường đại học Việt Nam **cần đạt gì**, để từ đó biết app phải **tạo ra minh chứng gì**, **cho ai**, và **tính năng nào làm trước**.
>
> Ngày nghiên cứu: 11/2026. Xem mục 9 về mức độ chắc chắn của từng số liệu.

---

## 0. Tóm tắt cho người ra quyết định

1. **Chuẩn mà trường Việt Nam dùng nhiều nhất là UI GreenMetric.** Năm 2026 chuẩn này đổi tên thành *Sustainable University Rankings*, có **7 tiêu chí** và khoảng **60 chỉ số**, trường **nộp số liệu từ tháng 2 đến tháng 6** mỗi năm. Tiêu chí mới thêm vào là **Quản trị & Số hoá (GD, 11%)**. Ngoài ra còn THE Impact Rankings (đánh giá theo 17 mục tiêu phát triển bền vững – SDG) và QS Sustainability.
2. **App không làm thay đổi hạ tầng** (diện tích cây xanh, điện mặt trời, hệ thống xử lý nước thải). Nhưng app **ăn điểm trực tiếp** ở 3 chỗ mà trường thường thiếu minh chứng:
   - **Chỉ số ICT ở mọi tiêu chí.** Từ 2024 mỗi tiêu chí có một chỉ số kiểu "dùng công nghệ thông tin để lập kế hoạch, triển khai, theo dõi, đánh giá chương trình" (SI.11, EC.11, WS.7, WR.6, TR.9, ED.14). Năm 2026 có thêm GD.6, GD.7, GD.11. App chính là công cụ ICT đó, **với điều kiện** app có cả phần lập kế hoạch, theo dõi và đánh giá, không chỉ là game.
   - **Các chỉ số "chương trình / hoạt động / sự kiện"**: chương trình tiết kiệm năng lượng, 3R, tiết kiệm nước, giảm phương tiện; số sự kiện, CLB, hoạt động văn hoá, phục vụ cộng đồng (nhóm ED). Trường làm nhiều nhưng **không lưu hồ sơ có hệ thống** (danh sách tham dự, ảnh, kết quả đo).
   - **Các số liệu khó thu thập**: cách sinh viên đi lại (dùng cho TR.1 và để tính dấu chân carbon), khối lượng rác thu gom tại điểm, báo cáo rò rỉ và thời gian xử lý, số người học nội dung về bền vững.
3. **Khách hàng (người trả tiền / ra quyết định) là nhà trường. Người dùng là sinh viên.** Sản phẩm vì vậy phải có **hai mặt**:
   - **EcoRush**: mặt game, để sinh viên tự nguyện quay lại mỗi ngày.
   - **Evidence Hub (Kho minh chứng)**: mặt quản trị, để biến hoạt động của sinh viên thành **hồ sơ minh chứng gắn theo mã chỉ số**, xuất ra đúng kỳ nộp.
4. **Điều chỉnh MVP so với EcoRush.** Đưa module **Sự kiện & CLB (xác thực cấp 3 bằng QR)** và **khảo sát di chuyển** lên MVP, vì đây là nguồn minh chứng giá trị nhất. Trang **Evidence Hub tối thiểu** phải có ngay từ đầu, vì đó là lý do nhà trường mua.

---

## 1. Bức tranh các chuẩn liên quan

| Chuẩn / văn bản | Bản chất | Mức độ liên quan tới app |
|---|---|---|
| **UI GreenMetric – Sustainable University Rankings** (Universitas Indonesia) | Xếp hạng chuyên về campus xanh, tự khai báo + minh chứng. Năm 2026 có 2.016 trường ở 110 quốc gia; đứng đầu Việt Nam là ĐH Trà Vinh (hạng 179) | ★★★ **Chuẩn chính để thiết kế** |
| **THE Impact Rankings** | Xếp hạng theo 17 SDG, bắt buộc nộp SDG 17 + ít nhất 3 SDG khác; các câu hỏi về chính sách/hoạt động **yêu cầu minh chứng**, có điểm nếu minh chứng công khai | ★★ (SDG 4, 7, 11, 12, 13, 17) |
| **QS Sustainability Rankings** | 3 nhóm: Tác động môi trường 45% (Giáo dục môi trường, Nghiên cứu môi trường, Bền vững môi trường), Tác động xã hội 45%, Quản trị 10% | ★ (Giáo dục môi trường, Quản trị) |
| **AASHE STARS** (Bắc Mỹ) | Khung tự đánh giá. Nhóm *Engagement* có các tín chỉ như Chương trình sinh viên giáo dục đồng đẳng, Chiến dịch truyền thông (chiến dịch phải có **kết quả đo được**), Đánh giá văn hoá bền vững | ★ Tham khảo cách đo "sự tham gia" |
| **Thông tư 01/2024/TT-BGDĐT** – Chuẩn cơ sở giáo dục đại học (hiệu lực 22/3/2024; 6 tiêu chuẩn, 20 tiêu chí) | Chuẩn tối thiểu bắt buộc. "Bền vững" ở đây chủ yếu là **tài chính**, chưa có tiêu chí môi trường riêng | ☆ Gián tiếp |
| **QĐ 1202/QĐ-BGDĐT (2024)** – Kế hoạch thực hiện Chiến lược quốc gia về tăng trưởng xanh năm 2024–2025 của ngành GD | Lồng ghép giáo dục tăng trưởng xanh; định hướng mô hình "Trường học xanh", "Giảng đường Net Zero" | ★★ Bối cảnh chính sách, lý do để trường đầu tư |
| **Luật Bảo vệ môi trường 2020 + NĐ 08/2022** | Phân loại chất thải rắn sinh hoạt tại nguồn (hạn chót 31/12/2024) | ★★ Nghĩa vụ thật, cần thay đổi hành vi |
| **NĐ 13/2023/NĐ-CP** – Bảo vệ dữ liệu cá nhân | Bắt buộc với mọi app thu dữ liệu sinh viên. GreenMetric 2026 chấm cả **tuân thủ bảo vệ dữ liệu (GD)** | ★★★ Ràng buộc thiết kế |

**Kết luận:** thiết kế xoay quanh **UI GreenMetric 2026**. Mỗi dữ liệu thu được gắn thêm mã **SDG** để dùng lại cho THE Impact / QS, không phải làm hai lần.

---

## 2. UI GreenMetric chi tiết, và app đóng góp được gì

### 2.1 Cấu trúc và trọng số

| Tiêu chí | 2025 | **2026** |
|---|---|---|
| SI – Hạ tầng & Bối cảnh | 15% | **11%** |
| EC – Năng lượng & Biến đổi khí hậu | 21% | **20%** |
| WS – Chất thải | 18% | **17%** |
| WR – Nước | 10% | **11%** |
| TR – Giao thông | 18% | **17%** |
| ED – Giáo dục & Nghiên cứu | 18% | **13%** |
| GD – Quản trị & Số hoá | — | **11% (mới)** |

**Chu kỳ:** nộp online từ **tháng 2 đến tháng 6**. Kỳ số liệu là **12 tháng** (năm dương lịch hoặc 12 tháng gần nhất), và phải dùng **cùng một kỳ** cho mọi chỉ số. → Dữ liệu của app phải lọc và xuất được **theo kỳ tuỳ chọn**.

**Thang chấm các chỉ số "chương trình" và "ICT"** thường có 5 mức: *không có → đang lập kế hoạch → đã triển khai → có theo dõi → đã đánh giá và cải tiến liên tục*. → Muốn lên mức 4–5, app phải **ghi lại kế hoạch, dữ liệu theo dõi và báo cáo đánh giá**. Đây là yêu cầu sản phẩm quan trọng nhất rút ra từ chuẩn.

### 2.2 Ma trận chỉ số → vai trò của app

Mức đóng góp: **A** = app tạo minh chứng trực tiếp · **B** = app cung cấp dữ liệu hoặc hỗ trợ · **–** = ngoài phạm vi (hạ tầng, tài chính).

#### SI – Hạ tầng
| Chỉ số (rút gọn) | Mức | App làm gì |
|---|---|---|
| Tỷ lệ diện tích mở, rừng, cây xanh, diện tích thấm nước | – | (Có thể bản đồ hoá cây do sinh viên trồng hoặc chăm sóc) |
| Ngân sách cho bền vững | – | — |
| Cơ sở vật chất cho người khuyết tật, an ninh, y tế | B | Kênh phản ánh điểm chưa thân thiện / mất an toàn |
| **SI.11 – ICT cho quản lý hạ tầng bền vững** | **A** | Bản đồ campus, ticket báo cáo sự cố, dashboard theo dõi |

#### EC – Năng lượng & Biến đổi khí hậu
| Chỉ số | Mức | App làm gì |
|---|---|---|
| EC.1 Thiết bị tiết kiệm năng lượng; tòa nhà thông minh; năng lượng tái tạo (EC.5 tỷ lệ tái tạo) | – | — |
| Tổng điện năng / đầu người | B | Phòng Quản trị nhập số liệu đồng hồ theo tháng → biểu đồ trước/sau chiến dịch |
| **Chương trình bảo tồn năng lượng** | **A** | Chiến dịch "Tháng tiết kiệm điện": kế hoạch, số người tham gia, số hành động, kWh trước/sau |
| **Chương trình thích ứng & giảm nhẹ biến đổi khí hậu; chương trình giảm phát thải khí nhà kính** | **A** | Hồ sơ chương trình, sự kiện, kết quả |
| **Tổng dấu chân carbon** (điện + đi lại; guideline dùng hệ số mẫu 0,84 tCO₂/MWh, cho phép thay bằng hệ số quốc gia; ô tô 0,02 và xe máy 0,01 tCO₂/100 km) | **B** | **Khảo sát di chuyển** cho dữ liệu số xe và quãng đường – phần trường thường phải ước đoán |
| **EC.11 – ICT cho chương trình năng lượng & khí hậu** | **A** | Chính app + dashboard |

#### WS – Chất thải
| Chỉ số | Mức | App làm gì |
|---|---|---|
| **WS.1 Chương trình 3R** (Giảm thiểu – Tái sử dụng – Tái chế) | **A** | Quest bình/túi cá nhân, ngày hội đổi đồ, đổi giấy lấy cây: số lượt, số người |
| Chương trình giảm giấy và nhựa (WS.2 ở bản 2023–2025) | **A** | Chiến dịch "Không nhựa", số chai nhựa tránh được (ước tính) |
| Xử lý rác hữu cơ / vô cơ | B | Tích điểm tại **điểm thu gom cố định** (QR + cân) → kg theo loại |
| Rác độc hại, nước thải (WS.6) | – | — |
| **WS.7 – ICT cho quản lý chất thải** | **A** | Dữ liệu thu gom theo điểm, theo thời gian |

#### WR – Nước
| Chỉ số | Mức | App làm gì |
|---|---|---|
| **Chương trình bảo tồn nước** | **A** | Chiến dịch + **báo cáo rò rỉ** có ảnh, vị trí, thời gian xử lý |
| Tái chế nước, thiết bị tiết kiệm nước, nước sạch đã xử lý, kiểm soát ô nhiễm (WR.5) | – / B | Phản ánh vòi hỏng, điểm nước uống |
| **WR.6 – ICT cho quản lý nước** | **A** | Ticket + dashboard |

#### TR – Giao thông
| Chỉ số | Mức | App làm gì |
|---|---|---|
| **TR.1 Số xe động cơ đốt trong (ô tô + xe máy) / tổng dân số campus** | **B** | **Khảo sát di chuyển định kỳ** + check-in đi bộ/xe đạp/xe buýt → số liệu đại diện |
| Xe đưa đón, xe không phát thải (ZEV), chính sách hạn chế xe, đường đi bộ (TR.8) | B | Ghép đi chung xe, quest đi bộ, phản ánh lối đi bộ |
| **TR.9 – ICT cho giao thông** | **A** | Dữ liệu cách đi lại, xu hướng theo tháng |

#### ED – Giáo dục & Nghiên cứu
| Chỉ số | Mức | App làm gì |
|---|---|---|
| ED.1 Tỷ lệ học phần về bền vững; ED.2 kinh phí nghiên cứu; công bố | – / B | Danh mục học phần do khoa khai báo |
| **Số sự kiện về bền vững** | **A** | Module **Sự kiện**: tạo, QR điểm danh, ảnh, số người → **danh sách sự kiện tự động** |
| **Số tổ chức / CLB sinh viên về bền vững và hoạt động của họ** (ED.5 ở bản 2026) | **A** | Module **CLB**: hồ sơ CLB, thành viên, hoạt động |
| **Hoạt động văn hoá** (ED.6 ở bản 2026) | **A** | Gắn loại "văn hoá" cho sự kiện |
| **Dự án phục vụ cộng đồng có sinh viên tham gia** | **A** | Dự án, giờ tình nguyện, xác nhận |
| Website bền vững, báo cáo bền vững | **B** | **Trang tác động công khai** + xuất báo cáo năm |
| Startup về bền vững (ED.11) | B | Mục "sáng kiến xanh" / cuộc thi ý tưởng |
| **ED.14 – ICT cho quản trị giáo dục bền vững** | **A** | Micro-learning, thống kê học |

#### GD – Quản trị & Số hoá (mới 2026)
| Chỉ số | Mức | App làm gì |
|---|---|---|
| GD.1 Tỷ lệ ngân sách cho bền vững | – | — |
| GD.5 Có đơn vị điều phối bền vững | B | App là **công cụ làm việc** của đơn vị này |
| **GD.6 ICT cho chương trình bền vững** (từ chưa lập kế hoạch → đã đánh giá, cải tiến liên tục) | **A** | Toàn bộ vòng: kế hoạch → triển khai → theo dõi → báo cáo |
| GD.7 Chính sách công nghệ số tiên tiến (AI, IoT) cho ra quyết định | B | (Sau MVP) AI hỗ trợ kiểm ảnh, gợi ý chiến dịch; tích hợp đồng hồ IoT |
| **Tuân thủ bảo vệ dữ liệu (GDPR / NĐ 13)** | **A** | Thiết kế quyền riêng tư ngay từ đầu (EcoRush đã đề xuất) |
| Hệ thống tiếp nhận phản ánh | B | Kênh báo cáo lãng phí cũng là kênh phản ánh |
| **GD.11 Chương trình năng lực số qua LMS** | B | Micro-learning có thể xuất sang hoặc nhúng vào LMS của trường |

**Tóm tắt:** khoảng **15–20 / 60 chỉ số** có thể có minh chứng mức A hoặc B từ app, tập trung vào **ICT (7 chỉ số), chương trình (6–8 chỉ số), ED (5–6 chỉ số), GD (3–4 chỉ số)**. App **không** thay được đầu tư hạ tầng, và không nên hứa như vậy với trường.

---

## 3. THE Impact Rankings và QS – dùng lại cùng dữ liệu

| SDG (THE 2025) | Chỉ số liên quan | App đóng góp |
|---|---|---|
| **SDG 13** Hành động khí hậu | *Biện pháp giáo dục môi trường* (23%), trung hoà carbon (23%) | Chương trình giáo dục khí hậu cho sinh viên và cộng đồng, số người tham gia, số liệu dấu chân carbon |
| **SDG 12** Tiêu dùng & sản xuất có trách nhiệm | Biện pháp vận hành (26,7%), **tỷ lệ rác được tái chế (27%)**, báo cáo bền vững (19,3%) | Chiến dịch 3R, kg tái chế tại điểm thu gom, xuất báo cáo |
| **SDG 7** Năng lượng | Sử dụng năng lượng carbon thấp, chương trình tiết kiệm | Chiến dịch tiết kiệm điện |
| **SDG 11** Đô thị bền vững | Di chuyển bền vững, nghệ thuật/di sản (hoạt động văn hoá) | Khảo sát di chuyển, sự kiện văn hoá |
| **SDG 4** Giáo dục | Học liệu mở cho người ngoài trường, sự kiện học tập cộng đồng | Micro-learning công khai |
| **SDG 17** (bắt buộc) | Giáo dục về SDG, báo cáo tiến độ SDG | Trang tác động công khai theo SDG |

THE cho điểm cao hơn khi **minh chứng công khai** → nên có **Trang tác động công khai** (public impact page) cho từng chương trình, có URL cố định để dán vào hồ sơ.
QS: *Environmental Education* (17%) và *Good Governance* dùng cùng loại minh chứng như ED và GD.

---

## 4. Truy ngược: ai cần gì?

### 4.1 Bản đồ các bên liên quan

| Nhóm | Vai trò với chuẩn | Họ đang khổ vì | Họ cần ở app | Mặt sản phẩm |
|---|---|---|---|---|
| **Ban Giám hiệu / Ban chỉ đạo Green Campus** | Chịu trách nhiệm thứ hạng, ra quyết định đầu tư | Không biết tiền và công sức chương trình đem lại gì | Dashboard tổng: mức tham gia, kết quả, độ phủ chỉ số | Evidence Hub |
| **Đơn vị điều phối bền vững / Phòng Đảm bảo chất lượng, Khảo thí, KHCN** (người **nộp hồ sơ GreenMetric**) | Điền ~60 chỉ số, gom minh chứng từ nhiều phòng | Minh chứng rời rạc, thiếu số liệu, dồn việc vào tháng 2–6 | **Kho minh chứng theo mã chỉ số**, % hoàn thiện, xuất gói minh chứng theo kỳ | Evidence Hub (**khách hàng chính**) |
| **Phòng Quản trị – Thiết bị** | Số liệu điện, nước, rác, xe | Không có kênh tiếp nhận sự cố, không chứng minh được chương trình tiết kiệm | Ticket báo cáo lãng phí, nhập số liệu đồng hồ, biểu đồ trước/sau | Evidence Hub + Ticket |
| **Phòng Công tác sinh viên / Đoàn – Hội** | Tổ chức sự kiện, phong trào, điểm rèn luyện | Điểm danh thủ công, khó thống kê | Tạo sự kiện + QR, xuất danh sách, cộng điểm rèn luyện | Admin |
| **Khoa / Giảng viên** | Học phần bền vững (ED.1), nghiên cứu, thi đua khoa | Không có công cụ tạo hoạt động cho lớp | Tạo quest cho lớp, xác nhận hoạt động, xem thống kê khoa | Faculty console |
| **CLB sinh viên về môi trường** | Hoạt động CLB (ED), phục vụ cộng đồng | Hoạt động nhiều nhưng không được ghi nhận | Trang CLB, đăng hoạt động, xác nhận thành viên | App + Admin |
| **Sinh viên** | Tạo ra hành vi và dữ liệu | Không có lý do để làm mỗi ngày | Quest, streak, Sprout, Faculty War, quà thật | **EcoRush** (người dùng chính) |
| **Căng-tin / đối tác** | Tài trợ quà, chương trình cốc cá nhân | — | Quét mã đổi quà, thống kê | Partner portal (sau MVP) |
| **Người đánh giá bên ngoài** (GreenMetric, THE, đoàn kiểm định) | Kiểm tra minh chứng | Minh chứng không truy được nguồn | URL công khai, số liệu có ngày giờ và nguồn | Public impact page |

### 4.2 Hai vòng lặp phải nối vào nhau

```
VÒNG NGƯỜI DÙNG (EcoRush)                        VÒNG NHÀ TRƯỜNG (Evidence Hub)
Quest → Hành động thật → Xác thực ──┐      ┌── Lập kế hoạch chương trình (gắn mã chỉ số)
  ↑                                  │      │        ↓
Reward, Sprout, Faculty War          ▼      ▼   Triển khai: quest, sự kiện, chiến dịch
  ↑                          [ DỮ LIỆU ĐÃ XÁC THỰC ]        ↓
Micro-learning ←─────────────── gắn mã GreenMetric + SDG ──► Theo dõi: dashboard
                                                             ↓
                                       Đánh giá: báo cáo, gói minh chứng → nộp Feb–Jun
```

**Ba cấp xác thực của EcoRush tương ứng với độ tin cậy của minh chứng:**

| Cấp EcoRush | Ví dụ | Dùng làm minh chứng như thế nào |
|---|---|---|
| Cấp 1 – Tự khai | Mang bình, tắt điều hoà | Chỉ dùng **số liệu tổng hợp** (số người tham gia chiến dịch), không đưa từng lượt vào hồ sơ |
| Cấp 2 – Có bằng chứng (ảnh, GPS, check-in) | Đi bộ, phân loại rác, Green Snap | Ảnh tiêu biểu (khi người dùng **đồng ý cho phép dùng**), thống kê có định vị và thời gian |
| Cấp 3 – Đã xác nhận (QR sự kiện, khoa/CLB duyệt) | Sự kiện, workshop, dự án, tình nguyện | **Minh chứng chính thức**: danh sách tham dự, ảnh, mô tả, người xác nhận |

→ **XP / Green Credit nên tỉ lệ thuận với cấp xác thực.** Như vậy động lực của sinh viên trùng với nhu cầu minh chứng của trường.

---

## 5. Hướng phát triển app, suy ra từ chuẩn

### 5.1 Nguyên tắc sản phẩm
1. **Mọi đối tượng dữ liệu đều có thẻ** `greenmetric[]` (ví dụ `WS.1`, `ED.4`), `sdg[]`, `program_id`, `verification_level`, `period`.
2. **Chương trình (Program) là đơn vị trung tâm phía nhà trường**: có mục tiêu, kế hoạch, thời gian, chỉ số theo dõi và báo cáo đánh giá. Quest, sự kiện, chiến dịch đều thuộc về một chương trình. Đây chính là thứ các chỉ số "chương trình" và "ICT" chấm điểm.
3. **Xuất được theo kỳ 12 tháng tuỳ chọn**, theo mã chỉ số, dạng PDF + CSV + thư mục ảnh.
4. **Quyền riêng tư theo NĐ 13**: xin đồng ý riêng cho việc dùng ảnh trong minh chứng; báo cáo **ẩn danh** theo mặc định; có xoá tài khoản. Đây vừa là ràng buộc pháp lý vừa là điểm GD.
5. **Không thổi phồng CO₂**: số quy đổi chỉ để giáo dục. Dấu chân carbon chính thức theo công thức GreenMetric được tính ở Evidence Hub từ số liệu đồng hồ + khảo sát di chuyển.

### 5.2 Ma trận tính năng → chỉ số → người cần (ưu tiên)

| # | Tính năng | Chỉ số phục vụ | Người cần | Ưu tiên |
|---|---|---|---|---|
| 1 | Đăng nhập email trường, gắn khoa/lớp | Mẫu số người tham gia; bảo vệ dữ liệu | Tất cả | **MVP** |
| 2 | Daily Quest, XP, Level, Streak (có Eco Freeze), Sprout | Mức tham gia chương trình (EC/WS/WR/TR) | Sinh viên | **MVP** |
| 3 | 3 cấp xác thực (tự khai / ảnh-GPS / QR-duyệt) | Độ tin cậy minh chứng | P. ĐBCL, người đánh giá | **MVP** |
| 4 | **Sự kiện + QR điểm danh** (loại: bền vững / văn hoá / cộng đồng) | ED (sự kiện, văn hoá, cộng đồng), SDG 13, 17 | CTSV, Đoàn – Hội, CLB, P. ĐBCL | **MVP** |
| 5 | **Trang CLB & hoạt động CLB** | ED (CLB sinh viên) | CLB, P. ĐBCL | **MVP** (bản tối giản) |
| 6 | **Chương trình / chiến dịch** (kế hoạch → theo dõi → báo cáo) | Chương trình EC, WS.1, WR, TR; SI.11, EC.11, WS.7, WR.6, TR.9, ED.14, GD.6 | Đơn vị bền vững | **MVP** |
| 7 | **Khảo sát di chuyển** (quest 2 lần/học kỳ, thưởng XP) | TR.1, dấu chân carbon, TR.9 | P. Quản trị, P. ĐBCL | **MVP** |
| 8 | Faculty War (XP / sinh viên tích cực), bảng xếp hạng lớp, bạn bè | Mức tham gia | Sinh viên, khoa | **MVP** |
| 9 | Green Store (voucher căng-tin, gửi xe, điểm rèn luyện) | — (giữ chân người dùng) | Sinh viên, CTSV, đối tác | **MVP** |
| 10 | **Evidence Hub tối thiểu**: danh sách chỉ số, minh chứng gắn kèm, % hoàn thiện, xuất CSV/PDF theo kỳ | Tất cả chỉ số A/B | **P. ĐBCL, Ban Giám hiệu** | **MVP** |
| 11 | Báo cáo lãng phí / sự cố (ảnh, vị trí) + ticket cho P. Quản trị | WR, SI, EC; hệ thống phản ánh (GD) | P. Quản trị | V1.1 |
| 12 | Nhập số liệu đồng hồ điện/nước, biểu đồ trước/sau chiến dịch | EC (điện năng), WR, carbon | P. Quản trị | V1.1 |
| 13 | Điểm thu gom có QR + cân → kg theo loại | WS (hữu cơ/vô cơ), SDG 12 (tỷ lệ tái chế) | P. Quản trị, đối tác thu gom | V1.1 |
| 14 | Micro-learning sau hành động (30 giây), xuất sang LMS | ED.14, GD.11, SDG 13 (giáo dục môi trường) | Giảng viên, P. Đào tạo | MVP (nội dung ít) → V1.1 |
| 15 | Trang tác động công khai (theo chương trình, theo SDG) | Website bền vững (ED), báo cáo bền vững, THE (minh chứng công khai) | P. Truyền thông, P. ĐBCL | V1.1 |
| 16 | Green Snap (1 ảnh/ngày), Status Note, reaction, Challenge a Friend, Green Card | Giữ chân, lan truyền; ảnh làm minh chứng cấp 2 (khi được đồng ý) | Sinh viên | V1.2 (sau khi có số liệu giữ chân) |
| 17 | AI kiểm ảnh, phát hiện gian lận; tích hợp IoT đồng hồ | GD.7 | Đơn vị bền vững | V2 |
| 18 | Kết nối nhiều trường (ĐH vùng, hệ thống ĐH Đà Nẵng) | So sánh, mở rộng thị trường | Cấp ĐH vùng, Bộ | V2 |

### 5.3 So với concept EcoRush: giữ, thêm, dời lại

- **Giữ nguyên:** Sprout, Daily Quest, Streak + Eco Freeze, Faculty War tính theo *XP / sinh viên tích cực* (công bằng giữa khoa lớn và khoa nhỏ), 3 cấp xác thực, Green Store, thiết kế quyền riêng tư, North Star *Verified Green Actions / WAU*.
- **Thêm vào MVP vì chuẩn đòi hỏi:** Sự kiện + QR, CLB, Chương trình/chiến dịch, Khảo sát di chuyển, Evidence Hub tối thiểu.
- **Dời sang sau MVP:** Green Snap, Status Note, profile theme, Green Box. Đây là tính năng giữ chân tốt nhưng không tạo minh chứng, và tốn công kiểm duyệt nội dung. (Tài liệu EcoRush cũng khuyên cắt ~60% ý tưởng ở bản đầu.)
- **Thêm KPI phía nhà trường** bên cạnh North Star của sinh viên:
  - *Số chỉ số GreenMetric có minh chứng đạt mức "đã theo dõi" trở lên*
  - *Số chương trình có báo cáo đánh giá*
  - *Số sự kiện và lượt tham dự đã xác thực*
  - *Tỷ lệ sinh viên trả lời khảo sát di chuyển*

### 5.4 Lộ trình bám theo chu kỳ GreenMetric

| Thời điểm | Việc | Lý do |
|---|---|---|
| T11–T12/2026 | Hoàn thiện MVP (ĐH + Evidence Hub tối thiểu), chọn 2–4 khoa thí điểm | Kịp chạy học kỳ 2 |
| T1–T5/2027 | Thí điểm: 2–3 chiến dịch tháng, khảo sát di chuyển đầu và cuối kỳ | Có dữ liệu thật |
| T2–T6/2027 | Dùng dữ liệu thí điểm làm minh chứng một phần cho kỳ nộp 2027 (tuỳ kỳ số liệu trường chọn) | Chứng minh giá trị với Ban Giám hiệu |
| T9/2027 | Mở rộng toàn trường từ đầu năm học | Có trọn 12 tháng dữ liệu cho kỳ nộp 2028 |
| 2028 | Nhân rộng sang các trường thành viên / trường khác | Mô hình kinh doanh B2B (gói theo trường) |

---

## 6. Rủi ro khi định vị app là "minh chứng"

| Rủi ro | Giảm thiểu |
|---|---|
| Hứa quá mức ("app giúp tăng hạng") | Nói rõ: app phục vụ khoảng 15–20 chỉ số về chương trình, ICT, ED, GD; không thay đầu tư hạ tầng |
| Số liệu tự khai bị nghi ngờ | Chỉ dùng dữ liệu cấp 1 ở dạng tổng hợp; minh chứng chính thức lấy từ cấp 3 |
| Chuẩn thay đổi hằng năm (mã chỉ số khác nhau giữa các năm) | Bảng ánh xạ chỉ số là **dữ liệu cấu hình theo năm**, không gắn cứng trong code |
| Dữ liệu cá nhân | NĐ 13: xin đồng ý, tối thiểu hoá, ẩn danh khi báo cáo, lưu trữ trong nước nếu trường yêu cầu |
| Sinh viên bỏ app sau khi hết mới lạ | Chiến dịch theo tháng, Faculty War, quà thật, gắn điểm rèn luyện |
| Phụ thuộc một cá nhân ở trường | Gắn vào kế hoạch của đơn vị điều phối bền vững (GD.5) |

---

## 7. Việc cần làm tiếp với trường (để kiểm chứng giả định)

1. Phỏng vấn **người đang điền hồ sơ GreenMetric** của trường (hoặc người dự định điền): họ thiếu minh chứng ở chỉ số nào, mất bao lâu, đang dùng công cụ gì.
2. Lấy **bộ câu hỏi GreenMetric 2026** chính thức, rà lại bảng ánh xạ ở mục 2.2 theo đúng mã và thang điểm.
3. Hỏi Phòng CTSV về quy chế **quy đổi điểm rèn luyện**; hỏi Phòng Quản trị về khả năng cung cấp **số liệu đồng hồ điện/nước theo toà nhà**.
4. Khảo sát nhanh sinh viên (n ≈ 200): cách đi lại, mức sẵn sàng dùng app, loại quà mong muốn.

---

## 8. Ánh xạ sang bản mẫu hiện tại

Bản mẫu GreenQuest đã có quest, XP, cấp độ, streak, huy hiệu, thi đua khoa, micro-learning, đổi quà, và nhãn GreenMetric cho từng hành động. Việc tiếp theo, theo mục 5.2:
- Thay nhãn nhóm tiêu chí bằng **mã chỉ số cụ thể** và **3 cấp xác thực**.
- Thêm các thực thể **Program, Event (QR), Club, Survey**.
- Thêm màn hình **Evidence Hub** (bản mẫu: tổng hợp theo mã chỉ số + xuất CSV theo kỳ).

---

## 9. Mức độ chắc chắn của số liệu

- Tôi **không tải được** trực tiếp các file PDF guideline/questionnaire chính thức (`greenmetric.ui.ac.id`, `uigreenmetric.com` bị chặn trong môi trường làm việc). Thông tin được tổng hợp qua kết quả tìm kiếm trích từ các file đó và từ trang của các trường thành viên.
- **Chắc chắn:** trọng số 2025 và 2026; GD là tiêu chí mới năm 2026; kỳ nộp tháng 2–6/2026; mỗi tiêu chí có chỉ số ICT (SI.11, EC.11, WS.7, WR.6, TR.9, ED.14); TR.1 năm 2026 tính xe động cơ đốt trong / dân số; WS.1 là chương trình 3R; công thức carbon dùng 0,84 tCO₂/MWh và 0,02 / 0,01 tCO₂/100 km.
- **Cần đối chiếu lại:** đánh số chi tiết các chỉ số ED và GD (các nguồn ghi khác nhau giữa các năm), điểm tối đa từng chỉ số năm 2026, tổng số chỉ số chính xác (khoảng 60).
- Thông tư 01/2024: kết quả tìm kiếm chưa cho thấy tiêu chí môi trường riêng; nên đọc toàn văn để khẳng định.

## Nguồn

- UI GreenMetric – Guideline 2025: https://greenmetric.ui.ac.id/wp-content/uploads/2025/10/UI-GreenMetric-Guideline-2025.pdf
- UI GreenMetric – Guideline 2026 (SUR): https://uigreenmetric.com/wp-content/uploads/2026/06/2026_Guideline_UI-GreenMetric-SUR-eng-v2.pdf
- UI GreenMetric – Questionnaire 2026: https://uigreenmetric.com/wp-content/uploads/2026/02/Questionnaire-UI-GreenMetric-2026.pdf
- UI GreenMetric – Criteria & Indicators: https://greenmetric.ui.ac.id/about/criteria-indicator
- Ví dụ trang GD của trường thành viên: https://green.rmutp.ac.th/gd-1/ , https://greenuniversity.swu.ac.th/SWU-UI-GREEN/Governance-Digitalization
- Ví dụ minh chứng tính carbon theo GreenMetric: https://www.ktu.edu.tr/sustainability/vai8nwZJ5d , https://sustainable.gtu.edu.tr/assets/Dokumanlar/Kanitlar/Energy_and_Climate_Change/2_11_Total_carbon_footprint.pdf
- Kết quả 2026 của ĐH Trà Vinh: https://english.vov.vn/en/society/tra-vinh-university-ranks-first-in-vietnam-in-ui-greenmetric-2026-post1336917.vov
- THE Impact Rankings 2025 – methodology: https://www.timeshighereducation.com/world-university-rankings-news/impact-rankings-2025-methodology
- THE Impact Rankings – FAQs: https://www.timeshighereducation.com/world-university-rankings/impact-rankings-faqs
- QS Sustainability – tóm tắt phương pháp (ĐH Bologna): https://www.unibo.it/en/university/who-we-are/rankings-what-they-are-and-how-the-university-of-bologna-fares/qs-sustainability-the-university2019s-positioning-and-the-methodology
- AASHE STARS – ví dụ tín chỉ EN-5 Outreach Campaign: https://reports.aashe.org/institutions/3388/report/2024-07-25/EN/campus-engagement/EN-5/documentation
- Thông tư 01/2024/TT-BGDĐT: https://thuvienphapluat.vn/van-ban/Giao-duc/Thong-tu-01-2024-TT-BGDDT-Chuan-co-so-giao-duc-dai-hoc-598459.aspx
- QĐ 1202/QĐ-BGDĐT (2024): https://luatvietnam.vn/giao-duc/quyet-dinh-1202-qd-bgddt-2024-phe-duyet-ke-hoach-chien-luoc-quoc-gia-ve-tang-truong-xanh-nam-2024-2025-319608-d1.html
- Mô hình trường học xanh, giảng đường Net Zero: https://thoibaotaichinhvietnam.vn/nhan-rong-mo-hinh-truong-hoc-xanh-hinh-thanh-the-he-cong-dan-co-trach-nhiem-voi-moi-truong-198270.html
- Phân loại rác tại nguồn: https://moit.gov.vn/bao-ve-moi-truong/phan-loai-chat-thai-tai-nguon-buoc-dau-giai-bai-toan-bao-ve-moi-truong.html
