import type { DefineComponent } from 'vue'
import { defineComponent, h, onMounted } from 'vue'
import type { Props } from './types'
export const TextExpansionAnimation = defineComponent({
  name: 'TextExpansionAnimation',
  props: {
    text: {
      type: String,
      default: 'hello world',
    },
    backgroundColor: {
      type: String,
      default: '#fff',
    },
    color: {
      type: String,
      default: '#000',
    },
    fontSize: {
      type: Number,
      default: 50,
    },
    duration: {
      type: Number,
      default: 2000,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    onMounted(() => {
      const el = document.querySelector('.text-expansion-animation-wrapper')! as HTMLElement
      el.style.setProperty('--letter-spacing', `${-props.fontSize / 2}px`)
      el.style.setProperty('--font-size', `${props.fontSize}px`)
      el.style.setProperty('--delay', `${props.delay}s`)
      el.style.setProperty('--duration', `${props.duration / 1000}s`)
      el.style.setProperty('--contrast', String(props.fontSize / 20))
    })
    return () => h('div', {
      class: 'text-expansion-animation-wrapper',
    },
    [
      h('span', {
        class: 'text-expansion-animation-word',
      }, props.text),
    ],
    )
  },
}) as DefineComponent<Props>
