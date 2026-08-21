import createL10ns from 'basic-l10n'
import browserLanguage from 'in-browser-language'

import langs from 'lif-explorer/lang/index';

// use the plural form as the zero form
Object.entries(langs).forEach(([ lang_id, strs ]) =>
  Object.entries(strs).forEach(([ str, translation ]) =>
    Array.isArray(translation) && translation.unshift(translation[1])
  )
)

const _default = createL10ns(langs, { debug: console.error })
export default _default

Object.entries(_default).forEach(([ lang_id, lang_t ]) =>  {
  lang_t.lang_id = lang_id
  lang_t.langs = _default
})

export const defaultLang = process.browser ? browserLanguage.pick(Object.keys(_default), 'en') : 'en'
