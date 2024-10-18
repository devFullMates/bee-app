import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
const RoutesPath = lazy(() => import('./routes'));
import './i18n';

function App() {
  return (
    <div className="App">
      <Header logoSrc="/bee.png" companyName="Jeroen's bees" />
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <RoutesPath />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
