export interface Props {
  backgroundColor?: string
  color?: string
  fontSize?: number
  duration?: number
  delay?: number
  text?: string
  contrast?: number

  /**
   * Split text into animated units.
   * - `none`: animate the whole string
   * - `chars`: animate each grapheme (staggered)
   * - `words`: animate each token separated by whitespace (staggered)
   */
  split?: 'none' | 'chars' | 'words'

  /**
   * When to start the animation.
   * - `mount`: play on mount and on prop changes
   * - `visible`: play when entering the viewport
   * - `manual`: only play via exposed `play()`
   */
  trigger?: 'mount' | 'visible' | 'manual'

  /**
   * Stagger delay (ms) between units when `split !== 'none'`.
   */
  stagger?: number

  /**
   * Only relevant when `trigger="visible"`.
   */
  once?: boolean

  /**
   * Animation easing function.
   */
  easing?: string

  /**
   * Visual presets.
   */
  effect?: 'blur' | 'glow' | 'pop'

  // Fine-grained overrides (px / unitless)
  letterSpacingTo?: number
  blurFrom?: number
  blurTo?: number
  opacityFrom?: number
  opacityTo?: number
  yFrom?: number
  yTo?: number
  glowTo?: number
  glowColor?: string
}
