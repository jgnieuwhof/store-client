
let today = new Date()
const newCutoff = today.setMonth(today.getMonth() - 2)

export const subFilters = {
  ring: [
    { name: `Size`, options: [`1-3`, `4-5`, `6-7`, `8-9`, `10+`] },
  ],
}

let matcher = ({ option, value }) => {
  if (!value) return false
  let parts = option.replace(`+`, ``).split(`-`)
  if (parts.length === 2) {
    let x = parseFloat(value)
    return x >= +parts[0] && x < (+parts[1] + 1)
  }
  return true
}

let truthy = x => !!x

export let applyFilters = ({ products, loaded, currentFilter, currentSubFilter: sub }) => (
  products.filter(p => (
    [ loaded[p.id],
      [ !currentFilter,
        p.type === currentFilter,
        currentFilter === `new` && p.createdAt > newCutoff,
      ].some(truthy),
      [ !sub,
        sub && matcher({ option: sub.option, value: p[sub.name] }),
      ].some(truthy),
    ].every(truthy)
  ))
)
