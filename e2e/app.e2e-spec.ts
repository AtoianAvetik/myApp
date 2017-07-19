import { MyPassAppPage } from './app.po';

describe('my-pass-app App', () => {
  let page: MyPassAppPage;

  beforeEach(() => {
    page = new MyPassAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
