import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/AuthSlice';

export const useAuth = () => {
    return useSelector(selectIsLoggedIn);
};