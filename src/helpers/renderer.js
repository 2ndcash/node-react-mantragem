import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';
import Routes from '../Routes';

export default (req, store, context) => {
  let content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <>{renderRoutes(Routes)}</>
      </StaticRouter>
    </Provider>
  );

  const scriptFBPixel = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return '';
    } else {
      return '';
      //   return (`
      //   <script>
      //   !function(f,b,e,v,n,t,s)
      //   {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      //   n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      //   if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      //   n.queue=[];t=b.createElement(e);t.async=!0;
      //   t.src=v;s=b.getElementsByTagName(e)[0];
      //   s.parentNode.insertBefore(t,s)}(window, document,'script',
      //   'https://connect.facebook.net/en_US/fbevents.js');
      //   fbq('init', '1242542969428511');
      //   fbq('track', 'PageView');
      //   </script>
      //   <noscript><img height="1" width="1" style="display:none"
      //   src="https://www.facebook.com/tr?id=1242542969428511&ev=PageView&noscript=1"
      //   /></noscript>
      // `)
    }
  }

  const scriptGGTagManager = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return '';
    } else {
      return '';
      // return (`
      // <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      // })(window,document,'script','dataLayer','GTM-KK97R8V');</script>
      // `)
    }
  }

  const helmet = Helmet.renderStatic();
  return `<!DOCTYPE html>
            <head>
                <meta charset="utf-8" />
                <link rel="shortcut icon" href="/images/favicon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                ${helmet.meta.toString()}
                <link rel="stylesheet" href="/vendors/feather/feather.css" />
                <link rel="stylesheet" href="/vendors/ti-icons/css/themify-icons.css" />
                <link rel="stylesheet" href="/vendors/css/vendor.bundle.base.css" />
                ${helmet.title.toString()}
                <link rel="stylesheet" href="/vendors/datatables.net-bs4/dataTables.bootstrap4.css" />
                <link rel="stylesheet" href="/vendors/ti-icons/css/themify-icons.css" />
                <link rel="stylesheet" type="text/css" href="/js/select.dataTables.min.css" /> 
                <link rel="stylesheet" href="/css/vertical-layout-light/style.css" />
                ${helmet.link.toString()}
                <!-- Facebook Pixel Code -->
                ${scriptFBPixel()}
                <!-- End Facebook Pixel Code -->
                <!-- Google Tag Manager -->
                ${scriptGGTagManager()}
                <!-- End Google Tag Manager -->
                <noscript>${process.env.NODE_ENV}</noscript>
            </head>
            <body>
                <div class="container-scroller" id="root">${content}</div>
                <script>
                    window.__PRELOADED_STATE__ = ${serialize(store.getState()).replace(
    /</g,
    '\\u003c'
  )}
                </script>

                <!-- plugins:js -->
                <script src="/vendors/js/vendor.bundle.base.js"></script>
                <!-- endinject -->
                <!-- Plugin js for this page -->
                <script src="/vendors/chart.js/Chart.min.js"></script>
                <script src="/vendors/datatables.net/jquery.dataTables.js"></script>
                <script src="/vendors/datatables.net-bs4/dataTables.bootstrap4.js"></script>
                <script src="/js/dataTables.select.min.js"></script>

                <!-- End plugin js for this page -->
                <!-- inject:js -->
                <script src="/js/off-canvas.js"></script>
                <script src="/js/hoverable-collapse.js"></script>
                <script src="/js/template.js"></script>
                <script src="/js/settings.js"></script>
                <script src="/js/todolist.js"></script>
                <!-- endinject -->
                <!-- Custom js for this page-->
                <script src="/js/dashboard.js"></script>
                <script src="/js/Chart.roundedBarCharts.js"></script>
                <!-- End custom js for this page-->
                ${helmet.script.toString()}
                <script src="/bundle.js"></script>
            </body>
    </html>`;
};
