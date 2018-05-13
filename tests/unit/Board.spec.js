import CryptoJS from 'crypto-js';

import { shallow } from '@vue/test-utils';
import Board from '@/components/Board.vue';

const getCurrent = () => {
  let key = Math.random().toString(36).substr(2, 8);
  let val = Math.floor(Math.random() * 100).toString();

  key = CryptoJS.SHA3(key, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
  val = CryptoJS.AES.encrypt(val, key).toString();

  return { key, val };
};
const info = {
  balance: 100,
};

describe('Board.vue component', () => {
  describe('Check computed bid/multiplier', () => {
    const current = getCurrent();
    const wrapper = shallow(Board, {
      propsData: { current, info },
    });

    it('Bet 50 Hi Chance of Winning', () => {
      wrapper.setData({
        number: 50,
      });

      const { high: { chance, multiplier } } = wrapper.vm.bid;

      expect(chance).toEqual(50);
      expect(multiplier).toEqual(2);
    });

    it('Bet 1 Hi/Lo Chance of Winning', () => {
      wrapper.setData({
        number: 1,
      });

      const { high, low } = wrapper.vm.bid;

      expect(high.chance).toEqual(99);
      expect(high.multiplier).toEqual(1.01);

      expect(low.chance).toEqual(1);
      expect(low.multiplier).toEqual(100);
    });

    it('Bet 10 Hi/Lo Chance of Winning', () => {
      wrapper.setData({
        number: 10,
      });

      const { high, low } = wrapper.vm.bid;

      expect(high.chance).toEqual(90);
      expect(high.multiplier).toEqual(1.11);

      expect(low.chance).toEqual(10);
      expect(low.multiplier).toEqual(10);
    });
  });
});
