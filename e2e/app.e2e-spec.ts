import { Custom2048Page } from './app.po';

describe('custom2048 App', function() {
  let page: Custom2048Page;

  beforeEach(() => {
    page = new Custom2048Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
