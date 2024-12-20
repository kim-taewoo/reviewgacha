function getDateForm(value: string | Date) {
  const date = new Date(value)

  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")

  const hour = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")

  return `${year}.${month}.${day} ${hour}:${minutes}`
}

export default getDateForm
