import type { Ref } from 'vue'

export type MaybeRef<T> = T | Ref<T>

export type DeepPartial<T extends Record<string, any>> = {
  [K in keyof T]?: T[K] extends Record<string, any> ? DeepPartial<T[K]> : T[K]
}
