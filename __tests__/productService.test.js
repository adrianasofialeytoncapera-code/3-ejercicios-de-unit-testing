const ProductService = require('../src/productService');

// Repositorio simulado con funciones mockeadas
const mockRepo = {
  findAll:  jest.fn(),
  findById: jest.fn(),
  save:     jest.fn(),
};

describe('ProductService', () => {
  let service;

  beforeEach(() => {
    jest.clearAllMocks(); // limpia historial entre tests
    service = new ProductService(mockRepo);
  });

  describe('getById()', () => {
    it('devuelve el producto cuando existe', async () => {
      // Arrange
      mockRepo.findById.mockResolvedValue({ id: 1, name: 'Laptop', price: 1500 });

      // Act
      const product = await service.getById(1);

      // Assert
      expect(product.name).toBe('Laptop');
      expect(mockRepo.findById).toHaveBeenCalledWith(1);
      expect(mockRepo.findById).toHaveBeenCalledTimes(1);
    });

    it('lanza Error si el producto no existe', async () => {
      mockRepo.findById.mockResolvedValue(null);

      await expect(service.getById(99)).rejects.toThrow('Producto 99 no encontrado.');
    });

    it('verifica que el repositorio fue llamado con el ID correcto', async () => {
      mockRepo.findById.mockResolvedValue({ id: 5, name: 'Mouse', price: 25 });

      await service.getById(5);

      expect(mockRepo.findById).toHaveBeenCalledWith(5);
    });
  });

  describe('getByCategory()', () => {
    it('devuelve solo los productos de esa categoría', async () => {
      // Arrange
      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop',   price: 1500, category: 'electronica' },
        { id: 2, name: 'Camiseta', price: 20,   category: 'ropa'        },
        { id: 3, name: 'Tablet',   price: 800,  category: 'electronica' },
      ]);

      // Act
      const result = await service.getByCategory('electronica');

      // Assert
      expect(result).toHaveLength(2);
      expect(result.every(p => p.category === 'electronica')).toBe(true);
    });

    it('devuelve array vacío si no hay productos en esa categoría', async () => {
      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop', price: 1500, category: 'electronica' },
      ]);

      const result = await service.getByCategory('ropa');

      expect(result).toEqual([]);
    });
  });

  describe('searchByName()', () => {
    it('devuelve productos que contienen el query en el nombre', async () => {
      // Arrange
      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop Gamer',  price: 1500 },
        { id: 2, name: 'Laptop Básica', price: 800  },
        { id: 3, name: 'Mouse',         price: 25   },
      ]);

      // Act
      const result = await service.searchByName('laptop');

      // Assert
      expect(result).toHaveLength(2);
    });

    it('la búsqueda es case-insensitive', async () => {
      mockRepo.findAll.mockResolvedValue([
        { id: 1, name: 'Laptop Gamer', price: 1500 },
        { id: 2, name: 'Mouse',        price: 25   },
      ]);

      const result = await service.searchByName('LAPTOP');

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Laptop Gamer');
    });

    it('lanza Error si el query está vacío', async () => {
      await expect(service.searchByName('')).rejects.toThrow(Error);
    });

    it('lanza Error si el query es solo espacios', async () => {
      await expect(service.searchByName('   ')).rejects.toThrow(Error);
    });
  });

  describe('create()', () => {
    it('llama a save() y devuelve el producto creado', async () => {
      // Arrange
      const productData = { name: 'Teclado', price: 50 };
      mockRepo.save.mockResolvedValue({ id: 1, ...productData });

      // Act
      const result = await service.create(productData);

      // Assert
      expect(result.name).toBe('Teclado');
      expect(mockRepo.save).toHaveBeenCalledTimes(1);
      expect(mockRepo.save).toHaveBeenCalledWith(productData);
    });

    it('lanza Error si el precio es negativo', async () => {
      await expect(
        service.create({ name: 'Producto', price: -10 })
      ).rejects.toThrow(Error);
    });

    it('lanza Error si el precio es cero', async () => {
      await expect(
        service.create({ name: 'Producto', price: 0 })
      ).rejects.toThrow(Error);
    });

    it('lanza Error si el nombre está vacío', async () => {
      await expect(
        service.create({ name: '', price: 100 })
      ).rejects.toThrow(Error);
    });

    it('lanza Error si el nombre no existe', async () => {
      await expect(
        service.create({ price: 100 })
      ).rejects.toThrow(Error);
    });

    it('save() no se llama si los datos son inválidos', async () => {
      try {
        await service.create({ name: '', price: -5 });
      } catch (e) {
        // ignoramos el error
      }
      expect(mockRepo.save).not.toHaveBeenCalled();
    });
  });

});