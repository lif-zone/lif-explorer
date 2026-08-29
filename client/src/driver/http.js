import { Observable as O } from '../rxjs'

export default function makeHTTPDriver(){
  return function httpDriver(req$){
    const allRes$$ = O.from(req$).map(req => {
      const r$ = new O(observer => {
        const init = { method: req.method || 'GET' }
        if (req.send)
          init.body = req.send
        if (req.type)
          init.headers = {'Content-Type': req.type}
        fetch(req.url, init)
          .then(async res => {
            const text = await res.text()
            let body = null
            try { body = JSON.parse(text) } catch(e){}
            const result = { ok: res.ok, status: res.status, text, body,
              request: req, req, headers: Object.fromEntries(res.headers) }
            if (!res.ok){
              const err = new Error(`HTTP ${res.status}`)
              err.response = result
              observer.error(err)
            } else {
              observer.next(result)
              observer.complete()
            }
          })
          .catch(e => { e.request = req; observer.error(e) })
      })
      r$.request = req
      return r$
    }).share()

    return {
      select(cat){
        return cat
          ? allRes$$.filter(r$ => r$.request.category==cat)
          : allRes$$
      }
    }
  }
}
