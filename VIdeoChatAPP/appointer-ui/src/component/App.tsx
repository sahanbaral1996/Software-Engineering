import Router from "./Router";
import ErrorBoundary from "./common/ErrorBoundary/ErrorBoundary";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};

export default App;
