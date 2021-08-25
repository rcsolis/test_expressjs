class Product {
	constructor(name, sku, price, quantity) {
		this.name = name.trim();
		this.price = parseFloat(price);
		this.sku = sku.trim();
		this.quantity = parseInt(quantity);
	}
}

export default Product;
