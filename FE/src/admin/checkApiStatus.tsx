// import { useNavigate } from "react-router-dom";

// Hàm trợ giúp để kiểm tra trạng thái của API
export function checkApiStatus(status: any, navigate: any) {
  // Sử dụng hook useNavigate để chuyển hướng
  // const navigate = useNavigate();

  // Nếu trạng thái là 403, chuyển hướng đến trang người dùng
  if (status === 403) {
    navigate("/");
  }

  // Nếu trạng thái là 401, chuyển hướng đến trang đăng nhập
  if (status === 401) {
    navigate("/signin");
  }
  // Nếu trạng thái là 200, tiếp tục hành động
  if (status >= 200 && status < 300) {
    return;
  }
}

