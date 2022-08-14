import HM from '../../../utils/HttpVerbs';

describe('HTTM_METHODS TESTS', () => {
  it('should contain 4 main http verbs', () => {
    expect(HM).toEqual({
      GET: 'get',
      POST: 'post',
      PUT: 'put',
      DELETE: 'delete',
    });
  });
});
