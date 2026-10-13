const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    const result = sortProductsByPrice(products, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    const result = sortProductsByPrice(products);
    expect(result.map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const targetIds = [1, 3, 4];
    const filteredProducts = products.filter(product => targetIds.includes(product.id));

    const result = sortProductsByPrice(filteredProducts, 'asc');
    expect(result.map((product) => product.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    const result = sortProductsByPrice(products, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const targetIds = [3, 1, 4];
    const filteredProducts = targetIds
      .map(id => products.find(product => product.id === id))
      .filter(Boolean);

    const result = sortProductsByPrice(filteredProducts, 'desc');
    expect(result.map((product) => product.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const targetIds = [5, 2, 6];
    const filteredProducts = targetIds
      .map(id => products.find(product => product.id === id))
      .filter(Boolean);

    const result = sortProductsByPrice(filteredProducts, 'desc');
    expect(result.map((product) => product.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const targetIds = [1, 3, 4];
    const filteredProducts = products.filter((product) => targetIds.includes(product.id));

     const originalFilteredProducts = filteredProducts.map((product) => product.id);

     sortProductsByPrice(filteredProducts, 'asc');

    expect(filteredProducts.map((product) => product.id)).toEqual(originalFilteredProducts);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const targetIds = [1, 3, 4];
    const filteredProducts = products.filter((product) => targetIds.includes(product.id));

     const originalFilteredProducts = filteredProducts.map((product) => product.id);

     sortProductsByPrice(filteredProducts, 'desc');

    expect(filteredProducts.map((product) => product.id)).toEqual(originalFilteredProducts);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
     const originalProducts = products.map((product) => product.id);

     sortProductsByPrice(products);

    expect(products.map((product) => product.id)).toEqual(originalProducts);
  });
});
