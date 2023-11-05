import './App.css';
import './components/styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { SignupForm, SigninForm, SaloonList, Header, Logout, NoPage, UserProfile, BookingConfirm, BookingList, UserPreference } from './components'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';
import { getLocalAuth, removeLocalAuth, setLocalAuth } from './utils';
import { SamplePayment } from './components/test/SamplePayment';
import { PaymentCallback } from './components/PaymentCallback';
import { BookingDetails } from './components/BookingDetails';
import { SalonDetails } from './components/SalonDetails';
import SalonStylist from './components/StylistList';
import ProtectedRoute from './utils/ProtectedRoute';
import { PartnerHeader } from './components/PartnerHeader';
import { OwnerSalonList } from './components/OwnerSalonList';
import StylistView from './components/StylistView';
import StylistProfile from './components/StylistProfile';
import VerifyBookingOtp from './components/VerifyBookingOtp';
import SalonAdmin from './components/SalonAdmin';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export const AuthContext = createContext(null);

const credentials = getLocalAuth();

function App() {
  const [auth, setAuth] = useState(credentials);
  
  // const currentPath = useLocation();
  const currentPath = window.location.pathname;
  console.log(currentPath)

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
      <div className="app c-container">
        <AuthContext.Provider value={{ auth: auth, setAuth: setAuth }}>
        {currentPath.includes('partner') ? <PartnerHeader /> : <Header/>}
          <ToastContainer />
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <SaloonList />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <SaloonList />
              </ProtectedRoute>
            }/>
            <Route path="/signin" element={<SigninForm />} />
            <Route path="/signin?ref=:id" element={<SigninForm />} />
            <Route path="/signup" element={<SignupForm />} />
            {/* <Route path="/verify" element={<VerifyOtp />} /> */}
            <Route path="/logout" element={
              <ProtectedRoute>
                <Logout/>
              </ProtectedRoute>
            } />

            <Route path="/salon/:salonId" element={
              <ProtectedRoute>
                <SalonDetails />
              </ProtectedRoute>
            } />
            <Route path="/salon/:salonId/stylist" element={
              <ProtectedRoute>
                <SalonStylist />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            } />
            <Route path="/preference" element={
              <ProtectedRoute>
                <UserPreference />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <BookingList />
              </ProtectedRoute>
            } />
            <Route path="/book/:bookingId/confirm" element={
              <ProtectedRoute>
                <BookingConfirm />
              </ProtectedRoute>
            } />
            <Route path="/booking/:bookingId" element={
              <ProtectedRoute>
                <BookingDetails />
              </ProtectedRoute>
            } />

            <Route path="/payment/callback" element={
              <ProtectedRoute>
                <PaymentCallback />
              </ProtectedRoute>
            } />
            <Route path="/test/paymentLink" element={<SamplePayment />} />
            <Route path="*" element={<NoPage />} />

            {/* Partner Pages */}
            <Route path="/partner" element={
                // <StylistView></StylistView>
                <OwnerSalonList />
            } />

            <Route path="/partner/signin" element={<SigninForm />} />
            <Route path="/partner" element={<StylistView />} />
            <Route path="/partner/profile" element={<StylistProfile />} />
            <Route path="/partner/booking/:bookingId/verify" element={<VerifyBookingOtp />} />
            <Route path="/partner/salon" element={<OwnerSalonList />} />
            <Route path="/partner/salon/:salonId" element={<SalonAdmin />} />
          </Routes>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
