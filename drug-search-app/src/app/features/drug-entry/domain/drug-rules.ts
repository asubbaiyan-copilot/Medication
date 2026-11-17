export function sell(quantity: number, quantitySold: number): number | null {
  return quantity < quantitySold ? null : quantity - quantitySold;
}

export function purchase(quantity: number, quantityPurchased: number): number {
  return quantity + quantityPurchased;
}

export function isInStock(quantity: number): boolean {
  return quantity > 0;
}

export function increasePrice(price: number): number {
  return price + 1;
}

export function totalPrice(price: number, quantity: number): number {
  return price * quantity;
}
