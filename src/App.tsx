import Layout from "./features/layout/Layout";
import AppRouter from "./shared/infrastructure/router/AppRouter";

const App = () => {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
};

export default App;
