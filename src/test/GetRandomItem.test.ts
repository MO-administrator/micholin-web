import { getRandomItem } from '@/utils/get-random-item';
import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('getRandomItem()', () => {
  let mockArray = new Array();
  for(let i = 0; i < 8; i++){
    let randomItem = Math.random() * 5 + 5
    mockArray.push(randomItem);
  }
  it('Gets random item from the array', () => {
    const mockFunc = vi.fn(() => getRandomItem(mockArray))
    const response = mockFunc();
    const isRandomItem = mockArray.find(item => item == response);
    expect(isRandomItem).toBeTruthy();
  })
})
