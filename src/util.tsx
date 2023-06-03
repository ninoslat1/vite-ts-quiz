export const shuffleArr = (arr:any[]) => {
    return [...arr].sort(() => Math.random() - 0.5)
}

export const reloadPage = ():void => {
    window.location.reload()
  }
