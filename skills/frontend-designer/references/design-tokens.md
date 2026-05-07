# Design Tokens 设计令牌规范

## 概述

设计令牌是设计系统的原子级构建块，用于存储颜色、字体、间距等设计决策。使用设计令牌可以确保跨平台的一致性，并便于主题切换。

## 颜色令牌

### 主色
```
--color-primary-50: #eff6ff   /* 最浅 */
--color-primary-100: #dbeafe
--color-primary-200: #bfdbfe
--color-primary-300: #93c5fd
--color-primary-400: #60a5fa
--color-primary-500: #3b82f6  /* 主色 */
--color-primary-600: #2563eb
--color-primary-700: #1d4ed8
--color-primary-800: #1e40af
--color-primary-900: #1e3a8a  /* 最深 */
```

### 中性色
```
--color-gray-50: #f9fafb
--color-gray-100: #f3f4f6
--color-gray-200: #e5e7eb
--color-gray-300: #d1d5db
--color-gray-400: #9ca3af
--color-gray-500: #6b7280
--color-gray-600: #4b5563
--color-gray-700: #374151
--color-gray-800: #1f2937
--color-gray-900: #111827
```

### 语义色
```
--color-success: #10b981
--color-warning: #f59e0b
--color-error: #ef4444
--color-info: #3b82f6
```

## 字体令牌

### 字体族
```
--font-sans: system-ui, -apple-system, sans-serif
--font-serif: Georgia, serif
--font-mono: ui-monospace, monospace
```

### 字号
```
--text-xs: 0.75rem    /* 12px */
--text-sm: 0.875rem   /* 14px */
--text-base: 1rem     /* 16px */
--text-lg: 1.125rem   /* 18px */
--text-xl: 1.25rem    /* 20px */
--text-2xl: 1.5rem    /* 24px */
--text-3xl: 1.875rem  /* 30px */
--text-4xl: 2.25rem   /* 36px */
```

### 字重
```
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### 行高
```
--leading-tight: 1.25
--leading-snug: 1.375
--leading-normal: 1.5
--leading-relaxed: 1.625
--leading-loose: 2
```

## 间距令牌

```
--space-0: 0
--space-1: 0.25rem   /* 4px */
--space-2: 0.5rem    /* 8px */
--space-3: 0.75rem   /* 12px */
--space-4: 1rem      /* 16px */
--space-5: 1.25rem   /* 20px */
--space-6: 1.5rem    /* 24px */
--space-8: 2rem      /* 32px */
--space-10: 2.5rem   /* 40px */
--space-12: 3rem     /* 48px */
--space-16: 4rem     /* 64px */
```

## 圆角令牌

```
--radius-none: 0
--radius-sm: 0.125rem   /* 2px */
--radius-md: 0.25rem    /* 4px */
--radius-lg: 0.5rem     /* 8px */
--radius-xl: 0.75rem    /* 12px */
--radius-2xl: 1rem      /* 16px */
--radius-full: 9999px
```

## 阴影令牌

```
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05)
--shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1)
--shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1)
--shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1)
```

## 使用示例

### CSS 变量
```css
.button {
  background-color: var(--color-primary-500);
  color: white;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-medium);
}
```

### Tailwind 配置
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
```
