import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { AuthContextProvider as AdminConext } from './context/admin/AuthContext';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <AdminConext>
      <AuthContextProvider>
        <RecoilRoot>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </RecoilRoot>
      </AuthContextProvider>
    </AdminConext>
  </React.StrictMode>,
  document.getElementById("root")
);


