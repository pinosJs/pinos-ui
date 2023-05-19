export const loadImage = (src: string): Promise<{ status: boolean; image?: HTMLImageElement }> => {
  return new Promise((resolve) => {
    if (!src) {
      resolve({ status: false })
      return
    }

    const image = new Image()
    image.onload = () => {
      resolve({ status: true, image })
    }

    image.onerror = () => {
      resolve({ status: false })
    }

    image.src = src
  })
}
