export function sleep(milliSec: number) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milliSec)
    })
}
