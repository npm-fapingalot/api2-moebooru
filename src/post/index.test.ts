import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#getManga', () => {
  test('Compatibility', async () => {
    const manga = await api.id(297045);

    expect(manga).toBeDefined();
    expect(manga).toHaveProperty('id', 297045);
  }, 20000000);
});
