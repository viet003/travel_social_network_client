import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineExplore } from 'react-icons/md';
import { LoginModal, SignUpModal, Modal } from "../../components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
const LandingPage = () => {
  const navigate = useNavigate();
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [modalType, setModalType] = useState(''); // Thêm state để đánh dấu loại modal

  // Đóng modal
  const handleCloseModal = () => {
    setOpenLogin(false);
    setOpenSignUp(false);
    setModalType('');
  };

  // Mở modal login
  const handleOpenLogin = () => {
    setOpenLogin(true);
    setModalType('login');
  };

  // Mở modal signup
  const handleOpenSignUp = () => {
    setOpenSignUp(true);
    setModalType('signup');
  };

  // Chuyển đổi giữa login và signup
  const switchToSignUp = () => {
    setOpenLogin(false);
    setOpenSignUp(true);
    setModalType('signup');
  };

  const switchToLogin = () => {
    setOpenSignUp(false);
    setOpenLogin(true);
    setModalType('login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <div className="flex items-center space-x-2">
            <a href='#' className="flex items-center text-xl font-bold text-blue-500">
              <MdOutlineExplore className="text-blue-600 w-7 h-7"   />
              TravelNest
              </a>
          </div>
          <nav className="hidden space-x-8 font-medium text-gray-700 md:flex">
            <a href="#" className="hover:text-blue-500">Discover</a>
            <a href="#" className="hover:text-blue-500">Community</a>
            <a href="#" className="hover:text-blue-500">Destinations</a>
            <a href="#" className="hover:text-blue-500">About</a>
          </nav>
          <div className="flex space-x-2">
            <button onClick={handleOpenLogin} className="px-4 py-1 text-gray-700 rounded hover:bg-gray-100">Log In</button>
            <button onClick={handleOpenSignUp} className="px-4 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full h-[380px] md:h-[420px] flex items-center justify-center bg-gray-800">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80"
          alt="hero-bg"
          className="absolute inset-0 object-cover w-full h-full opacity-70"
        />
        <div className="relative z-10 max-w-2xl px-4 mx-auto text-center text-white">
          <h1 className="mb-4 text-4xl font-extrabold md:text-5xl">Explore the World Together</h1>
          <p className="mb-6 text-lg font-medium md:text-xl">Connect with fellow travelers, share your adventures, and create unforgettable memories together</p>
          <div className="flex justify-center space-x-4">
            <button onClick={handleOpenSignUp} className="px-6 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</button>
            <button onClick={handleOpenLogin} className="px-6 py-2 font-semibold text-blue-500 bg-white rounded hover:bg-gray-100">Log In</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl px-4 py-12 mx-auto">
        <h2 className="mb-10 text-2xl font-bold text-center text-gray-800 md:text-3xl">Connect. Share. Explore.</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 bg-white shadow rounded-xl">
            {/* Share Icon */}
            <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 8a3 3 0 11-6 0 3 3 0 016 0zM19.5 19.5a3.5 3.5 0 10-7 0m7 0a3.5 3.5 0 01-7 0m7 0V17a2 2 0 00-2-2h-3a2 2 0 00-2 2v2.5" /></svg>
            <h3 className="mb-1 text-lg font-semibold">Share Trips</h3>
            <p className="text-sm text-center text-gray-500">Document and share your journey with photos, stories, and tips</p>
          </div>
          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 bg-white shadow rounded-xl">
            {/* Group Icon */}
            <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            <h3 className="mb-1 text-lg font-semibold">Join Travel Groups</h3>
            <p className="text-sm text-center text-gray-500">Find like-minded travelers and plan adventures together</p>
          </div>
          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 bg-white shadow rounded-xl">
            {/* Star Icon */}
            <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.29a1 1 0 00.95.69h6.631c.969 0 1.371 1.24.588 1.81l-5.37 3.905a1 1 0 00-.364 1.118l2.036 6.29c.3.921-.755 1.688-1.54 1.118l-5.37-3.905a1 1 0 00-1.176 0l-5.37 3.905c-.784.57-1.838-.197-1.54-1.118l2.036-6.29a1 1 0 00-.364-1.118L2.342 11.717c-.783-.57-.38-1.81.588-1.81h6.631a1 1 0 00.95-.69l2.036-6.29z" /></svg>
            <h3 className="mb-1 text-lg font-semibold">Rate Destinations</h3>
            <p className="text-sm text-center text-gray-500">Help others discover hidden gems and must-visit spots</p>
          </div>
          {/* Feature 4 */}
          <div className="flex flex-col items-center p-6 bg-white shadow rounded-xl">
            {/* Map Icon */}
            <svg className="w-10 h-10 mb-3 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V5.618a2 2 0 011.553-1.894L9 2m0 18v-16m0 16l6-3m0 0V2m0 15l5.447 2.724A2 2 0 0021 18.382V8.618a2 2 0 00-1.553-1.894L15 4" /></svg>
            <h3 className="mb-1 text-lg font-semibold">Plan Together</h3>
            <p className="text-sm text-center text-gray-500">Create collaborative itineraries with fellow travelers</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t">
        <div className="grid grid-cols-1 gap-8 px-4 py-10 mx-auto text-gray-700 max-w-7xl md:grid-cols-4">
          <div>
            <span className="flex items-center text-lg font-bold text-blue-500">
              <MdOutlineExplore className="text-blue-600 w-7 h-7"   />
              TravelNest
              </span>
            <p className="mt-2 text-sm">Your global travel community</p>
            <div className="flex mt-4 space-x-3">
              {/* Social icons */}
              <a href="#" className="text-gray-500 hover:text-blue-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04A4.28 4.28 0 0016.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.7-.02-1.36-.21-1.94-.53v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 012 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 006.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0024 4.59a8.36 8.36 0 01-2.54.7z" /></svg></a>
              <a href="#" className="text-gray-500 hover:text-blue-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.6 8.07 8.19 8.93.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.54-1.37-1.32-1.74-1.32-1.74-1.08-.74.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.06 1.82 2.78 1.3 3.46.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.97 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.23 0 4.64-2.8 5.67-5.47 5.97.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C18.36 20.07 22 16.41 22 12c0-5.5-4.46-9.96-9.96-9.96z" /></svg></a>
              <a href="#" className="text-gray-500 hover:text-blue-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001c-.2-1.5-.8-2.7-2.1-3.5-1.2-.8-2.6-1-4.1-1.1-1.5-.1-6.1-.1-7.6 0-1.5.1-2.9.3-4.1 1.1-1.3.8-1.9 2-2.1 3.5-.2 1.5-.2 4.6-.2 4.6s0 3.1.2 4.6c.2 1.5.8 2.7 2.1 3.5 1.2.8 2.6 1 4.1 1.1 1.5.1 6.1.1 7.6 0 1.5-.1 2.9-.3 4.1-1.1 1.3-.8 1.9-2 2.1-3.5.2-1.5.2-4.6.2-4.6s0-3.1-.2-4.6zm-12.8 7.2v-6.4l6.4 3.2-6.4 3.2z" /></svg></a>
              <a href="#" className="text-gray-500 hover:text-blue-500"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.6 3.2H4.4C3.1 3.2 2 4.3 2 5.6v12.8c0 1.3 1.1 2.4 2.4 2.4h15.2c1.3 0 2.4-1.1 2.4-2.4V5.6c0-1.3-1.1-2.4-2.4-2.4zm-9.6 14.4V6.4l8 5.6-8 5.6z" /></svg></a>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Company</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-blue-500">About Us</a></li>
              <li><a href="#" className="hover:text-blue-500">Careers</a></li>
              <li><a href="#" className="hover:text-blue-500">Press</a></li>
              <li><a href="#" className="hover:text-blue-500">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Community</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-blue-500">Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-500">Safety</a></li>
              <li><a href="#" className="hover:text-blue-500">Support</a></li>
              <li><a href="#" className="hover:text-blue-500">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-semibold">Legal</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:text-blue-500">Terms</a></li>
              <li><a href="#" className="hover:text-blue-500">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-500">Cookies</a></li>
              <li><a href="#" className="hover:text-blue-500">Help Center</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between px-4 py-4 mx-auto text-xs text-gray-400 border-t md:flex-row max-w-7xl">
          <span>© 2025 TravelNest. All rights reserved.</span>
          <span className="flex items-center mt-2 space-x-1 md:mt-0">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.95l-.71.71M21 12h-1M4 12H3m16.95 7.05l-.71-.71M4.05 4.05l-.71-.71" /></svg>
            <span>English (US)</span>
          </span>
        </div>
      </footer>
      {/* Modal hiển thị login/signup */}
      <Modal open={openLogin} type={modalType} onClose={handleCloseModal}>
        <LoginModal modalType={modalType} onSwitchToSignUp={switchToSignUp} />
      </Modal>
      <Modal open={openSignUp} type={modalType} onClose={handleCloseModal}>
        <SignUpModal modalType={modalType} onSwitchToLogin={switchToLogin} />
      </Modal>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default LandingPage;
