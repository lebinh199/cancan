import { useState } from 'react';
import { FACULTIES } from '../data/catalog';
import { useGame } from '../game/store';

export default function Onboarding() {
  const { join } = useGame();
  const [name, setName] = useState('');
  const [facultyId, setFacultyId] = useState(FACULTIES[0].id);

  return (
    <div className="onboarding">
      <div className="hero">
        <img src="./icon.svg" alt="" width={72} height={72} />
        <h1>GreenQuest</h1>
        <p>Học – Hành động – Thi đua vì một <b>Green University</b>.</p>
      </div>
      <ul className="pitch">
        <li>✅ Ghi nhận hành động xanh hằng ngày, nhận XP & Điểm Xanh 🍃</li>
        <li>📘 Bài học 3 phút + quiz về môi trường</li>
        <li>🏆 Cùng khoa của bạn thi đua làm cây tập thể lớn lên</li>
        <li>🎁 Đổi Điểm Xanh lấy quà và điểm rèn luyện</li>
      </ul>
      <form
        className="card form"
        onSubmit={(e) => {
          e.preventDefault();
          if (name.trim()) join({ name: name.trim(), facultyId });
        }}
      >
        <label>
          Tên hiển thị
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Minh Anh" maxLength={30} required />
        </label>
        <label>
          Khoa / Đơn vị
          <select value={facultyId} onChange={(e) => setFacultyId(e.target.value)}>
            {FACULTIES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </label>
        <button className="btn primary" type="submit" disabled={!name.trim()}>
          Bắt đầu hành trình xanh
        </button>
        <small className="muted">Bản thử nghiệm: dữ liệu chỉ lưu trên thiết bị của bạn.</small>
      </form>
    </div>
  );
}
