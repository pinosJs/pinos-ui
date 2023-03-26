import { namespace } from '@config/constant'
import { configNamespace } from '@utils/namespace'
import { configProps } from '@utils/props'
import { defineComponent, toRef, renderSlot } from 'vue'
import type { PropType } from 'vue'
import type { PropsOptions } from '~/props'

export default defineComponent({
  name: 'ConfigProvider',
  props: {
    props: {
      type: Object as PropType<PropsOptions>,
      default: () => ({})
    },

    namespace: {
      type: String,
      default: namespace
    }
  },

  setup(props, { slots }) {
    configProps(toRef(props, 'props'))
    configNamespace(toRef(props, 'namespace'))

    return () => renderSlot(slots, 'default')
  }
})
