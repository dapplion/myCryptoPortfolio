import { createSelector } from "reselect";

const getVisibilityFilter = (state, props) =>
  state.todoLists[props.listId].visibilityFilter;

const getTodos = (state, props) => state.todoLists[props.listId].todos;

const getAccounts = state => state.accounts;
const getRates = state => state.rates;
const getTargets = state => state.targets;

const getCoinBalances = createSelector([getAccounts], accounts => {
  const coins = {};
  const accountList = accounts ? Object.values(accounts) : [];
  accountList.forEach(account => {
    const balances = account.balances;
    if (balances && typeof balances === "object") {
      Object.keys(balances).forEach(coin => {
        if (!coins[coin])
          coins[coin] = {
            name: coin,
            total: 0
          };
        coins[coin].total += parseInt(balances[coin], 10);
      });
    }
  });
  return coins;
});

const getCoinBalancesWithShares = createSelector(
  [getCoinBalances, getRates],
  (coins, rates) => {
    let total = 0;
    // Loop first to sum the total
    Object.values(coins).forEach(coin => {
      if (rates[coin.name]) {
        coin.totalRef = rates[coin.name].ETH * coin.total;
        total += coin.totalRef;
        coin.totalRef = coin.totalRef.toFixed(4);
      }
    });
    // Then loop to compute shares
    Object.values(coins).forEach(coin => {
      if (rates[coin.name]) {
        coin.share = ((100 * coin.totalRef) / total).toFixed(2);
      }
    });
    return coins;
  }
);

export const getPortfolio = createSelector(
  [getCoinBalancesWithShares, getTargets],
  (coins, targets) => {
    return Object.values(coins).map(coin => {
      const target = targets[coin.name];
      const diff =
        coin.share && target ? (coin.share - target).toFixed(2) : null;
      return {
        name: coin.name,
        total: coin.total,
        totalRef: coin.totalRef,
        share: coin.share,
        target,
        diff,
        diffColor: diff ? (diff > 0 ? "green" : "red") : "inherit"
      };
    });
  }
);
