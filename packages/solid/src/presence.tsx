import {
  batch,
  createContext,
  createSignal,
  FlowComponent,
  JSXElement,
} from "solid-js"
import { mountedStates } from "@motionone/dom"
import { resolveElements, resolveFirst } from "@solid-primitives/refs"
import {
  createListTransition,
  createSwitchTransition,
} from "@solid-primitives/transition-group"
import { onCompleteExit } from "./primitives"
import { Options } from "./types"

export type PresenceContextState = () => boolean
export const PresenceContext = createContext<PresenceContextState>()

/**
 * Perform exit/enter trantisions of children `<Motion>` components.
 *
 * accepts props:
 * - `initial` – *(Defaults to `true`)* – If `false`, will disable the first animation on all child `Motion` elements the first time `Presence` is rendered.
 * - `exitBeforeEnter` – *(Defaults to `false`)* – If `true`, `Presence` will wait for the exiting element to finish animating out before animating in the next one.
 *
 * @example
 * ```tsx
 * <Presence exitBeforeEnter>
 *   <Show when={toggle()}>
 *     <Motion.div
 *       initial={{ opacity: 0 }}
 *       animate={{ opacity: 1 }}
 *       exit={{ opacity: 0 }}
 *     />
 *   </Show>
 * </Presence>
 * ```
 */
export const Presence: FlowComponent<{
  initial?: boolean
  exitBeforeEnter?: boolean
}> = (props) => {
  let initial = props.initial ?? true
  const [mount, setMount] = createSignal(true)

  const state = { initial: props.initial ?? true, mount }

  const render = (
    <PresenceContext.Provider value={() => initial}>
      {
        createSwitchTransition(
          resolveFirst(() => props.children),
          {
            appear: state.initial,
            mode: props.exitBeforeEnter ? "out-in" : "parallel",
            onExit(el, done) {
              batch(() => {
                ;(mountedStates.get(el)?.getOptions() as Options).exit
                  ? onCompleteExit(el, done)
                  : done()
              })
            },
            onEnter(_, done) {
              batch(() => {
                done()
                console.log(done)
              })
            },
          }
        ) as any as JSXElement
      }
    </PresenceContext.Provider>
  )

  initial = true

  return render
}

export const PresenceList = (props) => {
  let initial = props.initial !== false
  const [mount, setMount] = createSignal(true)

  const state = { initial: props.initial ?? true, mount }

  const render = (
    <PresenceContext.Provider value={() => initial}>
      {
        createListTransition(resolveElements(() => props.children).toArray, {
          appear: state.initial,
          onChange({ list, added, removed, unchanged, finishRemoved }) {
            removed.forEach((el) =>
              (mountedStates.get(el)?.getOptions() as Options).exit
                ? onCompleteExit(el, () => finishRemoved([el]))
                : finishRemoved([el])
            )
          },
        }) as any as JSXElement
      }
    </PresenceContext.Provider>
  )

  return render
}
