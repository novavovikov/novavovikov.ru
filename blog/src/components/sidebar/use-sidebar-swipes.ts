import React from 'react'
import { SwipeHandlers, Swipes } from '../../utils/swipes'

interface State {
  opened: boolean
  speed: number
  position: number
}

interface UseSwipesValue<SidebarElement, ControlElement>
  extends Partial<SwipeHandlers>,
    State {
  sidebarRef: React.RefObject<SidebarElement>
  controlRef: React.RefObject<ControlElement>
  setOpenStatus: (status: boolean) => void
}

export const useSidebarSwipes = <
  SidebarElement extends HTMLDivElement,
  ControlElement extends HTMLDivElement
>(
  openPosition: number = 0,
  closePosition: number = 100,
  speed: number = 250
) => {
  const [state, setState] = React.useState<State>({
    opened: false,
    speed,
    position: closePosition
  })

  const updateState = React.useCallback((updatedState: Partial<State>) => {
    setState((s) => ({ ...s, ...updatedState }))
  }, [])

  const sidebarRef = React.useRef<SidebarElement>(null)
  const controlRef = React.useRef<ControlElement>(null)

  const controlSwipes: React.MutableRefObject<Swipes | null> = React.useRef(
    null
  )
  const sidebarSwipes: React.MutableRefObject<Swipes | null> = React.useRef(
    null
  )

  const setOpenStatus = React.useCallback((status: boolean) => {
    updateState({
      opened: status,
      speed,
      position: status ? openPosition : closePosition
    })
  }, [])

  // open sidebar
  React.useEffect(() => {
    if (controlRef.current && sidebarRef.current) {
      controlSwipes.current = new Swipes(controlRef.current, {
        sensitivity:
          controlRef.current.offsetWidth / sidebarRef.current.offsetWidth
      })

      controlSwipes.current.init({
        swipeHorizontalStart: () => updateState({ speed: 0 }),
        swipeHorizontalLeft: (diff) =>
          updateState({ position: 100 - diff.diffPrc }),
        swipeHorizontalLeftEnd: setOpenStatus
      })
    }
  }, [])

  // close sidebar
  React.useEffect(() => {
    if (sidebarRef.current) {
      sidebarSwipes.current = new Swipes(sidebarRef.current)

      sidebarSwipes.current.init({
        swipeHorizontalStart: () => updateState({ speed: 0 }),
        swipeHorizontalRight: (diff) => updateState({ position: diff.diffPrc }),
        swipeHorizontalRightEnd: (isDone) => {
          setOpenStatus(!isDone)
        }
      })

      return () => {
        sidebarSwipes.current?.destroy()
      }
    }
  }, [])

  return React.useMemo<UseSwipesValue<SidebarElement, ControlElement>>(
    () => ({
      sidebarRef,
      controlRef,
      setOpenStatus,
      ...state
    }),
    [state]
  )
}
