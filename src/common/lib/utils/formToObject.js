export default function(formData) {
  const obj = {}
  formData = new FormData(formData)
  for (var pair of formData.entries()) {
    obj[pair[0]] = pair[1]
  }
  return obj
}
