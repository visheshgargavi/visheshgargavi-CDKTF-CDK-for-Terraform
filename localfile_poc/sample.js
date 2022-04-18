const fs = require('fs');

function writeToSCC() {
// api call to scc
const args = process.argv;
const str = args[2] || "";
fs.writeFileSync('scc.txt', str);
}

writeToSCC();
