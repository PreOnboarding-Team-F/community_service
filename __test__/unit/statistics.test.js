import {
  getAccesstime,
  getAge,
  getGender,
  getVisit,
} from '../../services/statistics.js';

describe('getAccesstime()', () => {
  it('getAccesstime 함수 실행확인', async () => {
    const result = await getAccesstime();

    expect(result).not.toEqual({});
  });
});
describe('getAge()', () => {
  it('getAge 함수 실행확인', async () => {
    const result = await getAge();

    expect(result).not.toEqual({});
  });
});
describe('getGender()', () => {
  it('getGender 함수 실행확인', async () => {
    const result = await getGender();

    expect(result).not.toEqual({});
  });
});
describe('getVisit()', () => {
  it('getVisit 함수 실행확인', async () => {
    const value = {
      boardWriterRatio: {
        female: 0,
        male: 0,
      },
      genderCount: {
        female: 0,
        male: 0,
        total: 0,
      },
      genderRatio: {
        female: 0,
        male: 0,
      },
    };
    const result = await getVisit();

    expect(result).not.toEqual(value);
  });
});
