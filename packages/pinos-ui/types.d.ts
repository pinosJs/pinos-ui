declare module 'vue' {
  export interface GlobalComponents {
    PinConfigProvider: typeof import('pinos-ui')['PinConfigProvider']
    PinFilterGroup: typeof import('pinos-ui')['PinFilterGroup']
    PinTable: typeof import('pinos-ui')['PinTable']
  }
}

export {}
