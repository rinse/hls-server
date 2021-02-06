import React, {ReactElement} from 'react'

export default function If(prop: React.PropsWithChildren<{condition: boolean}>) {
    if (prop.condition) {
        return prop.children as ReactElement
    }
    return null
}

