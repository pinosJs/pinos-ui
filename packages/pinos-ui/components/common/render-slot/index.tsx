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
        const params: Record<string, any> = {}
        if (scopeData)
          params.data = scopeData

        return slotRender(params)
      } else {
        return null
      }
    }

    return () => renderSlot()
  }
})
