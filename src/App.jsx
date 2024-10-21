import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import { PATHS } from './constant/path';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Homepage/Home';
import Cv from './pages/CV Assistance/Cv';
import Simulated from './pages/Simulated Interview/SimulatedInterview';
import ContactUs from './pages/Contact Us/ContactUs';
import Pricing from './pages/Pricing/Pricing';
import CourseraVideo from './pages/Course Video/CourseVideo';
import LandingPage from './pages/Landing Page/LandingPage';
import VideoPlayerPage from './pages/PlayerVideo/PlayerVideo';
import PolicyPage from './pages/Policy Page/Policy';
import CVMaker from './pages/CV Maker Page/CvMaker';
import LoginPage from './pages/LoginPage/LoginPage';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Checkout from './components/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import GradeResume from './pages/GradeResume/GradeResume';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserManagement from './pages/Admin/User Management/UserManagement';
import JobManagement from './pages/Admin/Job Management/JobManagement';
import PlanManagement from './pages/Admin/Plan Management/PlanManagement';
import InterviewAI from './pages/InterviewAI/InterviewAI';
import PaymentSuccess from './pages/PaymentStatus/PaymentSuccess';
import PaymentFail from './pages/PaymentStatus/PaymentFail';
import JobPage from './pages/JobPage/JobPage/JobPage';
import JobDetailPage from './pages/JobPage/JobPageDetail/JobPageDetail';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.LANDING.INDEX} element={<LandingPage />} />
          <Route
            path={PATHS.CV.INDEX}
            element={
              <PrivateRoute>
                <Cv />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.SIMULATED_INTERVIEW.INDEX}
            element={
              <PrivateRoute>
                <Simulated />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.CONTACT.INDEX} element={<ContactUs />} />
          <Route
            path={PATHS.PRICING.INDEX}
            element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.LEARNING.INDEX}
            element={
              <PrivateRoute>
                <CourseraVideo />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.VIDEO_PLAYER.INDEX}
            element={
              <PrivateRoute>
                <VideoPlayerPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.CHECKOUT.INDEX}
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.POLICY.INDEX} element={<PolicyPage />} />
          <Route
            path={PATHS.CV_MAKER.INDEX}
            element={
              <PrivateRoute>
                <CVMaker />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
          <Route
            path={PATHS.PROFILE}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.GRADE_RESUME}
            element={
              <PrivateRoute>
                <GradeResume />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.DASHBOARD.INDEX}
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path={PATHS.DASHBOARD.CHILDREN.USER}
              element={<UserManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.JOB}
              element={<JobManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.PLAN}
              element={<PlanManagement />}
            />
          </Route>
          <Route path={PATHS.INTERVIEW} element={<InterviewAI />} />
          <Route path={PATHS.SUCCESS} element={<PaymentSuccess />} />
          <Route path={PATHS.FAIL} element={<PaymentFail />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
