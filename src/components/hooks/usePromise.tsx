import React, {ReactElement, ReactNode, useEffect, useState} from "react";

type PromiseReject = { type: 'rejected', value: Error }
type PromisePending = { type: 'pending' }
type PromiseFulfilled<T> = { type: 'fulfilled', value: T }
export type PromiseResult<T> = PromiseReject | PromisePending | PromiseFulfilled<T>

function usePromise<T>(f: () => Promise<T>): PromiseResult<T> {
    const [result, setResult] = useState<PromiseResult<T>>({type: 'pending'})
    useEffect(() => {
        void (async () => {
            try {
                setResult({type: 'pending'})
                setResult({type: 'fulfilled', value: await f()})
            } catch (e) {
                setResult({type: 'rejected', value: e})
            }
        })()
    }, [f])
    return result
}

export default usePromise

interface PromiseRendererProps<T> {
    promiseResult: PromiseResult<T>,
    onPending?: ReactNode,
    onRejected?: (e: Error) => ReactNode,
    onFulfilled?: (value: T) => ReactNode,
}

export function PromiseResultRenderer<T>(props: PromiseRendererProps<T>): ReactElement {
    const {promiseResult, onPending, onRejected, onFulfilled} = props
    if (promiseResult.type === 'pending') {
        return <>{onPending}</>
    }
    if (promiseResult.type === 'rejected') {
        return <>{onRejected ? onRejected(promiseResult.value) : undefined}</>
    }
    return <>{onFulfilled ? onFulfilled(promiseResult.value) : undefined}</>
}
