const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Путь к файлу products.json
const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');

// Получить все продукты
app.get('/api/products', async (req, res) => {
  try {
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('Error reading products:', error);
    res.status(500).json({ error: 'Failed to read products' });
  }
});

// Добавить новый продукт
app.post('/api/products', async (req, res) => {
  try {
    const { productData, files } = req.body;
    
    // Читаем текущие продукты
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);
    
    // Создаем новый продукт
    const newProduct = {
      id: Date.now(),
      name: productData.name,
      description: productData.description,
      price: productData.negotiablePrice ? null : productData.price,
      currency: productData.negotiablePrice ? null : productData.currency,
      negotiablePrice: productData.negotiablePrice,
      oldPrice: productData.negotiablePrice ? null : productData.price,
      hotPrice: productData.negotiablePrice ? null : productData.price,
      category: productData.category,
      subcategory: productData.subcategory || null,
      tags: [productData.category, productData.subcategory].filter(Boolean),
      image: files.length > 0 ? files[0] : "/images/placeholder.svg",
      images: files.length > 0 ? files : [],
      avatar: "/images/ava-default.png",
      rating: 0,
      reviews: [],
      brand: "HOLYTRAFF",
      type: productData.category,
      subtype: productData.subcategory || "single",
      platforms: ["FB", "ASO", "TikTok", "UAC"],
      promotionalText: "",
      overlayText: "",
      chatCount: "0",
      isFavorite: false,
      isHot: false,
      autoRenewal: productData.autoRenewal,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Добавляем новый продукт
    products.push(newProduct);
    
    // Записываем обновленный файл
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    
    res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// Обновить продукт
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);
    
    const productIndex = products.findIndex(p => p.id == id);
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    products[productIndex] = { ...products[productIndex], ...updates, updatedAt: new Date().toISOString() };
    
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));
    
    res.json({ success: true, product: products[productIndex] });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Удалить продукт
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const data = await fs.readFile(productsFilePath, 'utf8');
    const products = JSON.parse(data);
    
    const filteredProducts = products.filter(p => p.id != id);
    
    if (filteredProducts.length === products.length) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await fs.writeFile(productsFilePath, JSON.stringify(filteredProducts, null, 2));
    
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
