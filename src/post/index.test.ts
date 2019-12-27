import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#id', () => {
  test('Compatibility', async () => {
    const post = await api.id(297045);

    expect(post).toBeDefined();
    expect(post).toHaveProperty('id', 297045);
  }, 20000000);
});
