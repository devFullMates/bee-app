import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
const RoutesPath = lazy(() => import('./routes'));
import './i18n'; // Import i18n configuration

function App() {
  return (
    <div className="App">
      <Header logoSrc="/bee.png" companyName="Jeroen's bees" />
      {/* ErrorBoundary: This setup ensures that any errors occurring within the children of ErrorBoundary will be caught, and a fallback UI will be rendered */}
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
        {/*Suspense: While RoutesPath (and any of its components) are being lazy-loaded, the fallback UI (<div>Loading...</div>) will be displayed. */}
          <RoutesPath />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
