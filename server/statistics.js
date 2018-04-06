module.exports = function (seq) {
  const countInstances = (regex) => (seq.match(regex) || []).length
  const calculatePercentage = (regex) => parseFloat(100 * countInstances(regex) / seq.length).toFixed(2)

  let A = calculatePercentage(/A/g)
  let C = calculatePercentage(/C/g)
  let G = calculatePercentage(/G/g)
  let T = calculatePercentage(/T/g)

  return {A, C, G, T}
}
