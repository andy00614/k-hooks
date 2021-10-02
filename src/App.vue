<template>
  <div>
    <h1>step</h1>
    <button @click="next">next</button>
    <button @click="back">back</button>
    <strong>{{ currentStep }}</strong>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useStep from '../packages/core/useStep/index'

export default defineComponent({
  name: 'App',
  setup() {
    const { currentStep, next, back } = useStep(['step1','step2','step3'])
    return {currentStep, next, back}
  }
});
</script>

<style>
</style>
