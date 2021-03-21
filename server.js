const http = require('http');
const {
  getProducts,
  getProduct,
} = require('./controllers/productController');

const server = http.createServer((req, res) => {
  if (req.url === '/api/products' && req.method === 'GET') {
    getProducts(req, res);
  } else if (req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
    /**
     * here we match using regex,
     * any url that contains alpha-numeric characters in id,
     * even if they're more than once, are allowed
     * the @id can then be extracted from "req.url"
     *  */
    const id = req.url.split('/')[3];
    getProduct(req, res, id);
  }  else {
    console.log(req.url);
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route Not Found' }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
