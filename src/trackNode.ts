import type { Element } from 'hast';

export function trackNode(query: Record<string, string> = {}): Element[] {
  let result: Record<string, Record<string, string>> = {}
  let resultElement: Element[] = []
  Object.keys(query).forEach((key) => {
    let keyMatch = key.match(/track\[['"](\w+:?\w+)['"]\]/i)
    let queryKey = keyMatch ? keyMatch[1] : null
    if (queryKey) {
      let [lang, keyString] = queryKey.split(':')
      if (!result[lang]) result[lang] = {}
      const value = query[key]
      result[lang][keyString ?? "src"] = value
    }
  });

  Object.keys(result).forEach((lang) => {
    const track = result[lang]
    resultElement.push({
      type: 'element',
      tagName: 'track',
      properties: {
        kind: track.kind || 'subtitles',
        ...track
      },
      children: []
    })
  })
  return resultElement
}