import { Outlet } from "react-router-dom";


const RootLayout = () => {

  return (
    <div className="w-full flex items-center justify-center h-screen">
      <Outlet />
    </div>
  );
};

export default RootLayout;
