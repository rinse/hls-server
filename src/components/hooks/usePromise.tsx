import React, {ReactElement, ReactNode, useEffect, useState} from "react";

export type PromiseResult<T>
    = {type: 'rejected', value: Error}
    | {type: 'pending'}
    | {type: 'fulfilled', value: T}

type DispatchReload = () => void

function usePromise<T>(f: () => Promise<T>): {result: PromiseResult<T>, reload: DispatchReload} {
    const [result, setResult] = useState<PromiseResult<T>>({type: 'pending'})
    const [reloadKey, setReloadKey] = useState({})
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
    }, [f, reloadKey])
    const reload = () => setReloadKey({})
    return {result, reload}
}

export default usePromise

interface PromiseRendererProps<T> {
    promiseResult: PromiseResult<T>,
    onPending?: () => ReactNode,
    onRejected?: (e: Error) => ReactNode,
    onFulfilled?: (value: T) => ReactNode,
}

export function PromiseResultRenderer<T>(props: PromiseRendererProps<T>): ReactElement {
    const {promiseResult, onPending, onRejected, onFulfilled} = props
    switch (promiseResult.type) {
        case 'pending':
            return <>{onPending ? onPending() : undefined}</>
        case 'rejected':
            return <>{onRejected ? onRejected(promiseResult.value) : undefined}</>
        case 'fulfilled':
            return <>{onFulfilled ? onFulfilled(promiseResult.value) : undefined}</>
    }
}

type PromiseContainerProps<T> = {asyncFunction: () => Promise<T>}
    & Omit<PromiseRendererProps<T>, 'promiseResult'>

export function PromiseContainer<T>(props: PromiseContainerProps<T>) {
    const {asyncFunction, ...others} = props
    const {result} = usePromise(asyncFunction)
    return <PromiseResultRenderer promiseResult={result} {...others} />
}
