import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '~types/utils'

export const zoomInProps = {
  imageSrc: {
    type: String,
    required: true,
    default: ''
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  preview: {
    type: Boolean,
    default: true
  },
  previewSize: {
    type: Number,
    required: true
  },
  type: {
    type: String as PropType<'follow' | 'fixed'>,
    default: 'follow'
  },
  scale: {
    type: Number
  },
  grid: {
    type: Boolean
  },
  gridLineColor: {
    type: String
  },
  centerGridLineColor: {
    type: String
  },
  pickColor: {
    type: Boolean
  },
  imageSmoothingEnabled: {
    type: Boolean
  }
}

export type ZoomInProps = ExtractPropTypes<typeof zoomInProps>
export type ZoomInConfigProps = ConfigurableProps<ZoomInProps>
