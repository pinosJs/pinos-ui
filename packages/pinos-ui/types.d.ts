declare module 'vue' {
  export interface GlobalComponents {
    PinConfigProvider: typeof import('pinos-ui')['PinConfigProvider']
    PinFilterGroup: typeof import('pinos-ui')['PinFilterGroup']
    PinTable: typeof import('pinos-ui')['PinTable']
    PinZoomIn: typeof import('pinos-ui')['PinZoomIn']
  }
}

export {}
