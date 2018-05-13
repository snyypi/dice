<template>
  <div id="app" class="container">
    <div class="row">
      <div class="col m8 s12 left-align">
        <img class="responsive-img" src="./assets/logo.svg">
        <h1>DICE</h1>
      </div>
      <Balance :balance="info.balance" @change="free"/>
    </div>
    <div class="row">
      <Board :current="current" :info="info" @change="dice"/>
      <Info :info="info"/>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js';
import Cookie from 'js-cookie';

import Balance from './components/Balance.vue';
import Board from './components/Board.vue';
import Info from './components/Info.vue';

const getCurrent = () => {
  let key = Math.random().toString(36).substr(2, 8);
  let val = Math.floor(Math.random() * 100).toString();

  key = CryptoJS.SHA3(key, { outputLength: 256 }).toString(CryptoJS.enc.Base64);
  val = CryptoJS.AES.encrypt(val, key).toString();

  return { key, val };
};

export default {
  name: 'app',
  components: { Balance, Board, Info },
  data() {
    const current = getCurrent();

    return { info: {}, current };
  },
  methods: {
    dice(value) {
      const { status, amount } = value;
      const round = x => Number(x.toFixed(2));

      const balance = round(this.info.balance + amount);
      const previous = this.current;

      this.info = {
        amount,
        balance,
        previous,
        status,
      };
      this.current = getCurrent();

      Cookie.set('balance', balance);
      Cookie.set('previous', previous);
      Cookie.set('status', status);
      Cookie.set('amount', amount);
    },
    free() {
      this.info.balance = 100;
      Cookie.set('balance', '100');
    },
  },
  created() {
    const info = Cookie.getJSON();
    const isFirstGame = (!info.balance && info.balance !== 0);

    this.info = info;
    if (isFirstGame) {
      Cookie.set('balance', '100');
      this.info.balance = 100;
    }
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
#app h1 {
  color: #1f1e25;
  font-weight: 300;
  margin: 0px;
  padding: 0px;
}
#app .row {
  margin-bottom: 0px;
}
#app .responsive-img {
  height: 76px;
  max-width: 76px;
  width: 100%;

  float: left;
  margin-right: 10px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
