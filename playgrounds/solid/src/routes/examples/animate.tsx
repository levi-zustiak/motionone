import { Motion } from "../../../../../packages/solid/src"
// import { Motion } from "@motionone/solid"

export default function Animate() {
  return (
    <Motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      hover={{ scale: 1.2 }}
      press={{ scale: 0.9 }}
      inView={{ backgroundColor: "black" }}
      transition={{ duration: 1 }}
      style={{ width: "200px", "background-color": "red", height: "200px" }}
    >
      Hello
    </Motion.h1>
  )
}
