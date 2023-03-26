import { useProps, useNameHelper } from '@utils/mixins'
import { defineComponent, computed } from 'vue'
import { buttonProps } from './props'

export default defineComponent({
  name: 'Button',
  props: buttonProps,
  setup(_props) {
    const props = useProps('Button', _props, {
      text: '123'
    })
    const bh = useNameHelper('button')
    const className = computed(() => {
      return {
        [bh.b()]: true
      }
    })

    return () => {
      return (
        <button class={ className.value }>
          { props.text }
        </button>
      )
    }
  }
})
