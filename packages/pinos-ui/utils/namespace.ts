/**
 *  创建 BEM 命名规范
 */
export const useBemHelper = (block: string, namespace = 'pin') => {
  /**
  * @returns `${namespace}-${block}`
  */
  const b = () => `${namespace}-${block}`
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

export type BemHelper = ReturnType<typeof useBemHelper>
