import React, {ReactElement, ReactNode, useEffect, useState} from "react";

export type PromiseResult<T>
  = { type: 'rejected', value: Error }
  | { type: 'pending' }
  | { type: 'fulfilled', value: T }

export function usePromise<T>(f: () => Promise<T>): PromiseResult<T> {
  const [result, setResult] = useState<PromiseResult<T>>({type: 'pending'})
  useEffect(() => {
    void (async () => {
      try {
        setResult({type: 'pending'})
        setResult({type: 'fulfilled', value: await f()})
      } catch (e) {
        if (e instanceof Error) {
          setResult({type: 'rejected', value: e})
        } else {
          setResult({type: 'rejected', value: new Error(`$e`)})
        }
      }
    })()
  }, [f])
  return result
}

interface PromiseRendererProps<T> {
  result: PromiseResult<T>,
  onPending?: () => ReactNode,
  onRejected?: (e: Error) => ReactNode,
  onFulfilled?: (value: T) => ReactNode,
}

export function PromiseResultRenderer<T>(props: PromiseRendererProps<T>): ReactElement {
  const {result, onPending, onRejected, onFulfilled} = props
  switch (result.type) {
    case 'pending':
      return <>{onPending ? onPending() : undefined}</>
    case 'rejected':
      return <>{onRejected ? onRejected(result.value) : undefined}</>
    case 'fulfilled':
      return <>{onFulfilled ? onFulfilled(result.value) : undefined}</>
  }
}
