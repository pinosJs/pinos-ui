// refer to：https://github.com/vexip-ui/vexip-ui/blob/main/common/config
import { computed, provide, inject, unref } from 'vue'
import type { App, ComputedRef, Ref } from 'vue'

export const PROVIDED_NAMESPACE = '__pin-provided-namespace'
export const globalNamespace = 'pin'

export function configNamespace(sourceNamespace: string | Ref<string>, app?: App) {
  if (app) {
    const namespace = computed(() => {
      const namespace = unref(sourceNamespace)

      return namespace || globalNamespace
    })

    app.provide(PROVIDED_NAMESPACE, namespace)
  } else {
    const upstreamNamespace = inject<ComputedRef<string> | null>(PROVIDED_NAMESPACE, null)
    const namespace = computed(() => {
      return unref(sourceNamespace) || upstreamNamespace?.value || globalNamespace
    })

    provide(PROVIDED_NAMESPACE, namespace)
  }
}

export function useNamespace() {
  return inject(PROVIDED_NAMESPACE, globalNamespace)
}

/**
 *  Create a name helper for BEM.
 */
export const useNameHelper = (block: string, namespace = useNamespace()) => {
  /**
  * @returns `${namespace}-${block}`
  */
  const b = () => `${unref(namespace)}-${block}`
  /**
   * @returns `${namespace}-${block}__${element}`
   */
  const be = (element: string) => `${b()}__${element}`
  /**
   * @returns `${namespace}-${block}--${modifier}`
   */
  const bm = (modifier: string | number) => `${b()}--${modifier}`
  /**
   * @returns `${namespace}-${block}__${element}--${modifier}`
   */
  const bem = (element: string, modifier: string | number) => `${b()}__${element}--${modifier}`
  /**
   * @returns `${namespace}-${block}-${suffix}`
   */
  const bs = (suffix: string) => `${b()}-${suffix}`
  /**
   * @returns `${namespace}-${suffix}`
   */
  const ns = (suffix: string) => `${namespace}-${suffix}`

  return {
    b,
    be,
    bm,
    bem,
    bs,
    ns
  }
}

export type NameHelper = ReturnType<typeof useNameHelper>
