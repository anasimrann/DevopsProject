const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');
const readline = require('readline');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:5500/index.html');

    // Enter name in input field and click search button
    const nameInput = await driver.findElement(By.id('name'));
    await nameInput.sendKeys('John Doe');
    const searchButton = await driver.findElement(By.id('button1'));
    await searchButton.click();

    // Wait for results to be displayed
    const resultsTable = await driver.findElement(By.id('results'));
    await driver.wait(until.elementLocated(By.css('#results tbody tr')), 5000);

    // Verify that table row and columns match expected data
    const rows = await resultsTable.findElements(By.css('tbody tr'));
    assert(rows.length > 0, 'Expected number of rows to be greater than 0');

    const columns = await rows[0].findElements(By.css('td'));
    assert.equal(await columns[0].getText(), 'John Doe', 'Name does not match expected value');
    assert.equal(await columns[1].getText(), 'Manager', 'Designation does not match expected value');
    assert.equal(await columns[2].getText(), 100000, 'Salary does not match expected value');
    assert.equal(await columns[3].getText(), 'Team Management, Strategic Planning', 'Roles do not match expected value');
    assert.equal(await columns[4].getText(), '35', 'Age does not match expected value');


     // Delay for 3 seconds before running the second test case
     await new Promise((resolve) => setTimeout(resolve, 3000));
    const fetchAllButton = await driver.findElement(By.id('button2'));
    await fetchAllButton.click();
    await driver.wait(until.elementLocated(By.css('#results tbody tr')), 5000);
    const fetchedRows = await driver.findElements(By.css('#results tbody tr'));
    assert(fetchedRows.length > 0,'Expected number of rows to be greater than 0');

    console.log('Test passed');

    // Wait for user input before closing the browser window
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    await new Promise(resolve => rl.question('Press any key to exit...', resolve));
  } finally {
    await driver.quit();
  }
})();

