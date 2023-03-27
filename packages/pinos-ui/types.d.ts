declare module 'vue' {
  export interface GlobalComponents {
    PinButton: typeof import('pinos-ui')['Button']
    PinConfigProvider: typeof import('pinos-ui')['ConfigProvider']
  }
}

export {}
