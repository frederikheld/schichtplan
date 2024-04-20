/// INPUT DATA ///

const coreTeam: Person[] = ['Eva', 'Steffi', 'Luca', 'Desi', 'Fred', 'Rebecca']
const numberOfDays: number = 7
const numberOfShiftsPerDay: number = 2
const numberOfPeoplePerShift: number = 3

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
  const shiftSchedule: ShiftSchedule = initSchedule(coreTeam, numberOfDays, numberOfShiftsPerDay, numberOfPeoplePerShift)

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
 */
function initSchedule (people: Person[], numberOfDays: number, numberOfShiftsPerDay: number, numberOfPeoplePerShift: number): ShiftSchedule {
  const shiftSchedule: ShiftSchedule = []

  for (let i = 0; i < numberOfDays; i++) {
    const day: Day = []
    for (let j = 0; j < numberOfShiftsPerDay; j++) {
      const shift: Shift = []
      for (let k = 0; k < numberOfPeoplePerShift; k++) {
        shift.push(people[Math.floor(Math.random() * people.length)])
      }
      day.push(shift)
    }
    shiftSchedule.push(day)
  }

  return shiftSchedule
}

/// RULES ///

function dontWorkWithTheSamePersonTwice (schedule: ShiftSchedule): number {
  return 1
}

function workOnlyOneShiftPerDay (schedule: ShiftSchedule): number {
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
