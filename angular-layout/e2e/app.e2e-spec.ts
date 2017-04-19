import { AngularLayoutPage } from './app.po';

describe('angular-layout App', () => {
  let page: AngularLayoutPage;

  beforeEach(() => {
    page = new AngularLayoutPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
