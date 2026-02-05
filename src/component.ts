import type { DefineComponent, PropType } from 'vue'
import { defineComponent, h, onBeforeUnmount, onMounted, ref, useAttrs, watch } from 'vue'
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
    split: {
      type: String as PropType<NonNullable<Props['split']>>,
      default: 'none',
    },
    trigger: {
      type: String as PropType<NonNullable<Props['trigger']>>,
      default: 'mount',
    },
    stagger: {
      type: Number,
      default: 30,
    },
    once: {
      type: Boolean,
      default: true,
    },
    easing: {
      type: String,
      default: 'cubic-bezier(0.2, 0.9, 0.2, 1)',
    },
    effect: {
      type: String as PropType<NonNullable<Props['effect']>>,
      default: 'blur',
    },
    letterSpacingTo: {
      type: Number,
      default: 10,
    },
    blurFrom: {
      type: Number,
      default: undefined,
    },
    blurTo: {
      type: Number,
      default: undefined,
    },
    opacityFrom: {
      type: Number,
      default: undefined,
    },
    opacityTo: {
      type: Number,
      default: undefined,
    },
    yFrom: {
      type: Number,
      default: undefined,
    },
    yTo: {
      type: Number,
      default: undefined,
    },
    glowTo: {
      type: Number,
      default: undefined,
    },
    glowColor: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { expose }) {
    const RUN_CLASS = 'text-expansion-animation--run'
    const WRAPPER_CLASS = 'text-expansion-animation-wrapper'
    const TEXT_CLASS = 'text-expansion-animation-text'
    const WORD_CLASS = 'text-expansion-animation-word'
    const CHAR_CLASS = 'text-expansion-animation-char'

    const wrapperRef = ref<HTMLDivElement | null>(null)
    const runKey = ref(0)
    const isActive = ref(false)
    const attrs = useAttrs()

    let observer: IntersectionObserver | null = null
    let isVisible = props.trigger !== 'visible'

    const play = () => {
      isActive.value = true
      runKey.value += 1
    }

    const stop = () => {
      isActive.value = false
    }

    expose({ play, stop })

    const setupVisibilityTrigger = () => {
      const el = wrapperRef.value
      if (!el)
        return

      if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
        isVisible = true
        play()
        return
      }

      observer?.disconnect()
      observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        const nextVisible = Boolean(entry?.isIntersecting)
        isVisible = nextVisible

        if (nextVisible) {
          play()

          if (props.once)
            observer?.disconnect()
        }
        else if (!props.once) {
          stop()
        }
      })

      observer.observe(el)
    }

    onMounted(() => {
      if (props.trigger === 'visible')
        setupVisibilityTrigger()
      else if (props.trigger === 'mount')
        play()
    })

    onBeforeUnmount(() => {
      observer?.disconnect()
      observer = null
    })

    watch(
      () => [
        props.text,
        props.fontSize,
        props.duration,
        props.delay,
        props.split,
        props.stagger,
        props.effect,
        props.easing,
        props.letterSpacingTo,
        props.blurFrom,
        props.blurTo,
        props.opacityFrom,
        props.opacityTo,
        props.yFrom,
        props.yTo,
        props.glowTo,
        props.glowColor,
      ],
      () => {
        if (props.trigger === 'manual')
          return

        if (props.trigger === 'visible' && !isVisible)
          return

        play()
      },
      { flush: 'post' },
    )

    return () => {
      const fontSize = props.fontSize ?? 50
      const delay = props.delay ?? 0
      const duration = props.duration ?? 2000
      const contrast = props.contrast ?? 30
      const backgroundColor = props.backgroundColor ?? '#fff'
      const color = props.color ?? '#000'
      const text = props.text ?? 'hello world'
      const split = props.split ?? 'none'
      const stagger = props.stagger ?? 30
      const easing = props.easing ?? 'cubic-bezier(0.2, 0.9, 0.2, 1)'

      const effect = props.effect ?? 'blur'
      const effectDefaults = effect === 'glow'
        ? { blurFrom: 10, blurTo: 0, opacityFrom: 0.2, opacityTo: 1, yFrom: 0, yTo: 0, glowTo: 18, glowColor: 'currentColor' }
        : effect === 'pop'
          ? { blurFrom: 8, blurTo: 0, opacityFrom: 0, opacityTo: 1, yFrom: 12, yTo: 0, glowTo: 0, glowColor: 'currentColor' }
          : { blurFrom: 10, blurTo: 2, opacityFrom: 1, opacityTo: 1, yFrom: 0, yTo: 0, glowTo: 0, glowColor: 'currentColor' }

      const fromLetterSpacing = -fontSize / 2
      const toLetterSpacing = props.letterSpacingTo ?? 10
      const blurFrom = props.blurFrom ?? effectDefaults.blurFrom
      const blurTo = props.blurTo ?? effectDefaults.blurTo
      const opacityFrom = props.opacityFrom ?? effectDefaults.opacityFrom
      const opacityTo = props.opacityTo ?? effectDefaults.opacityTo
      const yFrom = props.yFrom ?? effectDefaults.yFrom
      const yTo = props.yTo ?? effectDefaults.yTo
      const glowTo = props.glowTo ?? effectDefaults.glowTo
      const glowColor = props.glowColor ?? effectDefaults.glowColor

      const attrsRecord = attrs as Record<string, unknown>
      const units = split === 'chars'
        ? Array.from(text)
        : split === 'words'
          ? text.split(/(\s+)/)
          : [text]

      return h(
        'div',
        {
          ...attrsRecord,
          'class': [
            WRAPPER_CLASS,
            split === 'chars' ? 'text-expansion-animation--chars' : split === 'words' ? 'text-expansion-animation--words' : null,
            isActive.value ? RUN_CLASS : null,
            attrsRecord.class,
          ],
          'style': [
            {
              '--from-letter-spacing': `${fromLetterSpacing}px`,
              '--to-letter-spacing': `${toLetterSpacing}px`,
              '--font-size': `${fontSize}px`,
              '--delay': `${delay / 1000}s`,
              '--duration': `${duration / 1000}s`,
              '--easing': easing,
              '--contrast': `${contrast}`,
              '--background-color': backgroundColor,
              '--color': color,
              '--from-blur': `${blurFrom}px`,
              '--to-blur': `${blurTo}px`,
              '--from-opacity': `${opacityFrom}`,
              '--to-opacity': `${opacityTo}`,
              '--from-y': `${yFrom}px`,
              '--to-y': `${yTo}px`,
              '--glow-color': glowColor,
              '--glow-to': `${glowTo}px`,
            },
            attrsRecord.style,
          ],
          'ref': wrapperRef,
          'role': 'text',
          'aria-label': text,
        },
        [
          h(
            'span',
            {
              'class': TEXT_CLASS,
              'aria-hidden': 'true',
              'key': runKey.value,
            },
            units.map((unit, index) => {
              if (split === 'none') {
                return h(
                  'span',
                  {
                    class: WORD_CLASS,
                  },
                  unit,
                )
              }

              return h(
                'span',
                {
                  class: CHAR_CLASS,
                  style: {
                    '--char-delay': `${(index * stagger) / 1000}s`,
                  },
                },
                unit,
              )
            }),
          ),
        ],
      )
    }
  },
}) as DefineComponent<Props>
