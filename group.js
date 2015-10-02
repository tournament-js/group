var group = function (numPlayers, groupSize) {
  var numGroups = Math.ceil(numPlayers / groupSize);
  groupSize = group.minimalGroupSize(numPlayers, groupSize, numGroups);
  var model = numGroups * groupSize;

  var groupList = [];
  for (var k = 0; k < numGroups; k += 1) {
    groupList[k] = [];
  }

  // iterations required to fill groups
  for (var j = 0; j < Math.ceil(groupSize / 2); j += 1) {
    // fill each group with pairs that sum to model + 1
    // until you are in the last iteration (in which may only want one of them)
    for (var g = 0; g < numGroups; g += 1) {
      var a = j*numGroups + g + 1;

      groupList[g].push(a);
      if (groupList[g].length < groupSize) {
        groupList[g].push(model + 1 - a);
      }
    }
  }

  // remove non-present players and sort by seeding number
  return groupList.map(function (g) {
    return g.sort(function (x, y) {
      return x - y;
    }).filter(function (p) {
      return p <= numPlayers;
    });
  });
};

group.fromArray = function (ary, groupSize) {
  return group(ary.length, groupSize).map(function (group) {
    return group.map(function (seed) {
      return ary[seed-1];
    });
  });
};


group.minimalGroupSize = function (numPlayers, groupSize) {
  var numGroups = arguments[2] || Math.ceil(numPlayers / groupSize);
  while (numGroups * groupSize - numPlayers >= numGroups) {
    groupSize -= 1; // while all groups have 1 free slot
  }
  return groupSize;
};

module.exports = group;
