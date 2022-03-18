#!/bin/bash

echo 'Creating the coverage files'
deno test --allow-all --unstable --import-map './test.json' --coverage=ut/lcov ut/
echo 'Creating the lcov file'
deno coverage ut/lcov --lcov > ut/cov_profile.lcov --exclude=ajv.min.js --exclude=/modules/test/ --exclude=/ut/
echo 'Generate Html'
genhtml -o ut/coverage ut/cov_profile.lcov
echo 'Delete Unnecessary files'
rm ut/cov_profile.lcov
rm -r ut/lcov