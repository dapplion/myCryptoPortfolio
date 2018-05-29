
function getBalance(account) {
  const url = 'https://api.etherscan.io/api?module=account&action=balance&'
    +'address='+account+'&tag=latest&apikey=giveth'
  return fetch(url)
  .then(res => res.json())
  .then(res => {
    console.log('RES',res)
    if (res.status == 1) {
      return res.result / (10 ** 18)
    } else {
      throw Error('Error fetching balance')
    }
  })
}

export default {
  getBalance
}
