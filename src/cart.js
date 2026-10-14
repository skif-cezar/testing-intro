function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0 || product.stock < quantity) {
    throw new RangeError('Количество товара должно быть больше нуля и меньше количества на складе');
  }

  product.stock -= quantity;

  const existingItem = cart.find((item) => item.id === product.id);
  
  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.stock = product.stock;
  } else {
    cart.push({
      ...product,
      quantity: quantity
    });
  }

  return cart;
}

function changeQuantity(cart, id, quantity) {
  const existingItem = cart.find((item) => item.id === id);

  if (!existingItem) {
    return cart;
  }

  if (quantity <= 0 || existingItem.stock < quantity) {
    throw new RangeError('Количество товара должно быть больше нуля и достаточно количества на складе');
  }

  existingItem.quantity = quantity;
  existingItem.stock -= quantity

  return cart;
}

function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
