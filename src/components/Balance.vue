<template lang="html">
  <div class="col m4 s12 left">
    <div class="row">
      <div class="card deep-purple darken-4 left-align">
        <div class="card-content white-text">
          <span class="card-title">Your balanse $<Animated :value="balance"/></span>

          <p>Free credits are available only with zero balance.</p>
        </div>
        <transition name="fade">
          <div v-if="balance<=0" class="card-action">
            <a href="#" @click="free">Get Free Credits</a>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Animated from './helpers/Animated.vue';

export default {
  name: 'Balance',
  components: { Animated },
  props: {
    balance: Number,
  },
  methods: {
    free() {
      this.$emit('change');
    },
  },
};
</script>

<style scoped>
</style>
