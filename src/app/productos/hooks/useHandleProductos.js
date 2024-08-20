import { useEffect, useState } from 'react';
import { login } from "../../../services/login/login.services";
import { useUserActions } from "../../../hooks/store/useUserActions";
import PersistenceManager from "../../../persistence/persistence"
import { isEmailValid } from '../../../common/util/utils';
import { useCustomRouter } from "../../../hooks/useCustomRouter"

export const useHandleCredentials = () => {
  const { redirectToRoot } = useCustomRouter();
  const { updateUser } = useUserActions();
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const credentials = PersistenceManager.getItem("userCredentials");
    if (credentials) {
      setChecked(true);
      setEmail(credentials.email);
      setPassword(credentials.password);
    }
  }, []);


  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setFailed(false);
    
    try {
      setLoading(true);
      const response = await productos({ email, password });
      
      if (response.status) {
         
        const user = response.user;
        PersistenceManager.setItem('userToken', response.token);
       
        updateUser(user);
        redirectToRoot();
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        // showToast('Error en la solicitud, inténtalo de nuevo más tarde.', 'error');
        console.log("'Error en la solicitud, inténtalo de nuevo más tarde.'");
      } else {
        setFailed(true);
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    failed,
    setEmail,
    email,
    // emailError,
    setPassword,
    password,
    checked,
  }
}