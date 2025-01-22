<script setup lang="ts">
import { useRaf } from 'lazy-js-utils'
import { isDark } from '../composables/index'
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const show5 = ref(false)
const stop = useRaf(() => {
  if (!show1.value) {
    return (show1.value = true)
  }
  else if (!show2.value) {
    return (show2.value = true)
  }
  else if (!show3.value) {
    return (show3.value = true)
  }
  else if (!show4.value) {
    return (show4.value = true)
  }
  else if (!show5.value) {
    show5.value = true
    stop()
  }
}, 1000)
const backgroundColor = ref(!isDark.value ? '#fff' : '#000')
watch(isDark, (v) => {
  if (!v)
    backgroundColor.value = '#fff'
  else backgroundColor.value = '#000'
})
</script>

<template>
  <TextExpansionAnimation
    :font-size="100"
    :color="backgroundColor === '#000' ? '#fff' : '#000'"
    :background-color="backgroundColor"
  />
  <TextExpansionAnimation
    :color="backgroundColor === '#000' ? '#d0fbe3' : '#00754e'"
    :background-color="backgroundColor"
    :font-size="100"
    text="こんにちは、世界"
  />
  <TextExpansionAnimation
    :color="backgroundColor === '#000' ? '#cee0ff' : '#0623ac'"
    :font-size="90"
    :background-color="backgroundColor"
    text="Olá, mundo"
  />
  <TextExpansionAnimation
    :color="backgroundColor === '#000' ? '#e7d2ff' : '#52148f'"
    :font-size="80"
    :background-color="backgroundColor"
    text="안녕, 세상"
  />
  <TextExpansionAnimation
    :color="backgroundColor === '#000' ? '#ffc3f4' : '#750062'"
    :font-size="70"
    :background-color="backgroundColor"
    text="你好，世界"
  />
  <TextExpansionAnimation
    :color="backgroundColor === '#000' ? '#ffc1c1' : '#900c0c'"
    :font-size="60"
    :background-color="backgroundColor"
    text="مرحبًا بالعالم"
  />
</template>
