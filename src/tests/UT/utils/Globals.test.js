import { getArbitRestUrl, doSetForwardslash, doSetFullUrl, isInvalid } from '../../../utils/Globals';
const exMsg = 'Your input array should contain at least one element';
const BASE_URL = 'https://jsonplaceholder.typicode.com';

describe('getArbitRestUrl function tests', () => {
  it('should be defined', () => {
    expect(getArbitRestUrl).toBeDefined();
  });
  it('should return the api base url', () => {
    expect(getArbitRestUrl()).toBe(BASE_URL);
  });
});

describe('isInvalid function tests', () => {
  it('should be defined', () => {
    expect(isInvalid).toBeDefined();
  });

  const falsy = [0, null, undefined, ''];

  it('should return true if one the falsy values is passed', () => {
    falsy.forEach((el) => expect(isInvalid(el)).toBeTruthy());
  });

  it('should return false a truthy value is passed', () => {
    expect(isInvalid(1)).toBeFalsy();
  });
});

describe('doSetForwardslash function tests', () => {
  it('should be defined', () => {
    expect(doSetForwardslash).toBeDefined();
  });

  it('should throw an exception if no arg is passed', () => {
    expect(() => {
      doSetForwardslash();
    }).toThrow(exMsg);
  });

  it('should throw an exception if only one arg is passed', () => {
    expect(() => {
      doSetForwardslash(false);
    }).toThrow(exMsg);

    expect(() => {
      doSetForwardslash(true);
    }).toThrow(exMsg);
  });

  it('should return the same arg if first arg is false and the second arg is single', () => {
    expect(doSetForwardslash(false, 'post')).toBe('post');
  });

  it('should place a / between items of the second arg if first arg is false', () => {
    expect(doSetForwardslash(false, 'post', 'add-post')).toBe('post/add-post');
  });

  it('should place a / in front if first arg is true and the second arg is atomic', () => {
    expect(doSetForwardslash(true, 'post')).toBe('/post');
  });

  it('should has a leading / and / between items of the second arg if first arg is true', () => {
    expect(doSetForwardslash(true, 'post', 'add-post')).toBe('/post/add-post');
  });
});

describe('doSetFullUrl function tests', () => {
  it('should be defined', () => {
    expect(doSetFullUrl).toBeDefined();
  });

  it('should throw an exception if no arg is passed', () => {
    expect(() => {
      doSetFullUrl();
    }).toThrow(exMsg);
  });

  it('should throw an exception if only one arg is passed', () => {
    expect(() => {
      doSetFullUrl(false);
    }).toThrow(exMsg);

    expect(() => {
      doSetFullUrl(true);
    }).toThrow(exMsg);
  });

  it('should return the full url by appending / and endpoint if first arg is false and the second arg is single', () => {
    expect(doSetFullUrl(false, 'post')).toBe(`${BASE_URL}/post`);
  });

  it('should place a / between items of the second arg if first arg is false then appending them to the base url', () => {
    expect(doSetFullUrl(false, 'post', 'add-post')).toBe(`${BASE_URL}/post/add-post`);
  });

  it('should place a / in front if first arg is true and the second arg is atomic, then appending them to the base url', () => {
    expect(doSetFullUrl(true, 'myposts')).toBe(`${BASE_URL}/myposts`);
  });

  it('should remove one / if the enddpoints start with //, then appending to base ulr if first arg is true', () => {
    expect(doSetFullUrl(true, '/post', 'add-post')).toBe(`${BASE_URL}/post/add-post`);
  });
});
