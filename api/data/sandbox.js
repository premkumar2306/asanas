var fs = require("fs");
const sample = require("./list.json");

const map = new Map();
for (let pose of sample) {
  const pose_meta = pose.pose_meta;
  for (let meta of pose_meta) {
    if (map.has(meta)) {
      map.set(meta, map.get(meta) + 1);
    } else {
      map.set(meta, 1);
    }
  }
}

console.log(map);
const getAsanasByCategory = function (category) {
  const asanas = sample.filter((asana) => asana.pose_meta.includes(category));
  return asanas;
};
console.log(getAsanasByCategory("Twist"));
