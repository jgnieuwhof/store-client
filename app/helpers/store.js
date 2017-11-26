
let today = new Date()
const newCutoff = today.setMonth(today.getMonth() - 2)

export const subFilters = {
  ring: [
    { name: `Size`, options: [`1-3`, `4-5`, `6-7`, `8-9`, `10+`] },
  ],
}

let matcher = ({ option, value }) => {
  if (!value) return false
  if (option.includes(`-`) || option.slice(-1) === `+`) {
    let parts = option.replace(`+`, ``).split(`-`)
    let x = parseFloat(value)
    let min = +parts[0], max = +parts[1]
    return (!min || x >= min) && (!max || x < (max + 1))
  }
  return true
}

let truthy = x => !!x

export let applyFilters = ({
  products, currentFilter, currentSubFilter: sub,
}) => (
  products.
    filter(p => (
      [
        [ !currentFilter,
          p.type === currentFilter,
          currentFilter === `new` && p.createdAt > newCutoff,
        ].some(truthy),
        !sub || matcher({ option: sub.option, value: p[sub.name] }),
      ].every(truthy)
    ))
)
