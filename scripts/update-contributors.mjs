#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const readmePath = resolve(root, "README.md");

const repo =
         process.env.GITHUB_REPOSITORY ||
         "lukarthik67/satellite-land-cover-classification";

const token = process.env.GITHUB_TOKEN;

const MARKER_START = "<!-- CONTRIBUTORS_START -->";
const MARKER_END = "<!-- CONTRIBUTORS_END -->";

// Fetch contributors
async function fetchContributors() {
         const headers = {
                  "User-Agent": "satellite-lulc-contributors-bot",
                  Accept: "application/vnd.github+json",
         };

         if (token) {
                  headers["Authorization"] = `Bearer ${token}`;
         }

         const all = [];
         let page = 1;

         while (true) {
                  const response = await fetch(
                           `https://api.github.com/repos/${repo}/contributors?per_page=100&page=${page}`,
                           { headers }
                  );

                  if (!response.ok) {
                           throw new Error(
                                    `GitHub API ${response.status}: ${response.statusText}`
                           );
                  }

                  const batch = await response.json();

                  if (!Array.isArray(batch) || batch.length === 0) {
                           break;
                  }

                  // Ignore bots
                  all.push(
                           ...batch.filter(
                                    (contributor) =>
                                             contributor.type !== "Bot" &&
                                             !contributor.login.endsWith("[bot]")
                           )
                  );

                  if (batch.length < 100) {
                           break;
                  }

                  page++;
         }

         return all;
}

// Build contributor cards
function buildTable(contributors) {
         const COLS = 6;

         const cells = contributors.map((contributor) => {
                  const commits =
                           contributor.contributions === 1
                                    ? "1 commit"
                                    : `${contributor.contributions} commits`;

                  return `
    <td align="center" valign="top" width="120">
      <a href="https://github.com/${contributor.login}">
        <img
          src="${contributor.avatar_url}"
          width="80"
          height="80"
          alt="${contributor.login}"
          style="border-radius:50%"
        />
        <br />
        <sub><b>${contributor.login}</b></sub>
      </a>
      <br />
      <sub>🔨 ${commits}</sub>
    </td>`;
         });

         const rows = [];

         for (let i = 0; i < cells.length; i += COLS) {
                  rows.push(
                           `  <tr>\n${cells.slice(i, i + COLS).join("\n")}\n  </tr>`
                  );
         }

         return `<table>\n${rows.join("\n")}\n</table>`;
}

// Update README
const contributors = await fetchContributors();

console.log(
         `Fetched ${contributors.length} contributor(s) from ${repo}`
);

const table = buildTable(contributors);

const block = `${MARKER_START}\n${table}\n${MARKER_END}`;

let readme = readFileSync(readmePath, "utf8");

const startIndex = readme.indexOf(MARKER_START);
const endIndex = readme.indexOf(MARKER_END);

if (
         startIndex === -1 ||
         endIndex === -1 ||
         endIndex <= startIndex
) {
         console.error(
                  "Could not find contributor markers in README.md."
         );

         console.error(`
Add these lines to README.md:

${MARKER_START}
${MARKER_END}
`);

         process.exit(1);
}

const before = readme.slice(0, startIndex);
const after = readme.slice(endIndex + MARKER_END.length);

const updated = before + block + after;

if (updated === readme) {
         console.log("Contributors section is already up to date.");
} else {
         writeFileSync(readmePath, updated, "utf8");

         console.log(
                  `Done — ${contributors.length} contributor(s) written to README.md.`
         );
} update - contributors.mjs