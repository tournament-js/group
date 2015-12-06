var $ = require('interlude')
  , group = require('..')
  , test = require('bandage');

test('group', function *(t) {
  var nums = $.range(100)
    , gsizes = $.range(16);

  nums.forEach(function (np) {
    gsizes.forEach(function (s) {
      var grps = group(np, s);
      var maxsize = $.maximum($.pluck('length', grps));
      t.ok(maxsize <= s, "group sizes <= input size");

      var pls = $.flatten(grps);
      t.equal(pls.length, np, "right number of players included");
      t.deepEqual($.difference(pls, $.range(np)), []
        , "players included once per group");

      if (np % s === 0) {
        var gsums = grps.map($.sum);
        // sum of seeds must differ by at most number of groups in full groups
        t.ok($.minimum(gsums) <= $.maximum(gsums) + grps.length
          , "sum of seeds in full groups difference");

        if ($.even(s)) {
          // a group is perfect if groups are full and only filled with pairs!
          t.equal($.minimum(gsums), $.maximum(gsums)
            , "sum of seeds zero difference in perfect groups");
        }
      }

      if (maxsize < s) {
        // group size model was reduced as all groups non-full, so:
        // calling group with the gs reduced to maxsize should produce same output
        var grpsClone = group(np, maxsize);
        var errModel = np + " players, groupsize " + s + " reduced to " +  maxsize;
        t.deepEqual(grps, grpsClone, "reduced model deterministically: " + errModel);
        t.equal(group.minimalGroupSize(np, s), maxsize, "reduce: " + s);
      }
    });
  });
});

test('fromArray', function *(t) {
  var seeds = ['a','b','c','d','e','f','g','h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'];
  t.deepEqual(group.fromArray(seeds, 4), [
    [ 'a', 'e', 'l', 'p' ],
    [ 'b', 'f', 'k', 'o' ],
    [ 'c', 'g', 'j', 'n' ],
    [ 'd', 'h', 'i', 'm' ]
  ], 'array helper works');
});
