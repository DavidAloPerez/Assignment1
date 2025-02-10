import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './routes/Root';
import Dashboard from './routes/Dashboard';
import Tasks from './routes/Tasks';
import ErrorPage from './routes/ErrorPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

export default App;
