# Hệ thống Phân quyền Truy cập Page

## Tổng quan
Hệ thống phân quyền được thiết kế để bảo vệ các route cần authentication và quản lý trạng thái đăng nhập của người dùng.

## Logic Routing Chính

### Catch-all Route (`*`)
- **Đã authenticate** → Redirect về `/` (HomePage)
- **Chưa authenticate** → Redirect về `/landing` (LandingPage)

### Route Structure
- `/` - HomePage (Protected - yêu cầu authentication)
- `/login` - LoginPage (Guest only - không cho phép user đã đăng nhập)
- `/signup` - SignUpPage (Guest only - không cho phép user đã đăng nhập)
- `/landing` - LandingPage (Public - trang chào mừng)
- `*` - Catch-all route (Redirect dựa trên authentication status)

## Các Component chính

### 1. ProtectedRoute
- **Mục đích**: Bảo vệ các route cần authentication
- **Props**:
  - `children`: Component con cần bảo vệ
  - `requireAuth`: Boolean (mặc định: true)
    - `true`: Route yêu cầu đăng nhập
    - `false`: Route dành cho guest (login, signup)
  - `redirectToLanding`: Boolean (mặc định: false)
    - `true`: Sử dụng cho catch-all route
    - `false`: Sử dụng cho route thường

### 2. LoadingSpinner
- **Mục đích**: Hiển thị loading khi đang kiểm tra authentication
- **Sử dụng**: Tự động hiển thị trong ProtectedRoute

### 3. AuthError
- **Mục đích**: Hiển thị thông báo lỗi khi không có quyền truy cập
- **Props**:
  - `message`: Thông báo tùy chỉnh

## Custom Hook

### useAuth
Cung cấp các function và state để quản lý authentication:

```javascript
const { 
  token, 
  isLoggedIn, 
  msg, 
  login, 
  logout, 
  isAuthenticated 
} = useAuth();
```

## Logic hoạt động

### 1. Catch-all Route Logic (`redirectToLanding = true`)
```javascript
if (redirectToLanding) {
  if (isAuthenticated) {
    // Nếu đã authenticate → về home
    return <Navigate to={pathDomain.HOME} replace />;
  } else {
    // Nếu chưa authenticate → về landing
    return <Navigate to={pathDomain.LANDING} replace />;
  }
}
```

### 2. Protected Route Logic
- **Kiểm tra Authentication**:
  - Kiểm tra token trong Redux state
  - Kiểm tra token trong localStorage
  - Nếu có token hợp lệ → cho phép truy cập
  - Nếu không có token → redirect về login

### 3. Guest Route Logic
- Nếu user đã đăng nhập → redirect về home
- Nếu user chưa đăng nhập → cho phép truy cập

### 4. Loading State
- Hiển thị spinner khi đang kiểm tra authentication
- Tránh flash content không mong muốn

## Redux Actions

### authAction
- `login(credentials)`: Đăng nhập user
- `logout()`: Đăng xuất user
- `checkAuthStatus()`: Kiểm tra trạng thái authentication

### authReducer
Xử lý các action types:
- `LOGIN_SUCCESS`: Đăng nhập thành công
- `LOGIN_FAIL`: Đăng nhập thất bại
- `LOGOUT`: Đăng xuất
- `CHECK_AUTH_STATUS`: Kiểm tra trạng thái

## Sử dụng

### Catch-all Route
```javascript
<Route 
  path="*" 
  element={
    <ProtectedRoute redirectToLanding={true}>
      <HomePage />
    </ProtectedRoute>
  } 
/>
```

### Bảo vệ Route
```javascript
<Route 
  path="/protected" 
  element={
    <ProtectedRoute requireAuth={true}>
      <ProtectedComponent />
    </ProtectedRoute>
  } 
/>
```

### Route cho Guest
```javascript
<Route 
  path="/login" 
  element={
    <ProtectedRoute requireAuth={false}>
      <LoginPage />
    </ProtectedRoute>
  } 
/>
```

### Sử dụng useAuth Hook
```javascript
const { login, logout, isAuthenticated } = useAuth();

const handleLogin = async () => {
  await login({ email, password });
};

const handleLogout = () => {
  logout();
};
```

## Flow hoạt động

### User chưa đăng nhập:
1. Truy cập bất kỳ URL → Redirect về `/landing`
2. Từ landing → Click Login → `/login`
3. Đăng nhập thành công → Redirect về `/`

### User đã đăng nhập:
1. Truy cập bất kỳ URL → Redirect về `/`
2. Từ home → Click Logout → Redirect về `/landing`
3. Truy cập `/login` hoặc `/signup` → Redirect về `/`

## Bảo mật

1. **Token Storage**: Token được lưu trong localStorage
2. **Auto Redirect**: Tự động redirect khi không có quyền
3. **Session Persistence**: Duy trì session khi refresh page
4. **Loading Protection**: Tránh flash content không mong muốn
5. **Guest Protection**: Ngăn user đã đăng nhập truy cập trang guest

## Mở rộng

Để thêm route mới:
1. Thêm path vào `pathDomain.js`
2. Wrap component với `ProtectedRoute` nếu cần
3. Cập nhật logic phân quyền nếu cần thiết 