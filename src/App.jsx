import { RouterProvider } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";
import router from "./routes/router";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
