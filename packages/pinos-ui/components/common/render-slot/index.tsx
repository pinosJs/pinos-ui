import { useProps } from '@utils/mixins'
import { defineComponent } from 'vue'
import { renderSlotProps } from './props'

export default defineComponent({
  name: 'RenderSlot',
  props: renderSlotProps,
  setup(_props) {
    const props = useProps('', _props, {
      scopeData: null,
      slotRender: null
    })
    const renderSlot = () => {
      const { slotRender, scopeData } = props
      if (slotRender) {
        if (scopeData) {
          return slotRender({
            data: scopeData
          })
        } else {
          return slotRender()
        }
      } else {
        return null
      }
    }

    return () => renderSlot()
  }
})
