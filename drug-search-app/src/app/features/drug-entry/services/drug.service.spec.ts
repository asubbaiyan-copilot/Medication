import { DrugService } from './drug.service';

describe('DrugService', () => {
  const service = new DrugService();

  it('calculates sales and rejects sales above available quantity', () => {
    expect(service.sell(5, 2)).toBe(3);
    expect(service.sell(5, 5)).toBe(0);
    expect(service.sell(5, 6)).toBeNull();
  });

  it('calculates purchases, stock, price increases, and totals', () => {
    expect(service.purchase(2, 3)).toBe(5);
    expect(service.isInStock(0)).toBe(false);
    expect(service.isInStock(1)).toBe(true);
    expect(service.increasePrice(4)).toBe(5);
    expect(service.totalPrice(5, 3)).toBe(15);
  });

  it('manages the drug list and preserves quantity when prices change', () => {
    const listService = new DrugService();
    listService.updateQuantity(0, 3);
    listService.updatePrice(0, 20);
    listService.raisePrices();
    expect(listService.drugs()[0]).toEqual({ name: 'Aspirin', dose: 500, price: 21, quantity: 3 });
    listService.addDrug();
    expect(listService.drugs()).toHaveLength(4);
    listService.updateDrug(0, { name: 'Updated Drug', dose: 150, price: 7, quantity: 0 });
    expect(listService.drugs()[0].name).toBe('Updated Drug');
    listService.removeDrug();
    expect(listService.drugs()).toHaveLength(3);
  });
});
