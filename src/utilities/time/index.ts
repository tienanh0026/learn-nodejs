function compareTimeWithoutSeconds(targetDateString: string): 'now' | 'past' | 'future' {
  const targetDate = new Date(targetDateString)

  const now = new Date()

  // Strip seconds and milliseconds from both dates
  targetDate.setSeconds(0, 0)
  now.setSeconds(0, 0)
  console.log(now.toISOString())
  console.log(targetDate.toISOString())

  if (targetDate.getTime() === now.getTime()) {
    return 'now'
  } else if (targetDate.getTime() > now.getTime()) {
    return 'future'
  } else {
    return 'past'
  }
}

export { compareTimeWithoutSeconds }
