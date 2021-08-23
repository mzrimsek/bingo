export function getRandomElement<ListType>(list: Array<ListType>): ListType {
  const index = Math.floor(Math.random() * list.length);
  return list.splice(index, 1)[0];
}
