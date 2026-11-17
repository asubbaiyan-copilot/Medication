import { increasePrice, isInStock, purchase, sell, totalPrice } from './drug-rules';

describe('drug rules', () => {
  it('rejects selling more than available and allows selling all stock', () => {
    expect(sell(5, 6)).toBeNull();
    expect(sell(5, 5)).toBe(0);
  });

  it('calculates purchasing, stock, price increases, and totals', () => {
    expect(purchase(2, 3)).toBe(5);
    expect(isInStock(0)).toBe(false);
    expect(isInStock(1)).toBe(true);
    expect(increasePrice(4)).toBe(5);
    expect(totalPrice(5, 3)).toBe(15);
  });
});
