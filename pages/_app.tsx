import "../globals.css";
import Layout from "@/components/layout/Layout";
import "../components/ol.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: any) {
   return (
      <>
         <Provider store={store}>
            <Layout>
               <Component {...pageProps} />
            </Layout>
         </Provider>
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </>
   );
}
export default MyApp;
