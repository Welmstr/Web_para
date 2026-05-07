# 首页队徽背景优化计划

## 问题分析
当前队徽背景中"PARA"文字不可见，原因是：
1. 模糊度过高（45px）导致文字轮廓完全消失
2. 透明度过低（0.1）使队徽过于隐蔽
3. backgroundPosition 偏移过大导致主体被裁剪

## 解决方案
调整队徽显示参数，确保"PARA"文字清晰可见且自然融入背景。

### 具体修改
```tsx
<div
  className="absolute inset-0 pointer-events-none"
  style={{
    backgroundImage: `url(${new URL('../../assets/队徽.jpg', import.meta.url).href})`,
    backgroundSize: '140%',
    backgroundPosition: 'center right -5% top 10%',
    backgroundRepeat: 'no-repeat',
    opacity: 0.28,
    filter: 'blur(12px)',
  }}
/>
```

### 关键参数
- `opacity: 0.28`：提高透明度至0.28，增强可见性
- `filter: 'blur(12px)'`：降低模糊度至12px，保留文字轮廓
- `backgroundSize: '140%'`：放大图片确保完整显示
- `backgroundPosition: 'center right -5% top 10%'`：调整位置使"PARA"居中可视

## 预期效果
斜体"PARA"文字以半透明水印形式清晰可见，与藏蓝渐变背景协调统一。