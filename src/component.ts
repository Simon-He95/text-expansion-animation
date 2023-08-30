import type { DefineComponent } from 'vue'
import { defineComponent, h, onMounted, ref, watch } from 'vue'
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
    contrast: {
      type: Number,
      default: 30,
    },
  },
  setup(props) {
    const textExpansionRef = ref()
    let isMounted = false
    const updateCssProperty = async () => {
      const el = textExpansionRef.value
      el.style.setProperty('--letter-spacing', `${-props.fontSize / 2}px`)
      el.style.setProperty('--font-size', `${props.fontSize}px`)
      el.style.setProperty('--delay', `${props.delay / 1000}s`)
      el.style.setProperty('--duration', `${props.duration / 1000}s`)
      el.style.setProperty('--contrast', props.contrast)
      el.style.setProperty('--background-color', props.backgroundColor)
      el.style.setProperty('--color', props.color)
      if (isMounted) {
        el.firstChild.removeAttribute('class')
        void el.firstChild.offsetWidth
        el.firstChild.setAttribute('class', 'text-expansion-animation-word')
      } else {
        isMounted = true
      }
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
