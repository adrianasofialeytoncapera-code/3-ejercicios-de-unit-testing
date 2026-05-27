class ProductService {
  constructor(productRepository) {
    this.repo = productRepository;
  }

  async getById(id) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error(`Producto ${id} no encontrado.`);
    return product;
  }

  async getByCategory(category) {
    const all = await this.repo.findAll();
    return all.filter(p => p.category === category);
  }

  async searchByName(query) {
    if (!query || query.trim() === '') {
      throw new Error('El query no puede estar vacío.');
    }
    const all = await this.repo.findAll();
    return all.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  async create(productData) {
    if (!productData.name || productData.name.trim() === '') {
      throw new Error('El nombre del producto es obligatorio.');
    }
    if (productData.price === undefined || productData.price === null) {
      throw new Error('El precio del producto es obligatorio.');
    }
    if (productData.price <= 0) {
      throw new Error('El precio debe ser mayor a 0.');
    }
    const result = await this.repo.save(productData);
    return result;
  }
}

module.exports = ProductService;