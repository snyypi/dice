import { shallow } from '@vue/test-utils';
import Info from '@/components/Info.vue';

const previous = {
  key: 'This is the key',
  val: 'This is the val',
};

describe('Info.vue component', () => {
  it('renders info.previous when this object passed', () => {
    const info = { previous };

    const wrapper = shallow(Info, {
      propsData: { info },
    });

    const { key, val } = wrapper.props().info.previous;

    expect(key).toMatch(previous.key);
    expect(val).toMatch(previous.val);
  });
  it('renders status when user win', () => {
    const info = {
      status: true,
      amount: 10,
      previous,
    };

    const wrapper = shallow(Info, {
      propsData: { info },
    });

    const { status } = wrapper.vm;

    expect(status.charge).toEqual(10);
    expect(status.msg).toMatch('You won! +$');

    expect(status.clr).toMatch('green');
  });
  it('renders status when user lose', () => {
    const info = {
      status: false,
      amount: -10,
      previous,
    };

    const wrapper = shallow(Info, {
      propsData: { info },
    });

    const { status } = wrapper.vm;

    expect(status.charge).toEqual(10);
    expect(status.msg).toMatch('You lose! -$');

    expect(status.clr).toMatch('red');
  });
});
