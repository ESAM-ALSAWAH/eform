export const clsx = (...classes: (string | null | undefined)[]) => {
    return classes.filter(Boolean).join(' ')
}