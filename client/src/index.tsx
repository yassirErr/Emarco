import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/layout/style.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';


export const history= createBrowserHistory({ window });




const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode> 
      <HistoryRouter history={history}>
     
          <Provider store={store}>
          <App/>
          </Provider>
      
    </HistoryRouter>
  </React.StrictMode>
);
reportWebVitals();
