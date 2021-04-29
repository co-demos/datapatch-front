export function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsText(file)
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = reject
  })
}

export async function processFile(file) {
  try {
    let result = await readFileAsync(file)
    return result
  } catch (err) {
    console.log(err)
  }
}
