import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return isAuthenticated ? element : <Navigate to="/auth" />;
};

export default ProtectedRoute;