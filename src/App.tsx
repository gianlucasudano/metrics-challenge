import { HashRouter, Route, Routes } from 'react-router-dom';
import { NotFound, Example, Home } from './pages';

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/example" element={<Example />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
