exports.defineTags = dictionary => {
  dictionary.defineTag('flow', {
    onTagged: doclet => {
      doclet.flow = true
    },
  })
}
