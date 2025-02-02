import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import * as serviceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);

serviceWorker.unregister();