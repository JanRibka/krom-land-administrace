import RefreshToken from "shared/components/refreshToken/RefreshToken";

import AppRouter from "./shared/infrastructure/router/AppRouter";

const App = () => {
  return (
    <>
      <RefreshToken />
      <AppRouter />
    </>
  );
};

export default App;
