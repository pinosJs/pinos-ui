declare module 'vue' {
  export interface GlobalComponents {
    PinButton: typeof import('pinos-ui')['PinButton']
    PinConfigProvider: typeof import('pinos-ui')['PinConfigProvider']
    PinTable: typeof import('pinos-ui')['PinTable']
  }
}

export {}
