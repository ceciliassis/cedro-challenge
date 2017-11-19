import { RestaurantClientPage } from './app.po';

describe('restaurant-client App', () => {
  let page: RestaurantClientPage;

  beforeEach(() => {
    page = new RestaurantClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
