import './App.css';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <div className="layout-container">
        {/* 1. Header hoặc Navigation Bar (luôn hiển thị) */}
        <header>{/* Nội dung Navigation */}</header>

        <main>
          {/* 2. <Outlet />: Nơi các trang con (Login, Rooms) được hiển thị */}
          <Outlet />
        </main>
        <div>hehehe</div>
        {/* 3. Footer (luôn hiển thị) */}
      </div>
    </>
  );
}

export default App;
