import type { DefineComponent } from 'vue'
import { defineComponent, h, nextTick, onMounted, ref, watch } from 'vue'
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
    const textExpansionRef = ref()
    const updateCssProperty = () => {
      const el = textExpansionRef.value
      el.firstChild.removeAttribute('class')
      void el.firstChild.offsetWidth
      el.style.setProperty('--letter-spacing', `${-props.fontSize / 2}px`)
      el.style.setProperty('--font-size', `${props.fontSize}px`)
      el.style.setProperty('--delay', `${props.delay / 1000}s`)
      el.style.setProperty('--duration', `${props.duration / 1000}s`)
      el.style.setProperty('--contrast', String(props.fontSize / 20))
      el.style.setProperty('--background-color', props.backgroundColor)
      el.style.setProperty('--color', props.color)
      el.firstChild.setAttribute('class', 'text-expansion-animation-word')
    }
    onMounted(updateCssProperty)
    watch(() => props, updateCssProperty, { deep: true })

    return () =>
      h(
        'div',
        {
          class: 'text-expansion-animation-wrapper',
          ref: textExpansionRef,
        },
        [
          h(
            'span',
            {
              class: 'text-expansion-animation-word',
            },
            props.text,
          ),
        ],
      )
  },
}) as DefineComponent<Props>
