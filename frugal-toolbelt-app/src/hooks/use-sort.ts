import { useState } from "react";

const getComparator = (
  sortKey: string,
  isAscending: boolean
): ((a: Record<string, any>, b: Record<string, any>) => number) => {
  return (a: Record<string, any>, b: Record<string, any>): number => {
    let i = 0;
    const sortKeys = sortKey.toString().split(".");

    do {
      a = a ? a[sortKeys[i]] : a;
      b = b ? b[sortKeys[i]] : b;
      i++;
    } while (i < sortKeys.length);

    const firstProp = a;
    const secondProp = b;

    if (!firstProp) return 1;
    if (!secondProp) return -1;

    let comparator = 0;

    if (firstProp > secondProp) comparator = 1;
    else if (firstProp < secondProp) comparator = -1;

    const res = isAscending ? comparator : comparator * -1;

    return res;
  };
};

//TODO: Need to write some tests around sorting functionality
// Test scenarios:
// 1. Nested objects with values of different lengths
// 2. Test nullable objects
// 3. Nested objects with different types: string vs number

const useSort = (unsortedArray: Array<any>, sortKey: string): any => {
  const [state, setState] = useState({
    isAscending: true,
    sortKey,
  });

  const comparator = getComparator(state.sortKey, state.isAscending);
  const sortedData = unsortedArray.sort(comparator);

  return {
    ...state,
    sortedData,
    toggleAscending: (): void => {
      setState((state) => ({
        ...state,
        isAscending: !state.isAscending,
      }));
    },
    setSortKey: (sortKey: string): void =>
      setState((state) => ({ ...state, sortKey })),
  };
};

export default useSort;
