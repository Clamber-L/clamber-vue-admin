# Vue 3 到 React 转换对照表

## 基础语法转换

### 数据绑定
```vue
<!-- Vue -->
<template>
  <div>{{ message }}</div>
  <input v-model="message" />
</template>

<script setup>
const message = ref('Hello')
</script>
```

```tsx
// React
const Component = () => {
  const [message, setMessage] = useState('Hello')
  
  return (
    <div>
      <div>{message}</div>
      <input 
        value={message} 
        onChange={(e) => setMessage(e.target.value)} 
      />
    </div>
  )
}
```

### 条件渲染
```vue
<!-- Vue -->
<div v-if="visible">显示内容</div>
<div v-show="visible">显示内容</div>
```

```tsx
// React
{visible && <div>显示内容</div>}
{visible ? <div>显示内容</div> : null}
```

### 列表渲染
```vue
<!-- Vue -->
<li v-for="item in list" :key="item.id">
  {{ item.name }}
</li>
```

```tsx
// React
{list.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```

### 事件处理
```vue
<!-- Vue -->
<button @click="handleClick">点击</button>
<button @click="handleClick($event, item)">点击</button>
```

```tsx
// React
<button onClick={handleClick}>点击</button>
<button onClick={(e) => handleClick(e, item)}>点击</button>
```

### 样式绑定
```vue
<!-- Vue -->
<div :class="{ active: isActive }" :style="{ color: textColor }">
```

```tsx
// React
<div 
  className={isActive ? 'active' : ''} 
  style={{ color: textColor }}
>
```

## 组合式 API 转换

### 响应式数据
```vue
<!-- Vue -->
<script setup>
const count = ref(0)
const user = reactive({ name: 'John' })
const doubled = computed(() => count.value * 2)
</script>
```

```tsx
// React
const [count, setCount] = useState(0)
const [user, setUser] = useState({ name: 'John' })
const doubled = useMemo(() => count * 2, [count])
```

### 生命周期
```vue
<!-- Vue -->
<script setup>
onMounted(() => {
  console.log('组件挂载')
})

onUnmounted(() => {
  console.log('组件卸载')
})
</script>
```

```tsx
// React
useEffect(() => {
  console.log('组件挂载')
  
  return () => {
    console.log('组件卸载')
  }
}, [])
```

### 监听器
```vue
<!-- Vue -->
<script setup>
watch(count, (newVal, oldVal) => {
  console.log('count changed')
})

watchEffect(() => {
  console.log('count is', count.value)
})
</script>
```

```tsx
// React
useEffect(() => {
  console.log('count changed')
}, [count])

useEffect(() => {
  console.log('count is', count)
}, [count])
```

## 组件通信

### Props
```vue
<!-- Vue -->
<script setup>
defineProps<{
  title: string
  count?: number
}>()
</script>
```

```tsx
// React
interface Props {
  title: string
  count?: number
}

const Component: React.FC<Props> = ({ title, count = 0 }) => {
  return <div>{title}: {count}</div>
}
```

### 事件传递
```vue
<!-- Vue -->
<script setup>
const emit = defineEmits<{
  change: [value: string]
}>()

const handleChange = (value: string) => {
  emit('change', value)
}
</script>
```

```tsx
// React
interface Props {
  onChange: (value: string) => void
}

const Component: React.FC<Props> = ({ onChange }) => {
  const handleChange = (value: string) => {
    onChange(value)
  }
  
  return <button onClick={() => handleChange('test')}>Change</button>
}
```

### 插槽/Children
```vue
<!-- Vue -->
<template>
  <div>
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </div>
</template>
```

```tsx
// React
interface Props {
  children: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
}

const Component: React.FC<Props> = ({ children, header, footer }) => {
  return (
    <div>
      {header}
      {children}
      {footer}
    </div>
  )
}
```

## 自定义 Hooks 转换

### Vue Composables
```typescript
// Vue
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => count.value++
  const decrement = () => count.value--
  
  return {
    count: readonly(count),
    increment,
    decrement
  }
}
```

```typescript
// React
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])
  
  return {
    count,
    increment,
    decrement
  }
}
```

## 状态管理转换

### Pinia Store
```typescript
// Vue (Pinia)
export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const isLogin = computed(() => !!userInfo.value)
  
  const login = (info) => {
    userInfo.value = info
  }
  
  return { userInfo, isLogin, login }
})
```

```typescript
// React (Zustand)
interface UserState {
  userInfo: any
  isLogin: boolean
  login: (info: any) => void
}

export const useUserStore = create<UserState>((set, get) => ({
  userInfo: null,
  get isLogin() {
    return !!get().userInfo
  },
  login: (info) => set({ userInfo: info })
}))
```