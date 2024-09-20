import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import { PATHS } from './constant/path';

import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Homepage/Home';
import Cv from './pages/CV Assistance/Cv';
import Simulated from './pages/Simulated Interview/SimulatedInterview';
import ContactUs from './pages/Contact Us/ContactUs';

function App() {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path={PATHS.CV.INDEX} element={<Cv />} />
        <Route path={PATHS.SIMULATED_INTERVIEW.INDEX} element={<Simulated />} />
        <Route path={PATHS.CONTACT.INDEX} element={<ContactUs />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;