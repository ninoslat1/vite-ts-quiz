import ReactDOM from 'react-dom/client'
import Footer from '../src/components/Footer'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div className='py-[10vh] md:py-[20vh] h-[100vh] relative'>
        <App />
        <Footer/>
    </div>
)
