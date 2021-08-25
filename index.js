import Express from 'express';
import Product from './products.js';
//Instance of express
const app = Express();
//Middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
//Available products
const stock = [
	{
		name: 'Product 1',
		sku: '90898909',
		price: '90.991',
		quantity: '100',
	},
	{
		name: 'Product 2',
		sku: '5231243532',
		price: '1000.99',
		quantity: '20',
	},
	{
		name: 'Product 3',
		sku: '1232345',
		price: '89.55',
		quantity: '5',
	},
].map((el) => new Product(el.name, el.sku, el.price, el.quantity));
// Routes
// Greetings
app.get('/', (req, res) => {
	res.send('Hello ExpressJS');
});

// Get products
app.get('/products', (req, res) => {
	res.json(stock);
});
// Get product by SKU
app.get('/products/:sku', (req, res) => {
	const params = req.params;
	if (!params.sku) res.sendStatus(404);
	const product = stock.find((el) => el.sku === params.sku);
	if (product) {
		res.send(product);
	} else {
		res.status(404).send('Product not found');
	}
});
// Add new product
app.post('/products', (req, res) => {
	const data = req.body;
	if (!data) {
		res.status(400).end();
	}
	stock.push(data);
	//return
	res.status(201).send('ok');
});

//Not found
app.get('*', (req, res) => {
	res.status(404).send('Page not found');
});
// Serve application
const port = 3000;
app.listen(port, () => console.log('Server on port ' + port));
