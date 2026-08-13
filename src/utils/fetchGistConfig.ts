const gistUrl = 'https://gist.github.com/Jawad9x/823d91ac3b7c8c09a9dfe6d1bfbb06c3'

function extractGistId(url: string) {
  const trimmedUrl = url.trim().replace(/\/$/, '')
  const segments = trimmedUrl.split('/')
  return segments[segments.length - 1]
}

export async function fetchGistConfig() {
  const gistId = extractGistId(gistUrl)
  const response = await fetch(`https://api.github.com/gists/${gistId}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch gist config: ${response.status}`)
  }

  const gist = await response.json()
  const gistFiles = Object.values(gist.files ?? {}) as Array<{
    filename?: string
    content?: string
  }>

  const configFile =
    gistFiles.find((file) => file.filename?.endsWith('.json')) ?? gistFiles[0]

  if (!configFile?.content) {
    throw new Error('No gist config file content found')
  }

  return JSON.parse(configFile.content)
}

