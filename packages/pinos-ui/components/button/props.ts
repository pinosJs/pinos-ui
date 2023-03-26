import type { ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '~/types/utils'

export const buttonProps = {
  text: {
    type: String
  }
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonConfigProps = ConfigurableProps<ButtonProps>
