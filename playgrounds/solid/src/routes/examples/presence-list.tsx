import { createSignal, For, Show } from "solid-js"
// import { Motion, Presence } from "@motionone/solid"
import {
  Motion,
  Presence,
  PresenceList,
} from "../../../../../packages/solid/src"

import "./presence.css"

function Item(props) {
  return (
    <Motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
    >
      {props.children}
    </Motion.div>
  )
}

export default function PresenceInitial() {
  const [list, setList] = createSignal(["red", "yellow", "red"])

  const handleShift = () => {
    setList((prev) => {
      const c = [...prev]

      const popped = c.shift()

      return c
    })
  }

  return (
    <div class="container">
      <button onClick={handleShift}>Shift</button>
      <button onClick={() => setList(["red", "yellow", "red"])}>Reset</button>
      <PresenceList>
        <For each={list()}>{(item, i) => <Item>{item}</Item>}</For>
      </PresenceList>
    </div>
  )
}
