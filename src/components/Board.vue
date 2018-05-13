<template lang="html">
  <div class="col m6 s12">
    <form>
      <div class="row">
        <div class="input-field col s12">
          <input
            type="number"
            name="amount"
            autocomplete="off"
            min="0"
            :max="info.balance"
            v-model.number="amount"
          >
          <label for="first_name">Amount</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input
            type="number"
            name="number"
            autocomplete="off"
            min="1"
            max="99"
            v-model.number="number"
          >
          <label for="first_name">Number</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <p></p>
          <input type="text" name="hash" :placeholder="current.val" disabled>
          <label for="first_name">Hash</label>
        </div>
      </div>
      <transition name="fade">
        <div class="row" v-if="isEnabled">
          <div class="input-field col s12">
            <button
              class="btn waves-effect waves-light btn-large deep-purple darken-4 left"
              type="button"
              name="high"
              @click="submit('high')"
            >Bet Hi<i class="material-icons left">thumb_up</i></button>
            <button
              class="btn waves-effect waves-light btn-large deep-purple darken-4 right"
              type="button"
              name="low"
              @click="submit('low')"
          >Bet Lo<i class="material-icons left">thumb_down</i></button>
          </div>
        </div>
      </transition>
    </form>
    <div class="row">
      <Card :info="bid.high" :enable="isEnabled"/>
      <Card :info="bid.low"  :enable="isEnabled"/>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import Card from './helpers/Card.vue';

const round = x => Number(x.toFixed(2));

export default {
  name: 'Board',
  components: { Card },
  props: {
    info: Object,
    current: Object,
  },
  data() {
    const amount = '';
    const number = '';

    return { amount, number };
  },
  watch: {
    amount(next, prev) {
      const { balance } = this.info;
      if (next > balance) {
        this.amount = prev;
      }
      if (prev > balance) {
        this.amount = balance;
      }
    },
    number(next, prev) {
      if (next >= 100) {
        this.number = prev;
      }
    },
  },
  computed: {
    bid() {
      const percent = this.number;
      const multiplier = x => round(100 / x);

      const lunicode = unescape('%u2264');
      const hunicode = unescape('%u2265');

      const high = {
        msg: `${hunicode} ${percent}`,
        chance: 100 - percent,
        multiplier: multiplier(100 - percent),
      };
      const low = {
        msg: `${lunicode} ${percent}`,
        chance: percent,
        multiplier: multiplier(percent),
      };

      return { high, low };
    },
    isEnabled() {
      const { amount, number, info: { balance } } = this;
      if (amount > balance) {
        // eslint-disable-next-line
        this.amount = balance;
      }

      if (balance <= 0 || amount < 1 || number < 1) {
        if (balance > 0 && amount < 1 && amount > 0) {
          return true;
        }
        return false;
      }
      return true;
    },
  },
  methods: {
    submit(type) {
      const {
        amount,
        current,
        number,
      } = this;

      const decrypt = CryptoJS.AES.decrypt(current.val, current.key).toString(CryptoJS.enc.Utf8);
      const val = Number(decrypt);

      let result = {
        amount: -amount,
        status: false,
      };

      switch (type) {
        case 'high':
          if (number <= val) {
            result = {
              amount: round(amount * this.bid.high.multiplier),
              status: true,
            };
          }
          break;
        case 'low':
          if (number >= val) {
            result = {
              amount: round(amount * this.bid.low.multiplier),
              status: true,
            };
          }
          break;
        default:
          result = {
            amount: 0,
            status: false,
          };
      }

      this.$emit('change', result);
    },
  },
};
</script>

<style scoped>
  .input-field input[type=number]:focus + label {
    color: #311b92;
  }
  .input-field input[type=number]:focus {
    border-bottom: 1px solid #311b92;
    box-shadow: 0 1px 0 0 #311b92;
  }
  input[type='number'] {
    -moz-appearance:textfield;
  }
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
