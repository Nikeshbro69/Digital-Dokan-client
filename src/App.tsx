import { Provider } from 'react-redux';
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import store from './store/store';
import Register from './pages/user/Register';


function App() {

  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/register'  element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
