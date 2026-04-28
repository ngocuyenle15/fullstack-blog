# Bài thực hành 3

## Thông tin sinh viên

- **Họ tên:** Lê Ngọc Uyển  
- **MSSV:** N23DCCN135  
- **Lớp:** D23CQCN02-N  
- **Môn:** Lập trình Web  

---

## Hướng dẫn chạy

### 1. Yêu cầu hệ thống

- Node.js (>= 18)
- npm hoặc yarn
- Git (nếu clone từ repository)

---

### 2. Clone project

```bash
git clone <link-repository>
cd <tên-thư-mục-project>
```

---

### 3. Chạy Backend

```bash
cd backend
npm install
node server.js
```

Backend sẽ chạy tại:  
http://localhost:5000

---

### 4. Chạy Frontend

Mở terminal mới:

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ chạy tại:  
http://localhost:3000

---

### 5. Cấu hình API

Mở file:

```
frontend/lib/api.ts
```

Sửa:

```ts
baseURL: "http://localhost:5000"
```

---

### 6. Kiểm tra hệ thống

Truy cập:  
http://localhost:3000

Thực hiện các chức năng:

- Thêm bài viết
- Xem danh sách bài viết
- Xoá bài viết