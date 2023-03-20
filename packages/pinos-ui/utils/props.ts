import { computed, unref, inject, provide, reactive } from 'vue'
import { mergeObject } from './merge-object'
import { validateType } from './utils'
import type { PropsOptions } from '../props'
import type { MaybeRef } from '../types/utils'
import type { App, ComputedRef } from 'vue'

function isMergeType(target: any) {
  const map = ['Object', 'Array']
  return map.some((t) => {
    return validateType(target, t)
  })
}

export const PROVIDED_PROPS = '__pin-provided-props'

export function configProps<T>(props: MaybeRef<T>, app?: App) {
  if (app) {
    app.provide(
      PROVIDED_PROPS,
      computed(() => unref(props))
    )
  } else {
    const defaultProvideProps = inject<ComputedRef<Record<string, any>> | null>(PROVIDED_PROPS, null)

    const providedProps = computed(() => {
      if (!defaultProvideProps?.value)
        return unref(props)

      return mergeObject(defaultProvideProps.value, unref(props) as any)
    })

    provide(PROVIDED_PROPS, providedProps)
  }
}

export function useProps<T extends Record<string, any>>(
  name: keyof PropsOptions,
  sourceProps: T,
  defaultData: Partial<T> = {}
) {
  const providedProps = inject<ComputedRef<Record<string, Partial<T>>> | null>(
    PROVIDED_PROPS,
    null
  )

  const configProps = computed<Partial<T>>(() => {
    return providedProps?.value?.[name] ?? {}
  })

  const keys = Object.keys(sourceProps) as Array<keyof T>
  const props: {
    [P in keyof T]?: ComputedRef<T[P]>
  } = {}

  keys.forEach((key) => {
    const defaultValue = defaultData[key] as any
    props[key] = computed(() => {
      const providedValue = configProps.value[key]
      const sourcePropValue = sourceProps[key]

      if (sourcePropValue === undefined || sourcePropValue === null) {
        if (providedValue !== null && providedValue !== undefined) {
          if (isMergeType(defaultValue) && isMergeType(providedValue))
            return mergeObject(defaultValue, providedValue)
          else
            return providedValue
        }

        return defaultValue
      }

      return sourcePropValue
    })
  })

  return reactive(props) as {
    [P in keyof T]-?: T[P]
  }
}
