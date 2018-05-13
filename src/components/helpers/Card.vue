<template lang="html">
  <transition name="fade">
    <div v-if="enable" class="col s6">
      <div class="card darken-4 left-align">
        <div class="collection">
          <p class="collection-item">Values: <span class="badge">{{ info.msg }}</span></p>
          <p class="collection-item">Chance: <span class="badge">{{ info.chance }}%</span></p>
          <p class="collection-item">Payout: <span class="badge">x{{ info.multiplier }}</span></p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Card',
  props: {
    info: Object,
    enable: Boolean,
  },
};
</script>

<style lang="css">
</style>
