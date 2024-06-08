const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

module.exports = (req, res) => {
  // Replace with your backend URL
  const target = 'http://158.180.14.4:3000';

  proxy.web(req, res, { target }, (err) => {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  });
};
