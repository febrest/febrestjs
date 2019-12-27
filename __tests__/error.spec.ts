import febrest from 'main';

test('promise reject cache', () => {
  const sq: number[] = [];
  const fn = jest.fn(x => {
    return new Promise((resolve, reject) => {
      reject('eee');
    }).then(data => {
      return data;
    });
  });
  febrest.onError((error: any) => {
    console.log('error');
    return true;
  });
  return febrest.dispatch(fn, 'test').then(
    v => {},
    e => {
      console.log(e);
    }
  );
});
