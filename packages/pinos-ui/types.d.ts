declare module 'vue' {
  export interface GlobalComponents {
    PinButton: typeof import('pinos-ui')['PinButton']
    PinConfigProvider: typeof import('pinos-ui')['PinConfigProvider']
    PinFilterGroup: typeof import('pinos-ui')['PinFilterGroup']
    PinTable: typeof import('pinos-ui')['PinTable']
  }
}

export {}
