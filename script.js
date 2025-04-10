let products = [];

function loadProducts() {
  const stored = localStorage.getItem('products');
  if (stored) {
    products = JSON.parse(stored);
  } else {
    products = [
      { name: 'Aalu', price: 20 },
      { name: 'Pyaj', price: 35 },
      { name: 'Chini', price: 55 },
      { name: 'Chana', price: 85 },
      { name: 'Matar', price: 50 },
    ];
    localStorage.setItem('products', JSON.stringify(products));
  }
  populateDropdowns();
}

function populateDropdowns() {
  const selectProduct = document.getElementById('selectedProduct');
  const productSelect = document.getElementById('productSelect');
  selectProduct.innerHTML = '';
  productSelect.innerHTML = '';
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.name;
    option.text = `${product.name} - ₹${product.price}/kg`;
    selectProduct.appendChild(option);
    productSelect.appendChild(option.cloneNode(true));
  });
}

function calculatePrice() {
  const productName = document.getElementById('selectedProduct').value;
  const grams = parseFloat(document.getElementById('quantity').value);
  const product = products.find(p => p.name === productName);
  if (product && grams) {
    const price = (product.price * grams) / 1000;
    document.getElementById('priceResult').innerText = `₹${price.toFixed(2)}`;
  }
}

function calculateQuantity() {
  const productName = document.getElementById('selectedProduct').value;
  const paid = parseFloat(document.getElementById('paidAmount').value);
  const product = products.find(p => p.name === productName);
  if (product && paid) {
    const grams = (paid / product.price) * 1000;
    document.getElementById('quantityResult').innerText = `${grams.toFixed(0)} grams`;
  }
}

function addProduct() {
  const name = document.getElementById('newProduct').value.trim();
  const price = parseFloat(document.getElementById('newPrice').value);
  if (name && price) {
    const exists = products.find(p => p.name === name);
    if (!exists) {
      products.push({ name, price });
      saveProducts();
      populateDropdowns();
      alert('Product added!');
    } else {
      alert('Product already exists!');
    }
  }
}

function updateProduct() {
  const name = document.getElementById('productSelect').value;
  const newPrice = parseFloat(document.getElementById('newPrice').value);
  const product = products.find(p => p.name === name);
  if (product && newPrice) {
    product.price = newPrice;
    saveProducts();
    populateDropdowns();
    alert('Price updated!');
  }
}

function removeProduct() {
  const name = document.getElementById('productSelect').value;
  products = products.filter(p => p.name !== name);
  saveProducts();
  populateDropdowns();
  alert('Product removed!');
}

function refreshCalculator() {
  document.getElementById('quantity').value = '';
  document.getElementById('paidAmount').value = '';
  document.getElementById('priceResult').innerText = '';
  document.getElementById('quantityResult').innerText = '';
}

function saveProducts() {
  localStorage.setItem('products', JSON.stringify(products));
}

window.onload = loadProducts;
