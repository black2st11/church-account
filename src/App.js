import logo from './logo.svg';
import './App.css';
import ListPage from './page/ListPage';
import LoginPage from './page/LoginPage'
import { useEffect, useState } from 'react';
import { isLoginedApi, refreshTokenApi } from './api/auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(()=>{
    (async()=>{
      const access = localStorage.getItem('access')
      if (access){
        let res = await isLoginedApi({access})
        if (res.status > 400){
          const refresh = localStorage.getItem('refresh')
          let res = await refreshTokenApi({refresh})
          if (res.status > 400){
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return
          }
          localStorage.setItem('access', res.data.access)
          setIsAuthenticated(true)
        }
        setIsAuthenticated(true)
      }
      return
    })();
  })
  if (isAuthenticated){
    return <ListPage />
  }
  return <LoginPage />
}

export default App;
