import type { PropType, Slot } from 'vue'

export const renderSlotProps = {
  scopeData: {
    type: Object as PropType<any>
  },
  slotRender: {
    type: [Function, Object] as PropType<Slot | null | undefined>,
    required: true
  }
}
