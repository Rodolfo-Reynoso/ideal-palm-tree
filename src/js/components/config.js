export let c = canvas.getContext('2d')
export let canvas

export function initializeCanvas() {
  canvas = document.querySelector('.canvas')
  c = canvas.getContext('2d')
  if (!canvas) {
    console.error('Canvas element not found.')
    return
  }


}



// Call this function to initialize canvas after the DOM is ready
export function initCanvasOnDOMReady() {
  document.addEventListener('DOMContentLoaded', initializeCanvas)



}




