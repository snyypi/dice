<template lang="html">
  <transition name="fade">
    <div v-if="info.previous" class="col m4 s12 offset-m2">
      <div class="row">
        <div class="card accent-4" :class="status.clr">
          <div class="card-content white-text">
            <span class="card-title">{{ status.msg }}<Animated :value="status.charge"/></span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card accent-4 left-align hashes">
          <div class="card-content">
            <span class="card-title">Previous val:</span>
            <p>{{ info.previous.val }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="card accent-4 left-align hashes">
          <div class="card-content">
            <span class="card-title">Previous key:</span>
            <p>{{ info.previous.key }}</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Animated from './helpers/Animated.vue';

export default {
  name: 'Info',
  components: { Animated },
  props: {
    info: Object,
  },
  computed: {
    status() {
      if (this.info.status) {
        return {
          charge: this.info.amount,
          clr: 'green',
          msg: 'You won! +$',
        };
      }

      return {
        charge: this.info.amount * (-1),
        clr: 'red',
        msg: 'You lose! -$',
      };
    },
  },
};
</script>

<style scoped>
  span.card-title {
    margin-bottom: 0px !important;
  }
  .hashes p {
    word-wrap: break-word;
    font-size: 12px;
  }
  .hashes span.card-title {
    font-size: 20px;
  }
</style>
