import type { DefineComponent } from 'vue'
import { defineComponent, h, onMounted, ref, useAttrs, watch } from 'vue'
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
  setup(props: Props) {
    const textExpansionRef = ref()
    let isMounted = false
    const attrs = useAttrs()
    const updateCssProperty = async () => {
      const el = textExpansionRef.value
      if (isMounted) {
        el.firstChild.removeAttribute('class')
        void el.firstChild.offsetWidth
        el.firstChild.setAttribute('class', 'text-expansion-animation-word')
      }
      else {
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
          style: {
            '--letter-spacing': `${-props.fontSize! / 2}px`,
            '--font-size': `${props.fontSize}px`,
            '--delay': `${props.delay! / 1000}s`,
            '--duration': `${props.duration! / 1000}s`,
            '--contrast': props.contrast,
            '--background-color': props.backgroundColor,
            '--color': props.color,
            ...(attrs.style || {}),
          },
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
