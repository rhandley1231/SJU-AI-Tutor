import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChatViewPage from './components/ChatViewPage/ChatViewPage';
import DiagnosticViewPage from './components/DiagnosticViewPage/DiagnosticViewPage';
import ChapterList from './components/ChapterList';
import ChapterQuiz from './components/ChapterQuiz';
import AuthPage from './components/AuthPage';
<<<<<<< HEAD
import SurveyPage from './components/SurveyPage';
=======
>>>>>>> d3c1455 (Created my own branch.)
import authService from './services/authService';
import './App.css';

/**
 * App Component
 * 
 * The root component for the Ciro AI Tutor application. This component sets up
 * the routing system using React Router and provides the main application
 * structure, including the header and content area.
 * 
 * The application has two main views:
 * 1. Chat View ('/') - The primary interface for conversing with the AI tutor
 * 2. Diagnostics View ('/diagnostics') - A dashboard showing student progress and resources
 * 
 * Future enhancements may include:
 * - Authentication persistence across refreshes
 * - Settings pages
 * - Admin interfaces
 * - Error boundaries
 * 
 * @component
 * @example
 * return (
 *   <App />
 * )
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
<<<<<<< HEAD
  const [needsSurvey, setNeedsSurvey] = useState<boolean>(false);

  // Check authentication status and survey completion on app load
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = authService.isAuthenticated();
      setIsAuthenticated(isLoggedIn);
      
      // Check if user needs to complete the survey
      if (isLoggedIn) {
        const userProfile = authService.getUserProfile();
        const hasSurveyData = userProfile?.surveyResponses;
        setNeedsSurvey(!hasSurveyData);
      } else {
        setNeedsSurvey(false);
=======
  const [userEmail, setUserEmail] = useState<string | null>(null);


  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = authService.isAuthenticated();
      const email = sessionStorage.getItem('userEmail'); // Retrieve the email from session

      setIsAuthenticated(isLoggedIn);
      // Set the user email if available
      if (isLoggedIn && email) {
        setUserEmail(email);
      } else {
        setUserEmail(null);
>>>>>>> d3c1455 (Created my own branch.)
      }
    };
    
    checkAuth();
    
    // Set up event listener for auth changes (like storage events)
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
<<<<<<< HEAD
  const handleAuthSuccess = (isSignup: boolean = false) => {
    setIsAuthenticated(true);
    
    if (isSignup) {
      // Always show survey for new signups
      setNeedsSurvey(true);
    } else {
      // For login, only show survey if they haven't completed it
      const userProfile = authService.getUserProfile();
      const hasSurveyData = userProfile?.surveyResponses;
      setNeedsSurvey(!hasSurveyData);
    }
  };
  
  const handleSurveyComplete = () => {
    setNeedsSurvey(false);
  };
  
  const handleLogout = () => {
    authService.signout();
    setIsAuthenticated(false);
    setNeedsSurvey(false);
=======
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);

    // Retrieve and set email after login
    const email = sessionStorage.getItem('userEmail');
    setUserEmail(email || null);
  };
  
  const handleLogout = () => {
    authService.signout(); // Call the auth service to handle the logout on the backend
    sessionStorage.removeItem('userEmail'); // Remove email from session storage
    setIsAuthenticated(false);
    setUserEmail(null); // Clear the email from state
>>>>>>> d3c1455 (Created my own branch.)
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Global header - present on all pages when authenticated */}
        {isAuthenticated && (
          <header className="header">
            <div className="header-left"></div>
            <div className="header-center">CIRO AI Tutor</div>
            <div className="header-right">
<<<<<<< HEAD
=======
              {userEmail && <span className="user-email">Logged in as: {userEmail}</span>}
>>>>>>> d3c1455 (Created my own branch.)
              <button className="logout-button" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </header>
        )}
        
        {/* Main content area - houses all routes */}
        <div className={`content-container ${!isAuthenticated ? 'full-height' : ''}`}>
          <Routes>
            {/* Auth routes - accessible when not authenticated */}
            <Route
              path="/login"
<<<<<<< HEAD
              element={isAuthenticated ? (needsSurvey ? <Navigate to="/survey" /> : <Navigate to="/" />) : <AuthPage onAuthSuccess={handleAuthSuccess} />}
            />
            
            {/* Survey route - only accessible to authenticated users who haven't completed the survey */}
            <Route
              path="/survey"
              element={isAuthenticated ? (needsSurvey ? <SurveyPage onComplete={handleSurveyComplete} /> : <Navigate to="/" />) : <Navigate to="/login" />}
            />
            
            {/* Protected routes - redirect to survey if needed, otherwise to login if not authenticated */}
            <Route
              path="/"
              element={
                isAuthenticated 
                  ? (needsSurvey ? <Navigate to="/survey" /> : <ChatViewPage />) 
                  : <Navigate to="/login" />
              }
=======
              element={isAuthenticated ? <Navigate to="/" /> : <AuthPage onAuthSuccess={handleAuthSuccess} />}
            />
            
            {/* Protected routes - redirect to login if not authenticated */}
            <Route
              path="/"
              element={isAuthenticated ? <ChatViewPage /> : <Navigate to="/login" />}
>>>>>>> d3c1455 (Created my own branch.)
            />
            
            <Route
              path="/diagnostics"
<<<<<<< HEAD
              element={
                isAuthenticated 
                  ? (needsSurvey ? <Navigate to="/survey" /> : <DiagnosticViewPage />) 
                  : <Navigate to="/login" />
              }
=======
              element={isAuthenticated ? <DiagnosticViewPage /> : <Navigate to="/login" />}
>>>>>>> d3c1455 (Created my own branch.)
            />
            
            <Route
              path="/diagnostics/chapters"
<<<<<<< HEAD
              element={
                isAuthenticated 
                  ? (needsSurvey ? <Navigate to="/survey" /> : <ChapterList />) 
                  : <Navigate to="/login" />
              }
=======
              element={isAuthenticated ? <ChapterList /> : <Navigate to="/login" />}
>>>>>>> d3c1455 (Created my own branch.)
            />
            
            <Route
              path="/diagnostics/quiz/:chapterId"
<<<<<<< HEAD
              element={
                isAuthenticated 
                  ? (needsSurvey ? <Navigate to="/survey" /> : <ChapterQuiz />) 
                  : <Navigate to="/login" />
              }
            />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to={isAuthenticated ? (needsSurvey ? "/survey" : "/") : "/login"} />} />
=======
              element={isAuthenticated ? <ChapterQuiz /> : <Navigate to="/login" />}
            />
            
            {/* Default redirect */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
>>>>>>> d3c1455 (Created my own branch.)
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;