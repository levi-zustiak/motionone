import { spring } from "../spring"
import { animateSync } from "./utils"

describe("spring", () => {
  test("Runs animations with default values ", () => {
    expect(animateSync(spring({}), 200)).toEqual([0, 1, 1, 1])
  })
  test("Underdamped spring", () => {
    expect(
      animateSync(
        spring({
          from: 100,
          to: 1000,
          stiffness: 300,
          restSpeed: 10,
          restDelta: 0.5,
        }),
        200
      )
    ).toEqual([100, 1343, 873, 1046, 984, 1005, 998, 1001, 1000])
  })

  test("Velocity passed to underdamped spring", () => {
    const settings = {
      from: 100,
      to: 1000,
      stiffness: 300,
      restSpeed: 10,
      restDelta: 0.5,
    }

    const noVelocity = animateSync(spring(settings), 200)
    const velocity = animateSync(spring({ ...settings, velocity: 1000 }), 200)

    expect(noVelocity).not.toEqual(velocity)
  })

  test("Critically damped spring", () => {
    expect(
      animateSync(
        spring({
          from: 100,
          to: 1000,
          stiffness: 100,
          damping: 20,
          restSpeed: 10,
          restDelta: 0.5,
        }),
        200
      )
    ).toEqual([100, 635, 918, 984, 997, 1000])
  })

  test("Velocity passed to critically spring", () => {
    const settings = {
      from: 100,
      to: 1000,
      stiffness: 100,
      damping: 20,
      restSpeed: 10,
      restDelta: 0.5,
    }

    const noVelocity = animateSync(spring(settings), 200)
    const velocity = animateSync(spring({ ...settings, velocity: 1000 }), 200)

    expect(noVelocity).not.toEqual(velocity)
  })
})
