import Tracker from '../src/tracker';

const tracker = new Tracker();

function delay(time: number): Promise<void> {
  // eslint-disable-next-line
  return new Promise((resolve): NodeJS.Timeout => setTimeout(resolve, time));
}

async function asyncFunc1(): Promise<void> {
  await delay(1000);
  tracker.set('READY');
}

async function asyncFunc2(): Promise<boolean> {
  await tracker.wait('READY');
  return tracker.get('READY');
}

async function asyncFunc3(): Promise<void> {
  await delay(1000);
  tracker.unset('NOT_READY');
}

async function asyncFunc4(): Promise<boolean> {
  await tracker.wait('NOT_READY');
  return true;
}

describe('Tracker Test', (): void => {
  test('tracker resolve test', async (): Promise<void> => {
    asyncFunc1();
    const result = await asyncFunc2();
    expect(result).toEqual(true);
  });
  test('tracker reject test', async (): Promise<void> => {
    try {
      asyncFunc3();
      await asyncFunc4();
    } catch (e) {
      expect(e).toEqual(new Error());
    }
  });
});
