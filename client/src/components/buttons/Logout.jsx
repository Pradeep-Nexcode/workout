import React, { useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
// import { logoutUser } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { selectIsAuthenticated } from "../../store/selectors/authSelectors";

const Logout = ({ isCollapsed }) => {
  // const isAuthenticated = useSelector(selectIsAuthenticated);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await dispatch(logoutUser());

  //     navigate("/login", { replace: true });
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  return (
    <div
      className="flex items-center cursor-pointer px-2 space-x-3 text-gray-300"
      // onClick={handleLogout}
    >
      <FiLogOut className={` ${isCollapsed && "text-2xl"}`} />
      {!isCollapsed && (
        <p className="text-gray-300 font-semibold py-3 text-sm">Logout</p>
      )}
    </div>
  );
};

export default Logout;
