import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.hrefToID('https://konachan.org/post/show/297045/')).toBe(null);

    expect(api.hrefToID('https://konachan.net/post/show/297045/')).toBe(297045);
    expect(api.hrefToID('/post/show/297045/')).toBe(297045);
  }, 20000000);
});

describe('#isValidHref', () => {
  test('Working', async () => {
    expect(api.isValidHref('https://konachan.org/post/show/297045/')).toBe(false);

    expect(api.isValidHref('https://konachan.net/post/show/297045/')).toBe(true);
    expect(api.isValidHref('/post/show/297045/')).toBe(true);
  }, 20000000);
});
