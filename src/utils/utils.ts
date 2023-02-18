export function sleep(milliSec: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, milliSec)
    })
}
