import "../globals.css";
import Layout from "@/components/layout/Layout";
import "../components/ol.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: any) {
   return (
      <>
         <Layout>
            <Component {...pageProps} />
         </Layout>
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
