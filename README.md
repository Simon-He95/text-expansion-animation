## text-expansion-animation

文字交融动画组件

## 🧰 安装

```
npm i text-expansion-animation
```

## 👼 使用

```js
import { createApp } from 'vue'
import { TextExpansionAnimation } from 'text-expansion-animation'
import 'text-expansion-animation/style.css'

const app = createApp(App)
app.component('TextExpansionAnimation', TextExpansionAnimation)
app.mount('#app')
```

## 参数

```typescript
{
  text?: string
  backgroundColor?: string
  color?: string
  fontSize?: number
  duration?: number
  delay?: number
  contrast?: number

  split?: 'none' | 'chars' | 'words'
  trigger?: 'mount' | 'visible' | 'manual'
  stagger?: number
  once?: boolean
  easing?: string
  effect?: 'blur' | 'glow' | 'pop'

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
```

## 示例：逐字 + 视口触发

```vue
<TextExpansionAnimation
  text="Scroll-triggered • staggered • pop"
  split="chars"
  trigger="visible"
  effect="pop"
  :stagger="28"
  :once="false"
/>
```

## [examples](https://github.com/Simon-He95/text-expansion-animation/blob/main/playground/src/pages/index.vue)

## License

[MIT](./LICENSE) License © 2022 [Simon He](https://github.com/Simon-He95)

<a href="https://github.com/Simon-He95/sponsor" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;" ></a>

<span><div align="center">![sponsors](https://www.hejian.club/images/sponsors.jpg)</div></span>
