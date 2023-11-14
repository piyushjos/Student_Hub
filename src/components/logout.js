import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../store/cartSlice";
import { clearcart3 } from "../store/cartSlice3";

function Logout() {
  const dispatch = useDispatch();
  dispatch(clearcart());
  dispatch(clearcart3());

  localStorage.clear();

  return (
    <div>
      <Navigate to="/" />
    </div>
  );
}

export default Logout;
