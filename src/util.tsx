export const shuffleArr = (arr:any[]) => {
    return [...arr].sort(() => Math.random() - 0.5)
}
