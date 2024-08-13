import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login } from '../../services/login/login.services';
import { useUserActions } from '../../hooks/store/useUserActions';
import { isEmailValid, showToast } from '../../common/util/utils';
import PersistenceManager from '../../persistence/persistence';

export const useHandleCredentials = () => {
  const navigate = useNavigate();
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
        navigate('/');
      }
    } catch (error) {
      if (error.message === "Failed to fetch") {
        showToast('Error en la solicitud, inténtalo de nuevo más tarde.', 'error');
      } else {
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

  const handleSpecialKey = (e) => {
    if (e.keyCode === 13 && email && password)
      handlePasswordLogin(e);
  };

  return {
    loading,
    failed,
    setEmail,
    email,
    emailError,
    handleEmailChange,
    setPassword,
    password,
    handleSpecialKey,
    handlePasswordLogin,
    checked,
    handleCheckboxChange
  }
}