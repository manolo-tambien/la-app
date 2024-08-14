// import { useAppDipatch } from '../../hooks/store/store';
import { useAppDipatch} from './store';  
import { sessionActions } from '../../store';

export const useUserActions  = () => {
  const dispatch = useAppDipatch();

  const updateUser = (user) => {
    dispatch(sessionActions.updateUser(user));
  }

  const resetSession = () => {
    dispatch(sessionActions.resetSession());
  }

  return { updateUser, resetSession };
}