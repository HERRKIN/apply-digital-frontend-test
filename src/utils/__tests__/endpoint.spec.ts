import { delay, availableFilters } from '../endpoint';

describe('Games Data', () => {
   test('delay',  async() => {
     const waited =  delay(1000);
     expect(waited).toBeDefined();
   })
   test('availableFilters', () => {
    const filters = availableFilters;
    console.log(filters);
    expect(filters).toBeDefined();
   })
});
