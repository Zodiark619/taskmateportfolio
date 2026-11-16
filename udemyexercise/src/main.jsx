import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from './bookContext'
createRoot(document.getElementById('root')).render(
<Provider>
    <App />
</Provider >
)
