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

function removeFromCart(cart, id) { 
  cart = cart.filter((item) => item.id !== id);

  return cart;
}

function calculateCartSubtotal(cart) {
  const len = cart.length;

  if(!len) {
    return 0;
  }

  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

}

function calculateOrderTotal(cart, promoCode) {
  const DELIVERY_PRICE = 30000;
  const FREE_DELIVERY_THRESHOLD = 50000;
  const DISCOUNT_PERCENT = 0.1;
  const PRICE_THRESHOLD = 20000;
  let subtotalWithDiscount = 0;
  let discount = 0;

  const subtotal = calculateCartSubtotal(cart);

  // Применяем скидку если промокод 'SAVE10' и сумма товара больше порога
  if (promoCode === 'SAVE10' && subtotal > PRICE_THRESHOLD) {
    subtotalWithDiscount = subtotal - subtotal * DISCOUNT_PERCENT;
    discount = subtotal * DISCOUNT_PERCENT;
  } else {
    subtotalWithDiscount = subtotal;
  }

  const delivery = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_PRICE;

  const total = subtotalWithDiscount + delivery;

  return {
    subtotal,
    discount,
    delivery,
    total
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
