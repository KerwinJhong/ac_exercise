function searchTitle (data, str) {
  const regex = RegExp(str, 'i')
  return data.filter(item => item.title.match(regex))
}
