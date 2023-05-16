import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { SignupForm, VerifyOtp, SigninForm, SaloonList, Header } from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './RootLayout';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SaloonList />} />
        <Route path="/search" element={<SaloonList />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify" element={<VerifyOtp />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
