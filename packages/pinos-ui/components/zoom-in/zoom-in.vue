<template>
  <div
    :class="nh.b()"
    :style="{ cursor }"
  >
    <canvas
      ref="sourceCanvas"
      :class="nh.bs('canvas')"
      :width="props.width"
      :height="props.width"
      @mousemove.stop="handleMousemove"
      @mouseleave="handleMouseleave"
    />
    <div
      v-show="previewShow"
      :class="nh.bs('preview-wrapper')"
      :style="previewStyle"
    >
      <canvas
        ref="previewCanvas"
        :class="nh.bs('preview-canvas')"
        :width="props.previewSize"
        :height="props.previewSize"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProps, useNameHelper } from '@utils/mixins'
import { watch, ref, computed, onUnmounted, reactive } from 'vue'
import { zoomInProps } from './props'
import { loadImage } from './utils'

const _props = defineProps(zoomInProps)
const props = useProps('zoomIn', _props, {
  imageSrc: '',
  preview: true,
  type: 'follow',
  scale: 10,
  width: 0,
  height: 0,
  previewSize: 190,
  grid: false,
  gridLineColor: '#666',
  centerGridLineColor: '#000',
  pickColor: false,
  imageSmoothingEnabled: true
})
const nh = useNameHelper('zoom-in')

const status = reactive<{ type: 'success' | 'fail'; message: string }>({
  type: 'success',
  message: ''
})
const previewStyle = ref({})
const previewShow = ref(false)
const cursor = ref('pointer')
const sourceCanvas = ref<HTMLCanvasElement>()
const previewCanvas = ref<HTMLCanvasElement>()
const canvasContext: Map<string, CanvasRenderingContext2D> = new Map()

const gridCount = computed(() => {
  return props.previewSize / props.scale
})

const drawGrid = (ctx: CanvasRenderingContext2D, color: string, stepX: number, stepY: number) => {
  ctx.strokeStyle = color
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.moveTo(0, 0)
  ctx.lineTo(ctx.canvas.width, 0)
  ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
  ctx.lineTo(0, ctx.canvas.height)
  ctx.closePath()
  ctx.stroke()

  ctx.lineWidth = 0.5
  for (let i = stepX + 0.5; i < ctx.canvas.width; i += stepX) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, ctx.canvas.height)
    ctx.stroke()
  }

  for (let i = stepY + 0.5; i < ctx.canvas.height; i += stepY) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(ctx.canvas.width, i)
    ctx.stroke()
  }
}

const initCanvas = async (src: string) => {
  try {
    const { status: res, image } = await loadImage(src)
    if (!res || !image) {
      status.type = 'fail'
      status.message = '图片加载失败'
      return
    }

    if (!sourceCanvas.value || !previewCanvas.value) {
      status.type = 'fail'
      status.message = 'canvas初始化异常'
      return
    }

    const sourceContext = sourceCanvas.value.getContext('2d')
    const previewContext = previewCanvas.value.getContext('2d')

    if (!sourceContext || !previewContext) {
      status.type = 'fail'
      status.message = 'canvas初始化异常'
      return
    }

    const { width: w, height: h, imageSmoothingEnabled, grid, gridLineColor, scale } = props

    previewContext.imageSmoothingEnabled = imageSmoothingEnabled

    sourceContext.drawImage(image, 0, 0, w, h)

    if (grid)
      drawGrid(previewContext, gridLineColor, scale, scale)

    canvasContext.set('preview', previewContext)
    canvasContext.set('source', sourceContext)

    status.type = 'success'
    status.message = ''
  } catch {
    status.type = 'fail'
    status.message = '加载失败'
  }
}

const handleMousemove = (event: MouseEvent) => {
  const { previewSize, scale, type, preview, grid, centerGridLineColor } = props
  if (!preview)
    return

  const previewContext = canvasContext.get('preview')
  const sourceContext = canvasContext.get('source')
  if (!previewContext || !sourceContext || !sourceCanvas.value)
    return

  const { offsetX, offsetY } = event
  const sx = offsetX - previewSize / scale / 2 // 裁剪框在原图左上角的x
  const sy = offsetY - previewSize / scale / 2 // 裁剪框在原图左上角的y
  const sWidth = previewSize / scale // 裁剪框的宽度
  const sHeight = previewSize / scale // 裁剪框的宽度

  cursor.value = 'none'
  if (type === 'follow') {
    previewStyle.value = {
      top: `${offsetY - previewSize / 2}px`,
      left: `${offsetX - previewSize / 2}px`
    }
  }

  if (!grid) {
    previewContext.clearRect(0, 0, previewSize, previewSize)
    previewContext.drawImage(
      sourceCanvas.value,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      previewSize,
      previewSize
    )
  } else {
    const imageData = sourceContext.getImageData(
      sx,
      sy,
      sWidth,
      sHeight
    ).data

    for (let y = 0; y < gridCount.value; y++) {
      for (let x = 0; x < gridCount.value; x++) {
        const ind = (y * gridCount.value + x) * 4
        const r = imageData[ind] as number
        const g = imageData[ind + 1] as number
        const b = imageData[ind + 2] as number
        const a = imageData[ind + 3] as number

        previewContext.beginPath()
        previewContext.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
        previewContext.fillRect(
          x * scale + 1,
          y * scale + 1,
          scale - 1,
          scale - 1
        )
        previewContext.fill()
      }
    }
    // 中心的框
    previewContext.strokeStyle = centerGridLineColor
    previewContext.lineWidth = 0.5
    previewContext.strokeRect(
      previewSize / 2 - scale / 2,
      previewSize / 2 - scale / 2,
      scale,
      scale
    )
  }

  !previewShow.value && (previewShow.value = true)
}

const handleMouseleave = () => {
  previewShow.value = false
  cursor.value = props.pickColor ? 'pointer' : 'none'
}

const destroyZoomIn = () => {
  canvasContext.clear()
}

watch(() => props.imageSrc, (src: string) => {
  initCanvas(src)
}, { immediate: true })

watch(() => props.pickColor, (val) => {
  cursor.value = val ? 'pointer' : 'none'
}, { immediate: true })

onUnmounted(() => {
  destroyZoomIn()
})
</script>

<script lang="ts">
export default {
  name: 'ZoomIn'
}
</script>
