
export const showSnack = (message, type='default') => {
    const ran = Math.floor(Math.random() * 10001);
    const snackid = `Snack${ran.toString()}`
    const div = document.createElement("div")
    div.id = snackid;
    div.className = `snackbar ${type}`
    const p = document.createElement("p")
    p.className = 'snack-message'
    p.innerHTML = message
    div.append(p)
    document.getElementById('snack').append(div)
    // console.log(message, type, snackid)
    setTimeout(() => {
      try{
        document.getElementById(snackid).remove()
      }
      catch {
        console.log('')
      }
    }, 6500);
  }