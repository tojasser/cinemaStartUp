// const  proxy  = require("http-proxy-middleware")


// // module.exports =  (app) =>{
// //     app.use(proxy('/functions', {
// //         target: 'http://localhost:9000',
// //         pathRewrite: {
// //             "^\\.netlify/functions": ""
// //         }
// //     }));

// // }

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  debugger
  app.use(
    createProxyMiddleware('/.netlify/functions/',{
        target: 'http://localhost:9000/',
        pathRewrite: {"^/\\.netlify/functions":""}
    })
  );
};