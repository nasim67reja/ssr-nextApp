import "../styles/globals.css";
import { Provider } from "react-redux";
import { wrapper } from "../store";
import { setUser } from "../store/authSlice";
// import { setProducts } from "@/store/productSlice";
import { productAction } from "@/store/productSlice";
import axios from "axios";

import { URL } from "@/components/URL";

export default function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

App.getInitialProps = wrapper.getInitialAppProps(
  ({ dispatch }) =>
    async ({ Component, ctx }) => {
      // const data = { id: 1, name: "demo" };
      const res = await axios.get(`https://api.spacexdata.com/v3/launches`);
      const data = res.data;
      dispatch(setUser(data));

      const res2 = await axios.get(`${URL}/api/v1/products`);
      const data2 = res2.data;

      dispatch(productAction.storeProducts(data2));

      if (!ctx.req) {
        return {
          pageProps: {
            ...(Component.getInitialProps
              ? (await Component.getInitialProps(ctx))?.initialProps ||
                (await Component.getInitialProps(ctx))
              : {}),
            pathname: ctx.pathname,
          },
        };
      }

      try {
        return {
          pageProps: {
            ...(Component.getInitialProps
              ? (await Component.getInitialProps(ctx)).initialProps ||
                (await Component.getInitialProps(ctx))
              : {}),
            pathname: ctx.pathname,
          },
        };
      } catch (error) {
        if (ctx.res) {
          // server
          ctx.res.writeHead(302, {
            Location: "/404",
          });
          ctx.res.end();
        } else {
          // client
          // Router.push('/404');
        }
        return;
        // ctx.res.statusCode = 404;
        // ctx.res.end("Not found");
        // return;
      }
    }
);
