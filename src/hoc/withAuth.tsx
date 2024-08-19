import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { decodeJwt } from 'jose';

interface DecodedToken {
  exp: number;
  // Añade aquí otras propiedades que esperas en tu token
}

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const Router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      const validateToken = () => {
        const token = localStorage.getItem('userToken');
        
        if (!token) {
          setAuthorized(false);
          Router.replace('/login');
          return;
        }

        try {
          const decodedToken = decodeJwt(token);
          decodedToken.exp = decodedToken?.exp ?? 0;

          const currentTime = Date.now() / 1000;

          if (decodedToken.exp < currentTime) {
            // Token ha expirado
            localStorage.removeItem('userToken');
            setAuthorized(false);
            Router.replace('/login');
          } else {
            setAuthorized(true);
          }
        } catch (error) {
          // Error al decodificar el token
          console.error('Error al decodificar el token:', error);
          localStorage.removeItem('userToken');
          setAuthorized(false);
          Router.replace('/login');
        }
      };

      validateToken();
    }, [Router]);

    if (authorized) {
      return <WrappedComponent {...props} />;
    } else {
      return null; // O un componente de carga
    }
  };
};

export default withAuth;