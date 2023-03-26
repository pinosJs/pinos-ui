import type { Ref, PropType, CSSProperties } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export type DeepPartial<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K]
}

export type CommonExcludedProps =
   | 'inherit'
   | 'value'
   | 'visible'

export type ExcludeProps<P, E extends string = never, I extends string = never> =
  | CommonExcludedProps
  | E
  | (P extends I ? never : P extends `on${Capitalize<string>}` ? P : never)

/**
* Create a configurable props
*
* @param T the type of import('vue').ExtractPropTypes
* @param E the props should force exclude
* @param I the props should force include
*/
export type ConfigurableProps<T, E extends string = never, I extends string = never> = Omit<
{
  [P in keyof T]?: P extends I
    ? T[P]
    : P extends `on${Capitalize<string>}`
      ? never
      : T[Exclude<P, CommonExcludedProps | E>]
},
ExcludeProps<keyof T, E, I>
>

export type ClassType = string | Record<string, any> | Array<string | Record<string, any>>
export type StyleType = string | CSSProperties | Array<string | CSSProperties>

export const classProp = [String, Object, Array] as PropType<ClassType>
export const styleProp = [String, Object, Array] as PropType<StyleType>
