import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { SignupForm, VerifyOtp, SigninForm, SaloonList, Header, Logout, BookSalon, NoPage, UserProfile } from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import { getLocalAuth, removeLocalAuth, setLocalAuth } from './utils';
import SamplePayment from './components/test/SamplePayment';
import PaymentCallback from './components/PaymentCallback';
import BookingStatus from './components/BookingStatus';
import { SalonDetails } from './components/SalonDetails';

export const AuthContext = createContext(null);

const credentials = getLocalAuth();

function App() {
  const [auth, setAuth] = useState(credentials);

  useEffect( () => {
    if(auth && credentials !== auth ){
      setLocalAuth(auth);
    }
    else if(!auth){
      removeLocalAuth();
    }
  }, [auth]);

  return (

    <BrowserRouter>
      <div className="app">
        <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
          <Header />
          <Routes>
            <Route path="/" element={<SaloonList />} />
            <Route path="/search" element={<SaloonList />} />
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/signin?ref=:id" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/verify" element={<VerifyOtp />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/book" element={<BookSalon />} />
            <Route path="/appointment/:appointmentId" element={<BookingStatus />} />
            <Route path="/payment/callback" element={<PaymentCallback />} />
            <Route path="/profile" element={<UserProfile />} />

            <Route path="/salon/:saloonId" element={<SalonDetails />} />

            <Route path="/test/paymentLink" element={<SamplePayment />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
