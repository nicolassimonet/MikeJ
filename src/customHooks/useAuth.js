import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const mapState = state => ({
  currentUser: state.user.currentUser
});

const useAuth = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(mapState);
  const location = useLocation();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login')
    } else if (currentUser && location.pathname !== "/profil") {
      navigate('/profil')
    }
  }, [currentUser, navigate, location])

  return currentUser;
};

export default useAuth;
