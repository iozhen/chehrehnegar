import "../globals.css";
import Layout from "@/components/layout/Layout";
import "../components/ol.css";

function MyApp({ Component, pageProps }: any) {
   return (
      <>
         <Layout>
            <Component {...pageProps} />
         </Layout>
      </>
   );
}
export default MyApp;
