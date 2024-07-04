export function getTimes(customizations, product) {
  let times = 0;
  for (const item of customizations) {
    if (item.product === product.nombre) {
      times++;
    }
  }
  return times;
}

export function getAllIndexes(customizations, product) {
  let indexes = [];
  customizations.map((item, index) => {
    if(item.product === product.nombre){
        indexes.push(index)
    }
  })
  return indexes;
}
