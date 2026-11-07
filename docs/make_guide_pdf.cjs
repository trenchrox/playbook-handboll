/* Rendera docs/guide.html till docs/Playbook-guide.pdf.
 *
 *   npm i playwright            # engångsinstallation, bara för dokumentationen
 *   node docs/make_guide_pdf.cjs
 *
 * Skärmbilderna i guiden ligger inbäddade i guide.html (ritade i appen med ett
 * exempelmönster, inga riktiga uppgifter). Sidstorlek och marginaler kommer från
 * @page-reglerna i guide.html.
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const CHROMIUM = '/opt/pw-browsers/chromium';

(async () => {
  const src = path.join(HERE, 'guide.html');
  const out = path.join(HERE, 'Playbook-guide.pdf');
  const browser = await chromium.launch(
    fs.existsSync(CHROMIUM) ? { executablePath: CHROMIUM } : {});
  const page = await browser.newPage();
  await page.goto('file://' + src);
  await page.pdf({
    path: out, preferCSSPageSize: true, printBackground: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="width:100%;font:8pt Arial,sans-serif;color:#777;padding:0 15mm;display:flex;justify-content:space-between"><span>Playbook · guide · v1.2 beta</span><span><span class="pageNumber"></span></span></div>',
  });
  await browser.close();
  console.log('Skrev', out, fs.statSync(out).size, 'byte');
})();
