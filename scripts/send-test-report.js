const fs = require('fs')
const nodemailer = require('nodemailer')

const results = JSON.parse(fs.readFileSync('test-results/results.json', 'utf8'))

const { expected: passed, unexpected: failed, flaky, skipped } = results.stats
const total = passed + failed + flaky + skipped

function collectSpecs(suites) {
  return suites.flatMap((suite) => [
    ...suite.specs,
    ...collectSpecs(suite.suites || []),
  ])
}

const allSpecs = collectSpecs(results.suites)
const failedTests = allSpecs.filter((spec) => !spec.ok)

const runUrl = `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`

const failedList = failedTests
  .map((spec) => {
    const attachments = spec.tests
      .flatMap((t) =>
        t.results
          .flatMap((r) => r.attachments || [])
          .filter((a) => a.name === 'screenshot' || a.name === 'trace')
          .map((a) => `<li>${a.name}: ${a.path}</li>`),
      )
      .join('')
    return `<li><strong>${spec.title}</strong><ul>${attachments || '<li>No attachments</li>'}</ul></li>`
  })
  .join('')

const html = `
<h2>ParaBank Test Report</h2>
<p><strong>Run:</strong> <a href="${runUrl}">${process.env.GITHUB_RUN_ID}</a></p>
<ul>
  <li><span style="color: #22c55e; font-weight: bold;">Passed: ${passed}</span></li>
  <li><span style="color: #ef4444; font-weight: bold;">Failed: ${failed}</span></li>
  <li><span style="color: #f97316; font-weight: bold;">Flaky (passed after retry): ${flaky}</span></li>
  <li><span style="color: #3b82f6; font-weight: bold;">Total: ${total}</span></li>
</ul>
${failed > 0 ? `<h3>Failed Tests</h3><ul>${failedList}</ul>` : '<p>All tests passed</p>'}
<p><a href="${runUrl}">View full report and artifacts →</a></p>
`

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

transporter
  .sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.EMAIL_RECIPIENTS,
    subject: `Playwright Report — ${failed > 0 ? `${failed} failed` : 'All passed'} (${process.env.GITHUB_REF_NAME})`,
    html,
  })
  .then(() => console.log('Email sent'))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
