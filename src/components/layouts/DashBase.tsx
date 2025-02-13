import { Outlet } from 'react-router-dom';
// import '@/styles/main.css';

function DashBoardLayout() {
  return (
    <>
      <div>
      <div className="relative z-20 flex items-center text-lg font-medium bg-pink-800 text-white p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
        Ayush Heart Organization
          </div>
      </div>
      <Outlet />
    </>
  );
}

export default DashBoardLayout;
