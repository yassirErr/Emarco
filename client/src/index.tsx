import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { StoreProvider } from './app/context/StoreContext';

export const history= createBrowserHistory({ window });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode> 
      <HistoryRouter history={history}>
        <StoreProvider>
          <App/>
        </StoreProvider>
    </HistoryRouter>
  </React.StrictMode>
);
reportWebVitals();
