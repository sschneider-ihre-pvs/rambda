import { _isArray } from './_internals/_isArray'

async function mapAsyncFn(fn, arr){
  if (_isArray(arr)){
    const willReturn = []
    let i = 0
    for (const a of arr){
      willReturn.push(await fn(a, i++))
    }

    return willReturn
  }

  const willReturn = {}
  for (const i in arr){
    willReturn[ i ] = await fn(arr[ i ], Number(i))
  }

  return willReturn
}

export function mapAsync(fn, arr){
  if (arguments.length === 1){
    return async holder => mapAsyncFn(fn, holder)
  }

  return new Promise((resolve, reject) => {
    mapAsyncFn(fn, arr).then(resolve)
      .catch(reject)
  })
}
