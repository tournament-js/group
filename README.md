# Group
[![npm status](http://img.shields.io/npm/v/group.svg)](https://www.npmjs.org/package/group)
[![build status](https://secure.travis-ci.org/clux/group.svg)](http://travis-ci.org/clux/group)
[![dependency status](https://david-dm.org/clux/group.svg)](https://david-dm.org/clux/group)
[![coverage status](http://img.shields.io/coveralls/clux/group.svg)](https://coveralls.io/r/clux/group)

A simple pooling algorithm for group stages, ffa style tournaments or anything else that benefits from having seeds/weighted numbers split into fair groups.

## Usage
Simply give it the number of players and an approximate group size (this may be reduced if all groups can't be filled), and it will return the fairest groups.

```js
var group = require('group');
group(16, 4);
[ [ 1, 5, 12, 16 ],
  [ 2, 6, 11, 15 ],
  [ 3, 7, 10, 14 ],
  [ 4, 8, 9, 13 ] ]

group(25, 5);
[ [ 1, 6, 11, 20, 25 ],
  [ 2, 7, 12, 19, 24 ],
  [ 3, 8, 13, 18, 23 ],
  [ 4, 9, 14 17, 22 ],
  [ 5, 10, 15, 16, 21 ] ]
```

## Fairness properties
Best when two properties are satisfied:

- `numPlayers === groupSize*numGroups`
- `groupSize % 2 === 0`

You should always strive to satisfy the first condition.

If the `groupSize` is not even, then we cannot match up weighted pairs and the sum of seeds per group will differ by up to `numGroups`.

If the `groupSize` is even, then the sum of seeds per groups are equal across all groups.

## Minimal group size
You can check what your minimal group size will be by passing in the number of groups you want to split the players over:

```js
group.minimalGroupSize(16, 4); // 4
group.minimalGroupSize(25, 5); // 5
group.minimalGroupSize(8, 5); // 4
group.minimalGroupSize(numPlayers, groupSize); // general
```

## Partitioning Helper
If you have a pre-sorted array of seeded players, this can be passed to `group.fromArray`:

```js
group.fromArray(['a','b','c','d','e','f','g','h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'], 4)
[ [ 'a', 'e', 'l', 'p' ],
  [ 'b', 'f', 'k', 'o' ],
  [ 'c', 'g', 'j', 'n' ],
  [ 'd', 'h', 'i', 'm' ] ]
```

## License
MIT-Licensed. See LICENSE file for details.
