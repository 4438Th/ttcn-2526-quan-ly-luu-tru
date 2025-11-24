# Frontend — React + TypeScript + Vite

Đây là phần frontend của dự án, xây dựng bằng React + TypeScript và chạy bằng Vite. README này tóm tắt nhanh cách cài đặt, lệnh thường dùng và cấu trúc thư mục để bạn có thể bắt đầu nhanh.

**Môi trường yêu cầu**

- Node.js 18+ (hoặc phiên bản tương thích với `vite` và `typescript` trong `package.json`)
- Trình quản lý gói: `npm`, `pnpm` hoặc `yarn` (hướng dẫn dưới dùng `npm`)

**Chạy lệnh từ thư mục `apps/fe`**

Các ví dụ bên dưới giả định bạn đang ở trong thư mục `apps/fe`:

```powershell
cd apps/fe
npm install
```

## Lệnh tiện dụng

- `npm run dev` — Chạy môi trường phát triển (Vite, HMR)
- `npm run build` — Build production (chạy `tsc -b` rồi `vite build`)
- `npm run preview` — Chạy bản build lên server preview cục bộ
- `npm run lint` — Chạy ESLint trên mã nguồn

Những lệnh trên lấy trực tiếp từ `package.json` của ứng dụng.

## Cấu trúc chính của dự án

- `index.html` — entry HTML
- `vite.config.ts` — cấu hình Vite (plugin React SWC, alias...)
- `tsconfig.app.json`, `tsconfig.node.json` — cấu hình TypeScript

**Thư mục `src/`**

- `src/main.tsx` — điểm khởi chạy ứng dụng.
- `src/App.tsx` — layout ngoài cùng (chứa `Outlet` của react-router).

- `src/pages/` — các trang (tương ứng route):
  - `HomePage.tsx`
  - `AdminPage.tsx`
  - `LoginPage.tsx`
  - `RegisterPage.tsx`
  - `ReceptionistPage.tsx`

- `src/components/` — component dùng chung:
  - `common/`:
    - `BottomMenu.tsx`
    - `Topbar.tsx`
  - `layouts/`:
    - `AdminHeader.tsx`
    - `HomeHeader.tsx`
    - `Footer.tsx`

- `src/features/` — feature theo domain:
  - `auth/`:
    - `api/auth.ts`
    - `components/`: - thành phần giao diện riêng biệt của feature/auth
      - `LoginForm.tsx`
      - `RegisterForm.tsx`
    - `hooks/useAuth.tsx`
  - `rooms/`:
    - `components/`
      - `RoomView.tsx` — view chính cho rooms
    - `api/` — hiện tại rỗng
    - `hooks/` — hiện tại rỗng

- `src/index.css` — entry CSS (Tailwind + global styles)
- `src/assets/` — chứa tài nguyên tĩnh (folder tồn tại nhưng nội dung có thể thay đổi)

Những điểm lưu ý dựa trên mã hiện có:

- `src/main.tsx` đang import `AuthProvider` từ `features/auth/hooks/useAuth.tsx` và dùng `RoomView` làm index route của `AdminPage`.
- Một số folder (ví dụ `features/rooms/api` và `features/rooms/hooks`) hiện trống — dự kiến sẽ chứa `api` và `hooks` khi feature được mở rộng.

Gợi ý tổ chức tiếp theo (nhỏ):

- Đặt các hàm gọi API vào `features/<name>/api/*.ts` (ví dụ `auth.ts`, `rooms.ts`).
- Tách types nếu cần vào `features/<name>/types.ts` hoặc `src/types/` để tái sử dụng.
- Di chuyển component thực sự tái sử dụng sang `src/components/common/` để tránh duplicate.

Mình sẽ dùng cấu trúc thực tế này để cập nhật README nhằm phản ánh chính xác codebase hiện tại.

## CSS / Tailwind

Project đã cấu hình `tailwindcss` và `postcss`. Nếu chỉnh sửa cấu hình Tailwind, nhớ rebuild hoặc khởi động lại `dev` khi cần cập nhật config.

## Lint & Type-check

- Lint: `npm run lint` (dùng ESLint). Bạn có thể tích hợp vào CI để đảm bảo chất lượng mã.
- Type-check: `npm run build` thực hiện `tsc -b` trước khi chạy `vite build`, nên build sẽ báo lỗi type nếu có.

## Lưu ý khi làm việc trong monorepo

- Ứng dụng nằm trong `apps/fe`. Nếu bạn dùng monorepo (pnpm workspace / Turbo), cài dependencies từ workspace root có thể là cần thiết tuỳ cấu hình.
- Nếu gặp lỗi alias hoặc đường dẫn `tsconfig` khi chạy từ root, thử chạy lệnh trực tiếp tại `apps/fe`.

## Vấn đề thường gặp & cách khắc phục nhanh

- Port đã dùng: thay cổng dev hoặc tắt tiến trình chiếm cổng.
- Lỗi TypeScript liên quan `project` trong `parserOptions`: chạy `npm run build` xem lỗi chi tiết.
- Lint không chạy: kiểm tra cấu hình `.eslintrc`/`eslint.config.js` và cài đầy đủ devDependencies.

## Muốn mình làm gì tiếp theo?

- Cập nhật README bằng tiếng Anh nếu cần.
- Thêm phần chạy toàn bộ monorepo (root-level) nếu bạn dùng pnpm/turbo.
- Tạo script deploy hoặc mẫu Dockerfile cho frontend.

Nếu bạn muốn, mình sẽ commit thay đổi này hoặc thêm hướng dẫn chạy từ root workspace.
