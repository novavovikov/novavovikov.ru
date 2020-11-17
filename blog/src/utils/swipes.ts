type Nulled<T> = T | null

interface SwipeHandlerData {
  diffPrc: number
  diffPx: number
}

export type SwipeStartHandler = (touch: Touch) => void
export type SwipeHandler = (data: SwipeHandlerData) => void
export type SwipeEndHandler = (isDone: boolean) => void

interface SwipeParams {
  startPoint: number
  endPoint: number
  size: number
  min: number
  max: number
  handler?: SwipeHandler
}

interface SwipeEndParams {
  offset: number
  startPoint: number
  endPoint: number
  size
  handler: SwipeEndHandler
}

export interface SwipeOptions {
  sensitivity: number

  // xSuccessOffset (percentage)
  offsetXTransform: number
  minXTransform: number
  maxXTransform: number

  // ySuccessOffset (percentage)
  offsetYTransform: number
  minYTransform: number
  maxYTransform: number
}

/** Swipe available handlers */
export interface SwipeHandlers {
  swipeHorizontalStart: SwipeStartHandler
  swipeVerticalStart: SwipeStartHandler

  swipeHorizontalRight: SwipeHandler
  swipeHorizontalRightEnd: SwipeEndHandler

  swipeHorizontalLeft: SwipeHandler
  swipeHorizontalLeftEnd: SwipeEndHandler

  swipeVertical: SwipeHandler
  swipeVerticalEnd: SwipeEndHandler
}

export class Swipes {
  static DEFAULT_OPTIONS: SwipeOptions = {
    sensitivity: 1,
    // xSuccessOffset (percentage)
    offsetXTransform: 30,
    minXTransform: 0,
    maxXTransform: 100,
    // ySuccessOffset (percentage)
    offsetYTransform: 30,
    minYTransform: 0,
    maxYTransform: 100
  }

  constructor(
    private _wrapper: HTMLElement,
    private options: Partial<SwipeOptions> = {}
  ) {
    this._options = { ...Swipes.DEFAULT_OPTIONS, ...options }
  }

  private _options: SwipeOptions
  private _handlers: Partial<SwipeHandlers> = {}

  private _wrapperWidth: number = 0
  private _wrapperHeight: number = 0

  private _startX: Nulled<number> = null
  private _startY: Nulled<number> = null

  private _touchstart = (e: TouchEvent) => {
    const nodesPath = e.composedPath()

    if (!nodesPath.includes(this._wrapper)) {
      return
    }

    const { swipeHorizontalStart, swipeVerticalStart } = this._handlers
    const [touch] = e.touches

    this._wrapperWidth = this._wrapper.offsetWidth
    this._wrapperHeight = this._wrapper.offsetHeight

    this._startX = touch.clientX
    this._startY = touch.clientY

    swipeHorizontalStart && swipeHorizontalStart(touch)
    swipeVerticalStart && swipeVerticalStart(touch)
  }

  private _touchmove = (e: TouchEvent) => {
    if (!this._startX || !this._startY) {
      return
    }

    const [touch] = e.touches
    const {
      swipeHorizontalRight,
      swipeHorizontalLeft,
      swipeVertical
    } = this._handlers

    this._swipe({
      min: this._options.minXTransform,
      max: this._options.maxXTransform,
      startPoint: this._startX,
      endPoint: touch.clientX,
      size: this._wrapperWidth,
      handler: swipeHorizontalRight
    })

    this._swipe({
      min: this._options.minXTransform,
      max: this._options.maxXTransform,
      startPoint: touch.clientX,
      endPoint: this._startX,
      size: this._wrapperWidth,
      handler: swipeHorizontalLeft
    })

    this._swipe({
      min: this._options.minYTransform,
      max: this._options.maxYTransform,
      startPoint: this._startY,
      endPoint: touch.clientY,
      size: this._wrapperHeight,
      handler: swipeVertical
    })
  }

  private _touchend = (e: TouchEvent) => {
    const [touch] = e.changedTouches
    const {
      swipeHorizontalRightEnd,
      swipeHorizontalLeftEnd,
      swipeVerticalEnd
    } = this._handlers

    if (this._startX && swipeHorizontalRightEnd) {
      this._swipeEnd({
        offset: this._options.offsetXTransform,
        size: this._wrapperWidth,
        startPoint: this._startX,
        endPoint: touch.clientX,
        handler: swipeHorizontalRightEnd
      })
    }

    if (this._startX && swipeHorizontalLeftEnd) {
      this._swipeEnd({
        offset: this._options.offsetXTransform,
        size: this._wrapperWidth,
        startPoint: touch.clientX,
        endPoint: this._startX,
        handler: swipeHorizontalLeftEnd
      })
    }

    if (this._startY && swipeVerticalEnd) {
      this._swipeEnd({
        offset: this._options.offsetYTransform,
        size: this._wrapperHeight,
        startPoint: this._startY,
        endPoint: touch.clientY,
        handler: swipeVerticalEnd
      })
    }

    this._startX = null
    this._startY = null
  }

  _calcDiff(startPoint: number, endPoint: number, size: number) {
    const pxDiff = endPoint - startPoint
    const prcDiff = (pxDiff / size) * 100

    return {
      px: pxDiff * this._options.sensitivity,
      prc: prcDiff * this._options.sensitivity
    }
  }

  public _swipe({
    min,
    max,
    startPoint,
    endPoint,
    size,
    handler
  }: SwipeParams) {
    if (!handler) {
      return
    }

    const { px, prc } = this._calcDiff(startPoint, endPoint, size)

    if (prc >= max) {
      return handler({
        diffPrc: max,
        diffPx: px
      })
    }

    if (prc < min) {
      return handler({
        diffPrc: min,
        diffPx: px
      })
    }

    handler({
      diffPrc: prc,
      diffPx: px
    })
  }

  _swipeEnd({ offset, size, startPoint, endPoint, handler }: SwipeEndParams) {
    const { prc } = this._calcDiff(startPoint, endPoint, size)

    handler(prc >= offset)
  }

  init(handlers: Partial<SwipeHandlers> = {}) {
    this._handlers = handlers
    window.addEventListener('touchstart', this._touchstart)
    window.addEventListener('touchmove', this._touchmove)
    window.addEventListener('touchend', this._touchend)
  }

  destroy() {
    this._handlers = {}
    window.removeEventListener('touchstart', this._touchstart)
    window.removeEventListener('touchmove', this._touchmove)
    window.removeEventListener('touchend', this._touchend)
  }

  swipeLeft = () => {}
}
