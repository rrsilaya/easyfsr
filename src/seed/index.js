const fs = require('fs-extra');
const { exec } = require('child_process');

/**
 * This copies seed files to public folder.
 */
fs.copy(`${__dirname}/uploads`, 'public/uploads/', err => {
  if (err) console.log(err);
});

// Populate with seed data
exec('mysql -u root -p < ./src/seed/data.sql', err => {
  if (err) console.log(err);
});
