// import { useRouter } from 'next/router';
// import {useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';
// import { login } from '../../services/login/login.services';
import { login } from "../../../services/login/login.services";
// import { useUserActions } from '../../hooks/store/useUserActions';
import { useUserActions } from "../../../hooks/store/useUserActions";
// import { isEmailValid, showToast } from '../../common/util/utils';
// import PersistenceManager from '../../../persistence/persistence';
import PersistenceManager from "../../../persistence/persistence"
import { isEmailValid } from '../../../common/util/utils';
import { useCustomRouter } from "../../../hooks/useCustomRouter"

export const useHandleCredentials = () => {
  // const router = useRouter();
  const { redirectToRoot } = useCustomRouter();
  const { updateUser } = useUserActions();
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const credentials = PersistenceManager.getItem("userCredentials");
    if (credentials) {
      setChecked(true);
      setEmail(credentials.email);
      setPassword(credentials.password);
    }
  }, []);

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  }

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
    setEmailError(!isEmailValid(value));
  };

  const handlePasswordLogin = async (event) => {
    event.preventDefault();
    setFailed(false);
    
    try {
      setLoading(true);
      const response = await login({ email, password });
      
      if (response.status) {
         
        const user = response.user;
        PersistenceManager.setItem('userToken', response.token);
        updateUser(user);
        updateCredentials();
        console.log("Redirigiendo a la raíz...");
        // router.push('/demo');
        redirectToRoot();
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        // showToast('Error en la solicitud, inténtalo de nuevo más tarde.', 'error');
        console.log("'Error en la solicitud, inténtalo de nuevo más tarde.'");
      } else {
        console.log("catch en el else" + error)
        setFailed(true);
        setPassword('');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateCredentials = () => {
    if (checked) {
      PersistenceManager.setItem("userCredentials", { email, password });
    } else {
      PersistenceManager.removeItem("userCredentials");
    }
  }
  return {
    loading,
    failed,
    setEmail,
    email,
    // emailError,
    handleEmailChange,
    setPassword,
    password,
    handlePasswordLogin,
    checked,
    handleCheckboxChange
  }
}