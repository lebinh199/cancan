import type { Category } from './actions';

export interface Question {
  q: string;
  options: string[];
  answer: number;
  explain: string;
}

export interface Lesson {
  id: string;
  title: string;
  category: Category;
  minutes: number;
  /** Nội dung micro-learning, mỗi phần tử là một "thẻ" đọc nhanh. */
  cards: string[];
  quiz: Question[];
  xpPerCorrect: number;
}

export const LESSONS: Lesson[] = [
  {
    id: 'green-uni',
    title: 'Green University là gì?',
    category: 'community',
    minutes: 3,
    cards: [
      'Trường đại học xanh là nơi tích hợp phát triển bền vững vào cơ sở vật chất, vận hành, đào tạo, nghiên cứu và văn hoá cộng đồng.',
      'UI GreenMetric (Đại học Indonesia, từ 2010) là bảng xếp hạng phổ biến nhất, đánh giá 6 nhóm tiêu chí: Hạ tầng (SI), Năng lượng & Biến đổi khí hậu (EC), Rác thải (WS), Nước (WR), Giao thông (TR), Giáo dục & Nghiên cứu (ED).',
      'Năng lượng & khí hậu có trọng số lớn nhất (21%). Nhưng nhiều tiêu chí chỉ cải thiện được khi chính sinh viên, giảng viên thay đổi thói quen hằng ngày.',
      'Mỗi hành động bạn ghi nhận trong GreenQuest được gắn với một tiêu chí GreenMetric – dữ liệu tổng hợp giúp trường lập kế hoạch và báo cáo.',
    ],
    quiz: [
      {
        q: 'UI GreenMetric có bao nhiêu nhóm tiêu chí?',
        options: ['4', '6', '8', '10'],
        answer: 1,
        explain: 'Gồm SI, EC, WS, WR, TR và ED.',
      },
      {
        q: 'Nhóm tiêu chí có trọng số cao nhất là?',
        options: ['Nước', 'Giao thông', 'Năng lượng & Biến đổi khí hậu', 'Rác thải'],
        answer: 2,
        explain: 'EC chiếm 21% tổng điểm.',
      },
      {
        q: 'Điều nào KHÔNG phải đặc điểm của trường đại học xanh?',
        options: [
          'Đưa bền vững vào chương trình học',
          'Vận hành tiết kiệm năng lượng',
          'Chỉ trồng thật nhiều cây là đủ',
          'Huy động cộng đồng sinh viên tham gia',
        ],
        answer: 2,
        explain: 'Cây xanh là một phần, nhưng đại học xanh là cách tiếp cận toàn diện.',
      },
    ],
    xpPerCorrect: 10,
  },
  {
    id: 'plastic',
    title: 'Nhựa dùng một lần',
    category: 'waste',
    minutes: 3,
    cards: [
      'Việt Nam nằm trong nhóm các quốc gia có lượng rác nhựa thất thoát ra đại dương lớn trên thế giới.',
      'Một chai nhựa PET cần hàng trăm năm để phân huỷ và vỡ thành vi nhựa đi vào chuỗi thức ăn.',
      'Cách hiệu quả nhất không phải tái chế, mà là TỪ CHỐI và TÁI SỬ DỤNG: bình nước, túi vải, hộp cơm cá nhân.',
      'Nguyên tắc 5R: Refuse – Reduce – Reuse – Repurpose – Recycle, theo thứ tự ưu tiên.',
    ],
    quiz: [
      {
        q: 'Theo nguyên tắc 5R, ưu tiên cao nhất là?',
        options: ['Recycle', 'Refuse', 'Reuse', 'Repurpose'],
        answer: 1,
        explain: 'Từ chối ngay từ đầu là cách tạo ra ít rác nhất.',
      },
      {
        q: 'Vi nhựa hình thành chủ yếu do?',
        options: [
          'Nhựa bị đốt',
          'Nhựa vỡ vụn dần trong môi trường',
          'Nhựa được tái chế',
          'Nhựa tan trong nước',
        ],
        answer: 1,
        explain: 'Ánh nắng, sóng, nhiệt làm nhựa vỡ thành hạt rất nhỏ.',
      },
      {
        q: 'Hành động nào giảm rác nhựa hiệu quả nhất ở căng-tin?',
        options: [
          'Lấy thêm ống hút để dự phòng',
          'Dùng hộp và bình cá nhân',
          'Bỏ chai nhựa vào thùng rác bất kỳ',
          'Mua nước đóng chai loại lớn',
        ],
        answer: 1,
        explain: 'Tái sử dụng hộp, bình loại bỏ hoàn toàn bao bì dùng một lần.',
      },
    ],
    xpPerCorrect: 10,
  },
  {
    id: 'energy',
    title: 'Điện năng & khí nhà kính',
    category: 'energy',
    minutes: 4,
    cards: [
      'Phần lớn điện ở Việt Nam vẫn đến từ than và khí. Trung bình mỗi kWh điện phát thải khoảng 0,66 kg CO2.',
      'Trong toà nhà giảng đường, điều hoà thường chiếm tỷ trọng điện năng lớn nhất.',
      'Mỗi độ tăng nhiệt độ cài đặt điều hoà giúp tiết kiệm khoảng 5–7% điện. Mức khuyến nghị là 26°C trở lên.',
      'Thói quen nhỏ – tắt thiết bị khi rời phòng, rút sạc, đi thang bộ – cộng lại trên hàng chục nghìn người tạo ra con số rất lớn.',
    ],
    quiz: [
      {
        q: 'Nhiệt độ điều hoà khuyến nghị để tiết kiệm điện?',
        options: ['18°C', '22°C', '≥ 26°C', '30°C'],
        answer: 2,
        explain: '26°C là mức cân bằng giữa tiện nghi và tiết kiệm.',
      },
      {
        q: '1 kWh điện ở Việt Nam phát thải xấp xỉ?',
        options: ['0,066 kg CO2', '0,66 kg CO2', '6,6 kg CO2', '66 kg CO2'],
        answer: 1,
        explain: 'Hệ số phát thải lưới điện quốc gia những năm gần đây khoảng 0,66–0,68.',
      },
      {
        q: 'Nếu 10.000 sinh viên mỗi người tiết kiệm 0,5 kWh/ngày, mỗi ngày giảm khoảng bao nhiêu CO2?',
        options: ['33 kg', '330 kg', '3,3 tấn', '33 tấn'],
        answer: 2,
        explain: '10.000 × 0,5 × 0,66 ≈ 3.300 kg = 3,3 tấn.',
      },
    ],
    xpPerCorrect: 12,
  },
  {
    id: 'transport',
    title: 'Di chuyển xanh',
    category: 'transport',
    minutes: 3,
    cards: [
      'Xe máy là phương tiện chính của sinh viên Việt Nam. Mỗi km xe máy phát thải khoảng 0,1 kg CO2, chưa kể bụi mịn.',
      'Đi bộ, xe đạp là phát thải bằng 0 và tốt cho sức khoẻ. Xe buýt, đi chung xe chia nhỏ phát thải cho nhiều người.',
      'UI GreenMetric đánh giá cả số phương tiện vào khuôn viên, chính sách đi bộ và xe đưa đón – hành vi của bạn ảnh hưởng trực tiếp tới điểm của trường.',
    ],
    quiz: [
      {
        q: 'Phương án phát thải thấp nhất cho quãng đường 2 km?',
        options: ['Xe máy', 'Taxi', 'Đi bộ / xe đạp', 'Ô tô cá nhân'],
        answer: 2,
        explain: 'Đi bộ và xe đạp không phát thải trực tiếp.',
      },
      {
        q: 'Đi chung xe máy với một bạn giúp giảm khoảng bao nhiêu phát thải mỗi người?',
        options: ['Không đổi', 'Khoảng một nửa', 'Gấp đôi', 'Giảm 10%'],
        answer: 1,
        explain: 'Cùng một chuyến xe nhưng chia cho hai người.',
      },
    ],
    xpPerCorrect: 10,
  },
  {
    id: 'food',
    title: 'Bữa ăn & khí hậu',
    category: 'food',
    minutes: 3,
    cards: [
      'Hệ thống thực phẩm đóng góp khoảng một phần tư đến một phần ba lượng khí nhà kính toàn cầu.',
      'Thịt bò có dấu chân carbon cao gấp hàng chục lần rau, đậu. Chỉ một bữa chay mỗi tuần đã tạo khác biệt.',
      'Lãng phí thực phẩm cũng là lãng phí đất, nước, năng lượng đã dùng để sản xuất ra nó.',
    ],
    quiz: [
      {
        q: 'Thực phẩm nào thường có dấu chân carbon cao nhất?',
        options: ['Đậu phụ', 'Thịt bò', 'Rau muống', 'Gạo'],
        answer: 1,
        explain: 'Chăn nuôi bò phát thải nhiều khí methane.',
      },
      {
        q: 'Bỏ thừa thức ăn gây lãng phí gì?',
        options: [
          'Chỉ lãng phí tiền',
          'Đất, nước, năng lượng dùng để sản xuất',
          'Không lãng phí gì',
          'Chỉ lãng phí thời gian',
        ],
        answer: 1,
        explain: 'Toàn bộ tài nguyên của chuỗi cung ứng bị lãng phí theo.',
      },
    ],
    xpPerCorrect: 10,
  },
];
