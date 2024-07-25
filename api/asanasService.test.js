const { getAsanas, searchAsanas, getAsanaById } = require('./asanasService.js');
const asanas = require('./yoga-asanas.json');

describe('getAsanas', () => {
  it('should return all asanas', () => {
    const req = {};
    const res = {
      json: jest.fn()
    };
    getAsanas(req, res);
    expect(res.json).toHaveBeenCalledWith(asanas);
  });
});

describe('searchAsanas', () => {
  it('should return asanas that match the query', () => {
    const query = 'warrior';
    const expectedAsanas = asanas.filter(asana => asana.name.toLowerCase().includes(query));
    const req = {
      query: { name: query }
    };
    const res = {
      json: jest.fn()
    };
    searchAsanas(req, res);
    expect(res.json).toHaveBeenCalledWith(expectedAsanas);
  });
});

describe('getAsanaById', () => {
  it('should return the asana with the given id', () => {
    const id = '1';
    const expectedAsana = asanas.find(asana => asana.id === id);
    const req = {
      params: { id }
    };
    const res = {
      json: jest.fn()
    };
    getAsanaById(req, res);
    expect(res.json).toHaveBeenCalledWith(expectedAsana);
  });
});