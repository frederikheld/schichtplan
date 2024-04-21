/// INPUT DATA ///

const coreTeam: Person[] = ['Eva', 'Steffi', 'Luca', 'Desi', 'Fred', 'Rebecca']
const numberOfDays: number = 7
const numberOfShiftsPerDay: number = 2
const numberOfPersonsPerShift: number = 3

/// CONFIG ///

const maxGenerations: number = 100
const populationSize: number = 100
const minRequiredFitness: number = 1.10 // 1.00 is optimum
const mutationProbability: number = 0.01

/// OUTPUT DATA STRUCTURE ///

type Person = string
type Shift = Person[]
type Day = Shift[]
type ShiftSchedule = Day[]

/// LIFECYCLE ///

const rules = [
  dontWorkWithTheSamePersonTwice,
  workOnlyOneShiftPerDay,
  evenSpreadOfWorkload
]

function main (): void {
  // randomly init first genereation:
  const shiftSchedule: ShiftSchedule = initSchedule(coreTeam, numberOfDays, numberOfShiftsPerDay, numberOfPersonsPerShift)

  // check fitness:
  const fitness: number = calculateFitness(shiftSchedule)

  console.log(fitness)

  // run generations:
  const currentIteration = 0
  for (let i = 0; i < currentIteration; i++) {
    // crossbreed:
    //

    // check fitness:

    //
  }
}
main()

/**
 * Initializes the schedule with a random combination of people.
 *
 * No person can work twice in the same shift, so we sample without replacement.
 */
function initSchedule (people: Person[], numberOfDays: number, numberOfShiftsPerDay: number, numberOfPersonsPerShift: number): ShiftSchedule {
  const shiftSchedule: ShiftSchedule = []

  for (let i = 0; i < numberOfDays; i++) {
    const day: Day = []
    for (let j = 0; j < numberOfShiftsPerDay; j++) {
      const shift: Shift = []
      const currentPeople: Person[] = [...people]
      for (let k = 0; k < numberOfPersonsPerShift; k++) {
        const drawIndex: number = Math.floor(Math.random() * currentPeople.length)
        shift.push(currentPeople[drawIndex])
        currentPeople.splice(drawIndex, 1)
      }
      day.push(shift)
    }
    shiftSchedule.push(day)
  }

  return shiftSchedule
}

/**
 * Returns all shifts as an array.
 */
function extractShits (schedule: ShiftSchedule): Shift[] {
  return schedule.reduce((shifts: Shift[], day: Day): Shift[] => {
    return [...shifts, ...day]
  }, [])
}

/// RULES ///

function dontWorkWithTheSamePersonTwice (schedule: ShiftSchedule): number {
  const shifts = extractShits(schedule)
  console.log('shifts:', shifts)
  return 1
}

/**
 *
 */
function workOnlyOneShiftPerDay (schedule: ShiftSchedule): number {
  schedule.map((day: Day): number => {
    return day.map((shift: Shift): number => {
      return shift.map((person: Person): number => {
        let isInOtherShift: number = 0
        day.forEach((shift2: Shift) => {
          if (shift2.includes(person)) {
            isInOtherShift++
          }
        })
        return isInOtherShift
      }).reduce((acc: number, curr: number): number => acc + curr)
    }).reduce((acc: number, curr: number): number => acc + curr)
  })
  return 1
}

function evenSpreadOfWorkload (schedule: ShiftSchedule): number {
  return 1
}

function calculateFitness (schedule: ShiftSchedule): number {
  return rules.map((rule) => {
    return rule(schedule)
  }).reduce((acc: number, curr: number): number => {
    return acc * curr
  }, 1)
}
