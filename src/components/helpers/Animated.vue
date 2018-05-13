<template lang="html">
  <span>{{ tweeningValue }}</span>
</template>

<script>
export default {
  name: 'Animated',
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return { tweeningValue: 0 };
  },
  watch: {
    value(newValue, oldValue) {
      this.tween(oldValue, newValue);
    },
  },
  mounted() {
    this.tween(0, this.value);
  },
  methods: {
    /* eslint-disable no-undef */
    tween(startValue, endValue) {
      const vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        // eslint-disable-next-line
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(2);
        })
        .start();

      animate();
    },
  },
};
</script>

<style lang="css">
</style>
