---
title: "Nepal Land Converter: Ropani, Aana, Bigha, Kattha to Sq Ft"
slug: land-converter-nepal
description: Convert Ropani, Aana, Paisa, Daam, Bigha, Kattha and Dhur into
  square feet, square metres, acres and hectares using our free Nepal land
  converter.
category: Content
date: 2026-11-27
published: true
search_strategy:
  primary_keyword: Land Converter Nepal
  secondary_keywords: Nepali land converter, Ropani to sq ft, Aana to sq ft, Bigha
    to Kattha, Kattha to sq ft, Dhur to sq ft, Nepal land measurement
  search_intent: Transactional
  primary_question: How do I convert Nepal land measurement units such as Ropani,
    Aana, Bigha, Kattha and Dhur?
ai_content:
  direct_answer: Nepal commonly uses two traditional land measurement systems. The
    Hill system uses Ropani, Aana, Paisa and Daam, while the Terai system uses
    Bigha, Kattha and Dhur. One Ropani equals 5,476 square feet, and one Bigha
    equals 72,900 square feet. These units can be converted into square feet and
    square metres using their standard conversion factors.
  key_questions: |-
    How many square feet are in one Ropani?



    How many Aana make one Ropani?



    How many square feet are in one Aana?



    How many Paisa make one Aana?



    How many Daam make one Paisa?



    How many Kattha make one Bigha?



    How many Dhur make one Kattha?



    How many square feet are in one Kattha?



    How many square feet are in one Dhur?



    How do you convert Ropani into Kattha?



    How do you convert Bigha into Ropani?



    How do you convert square feet into Ropani?



    What is the difference between the Hill and Terai land measurement systems?



    How do you read Ropani–Aana–Paisa–Daam figures on a Lalpurja?



    Is an online land converter suitable for legal land transactions?
  key_entities: |-
    Ropani



    Aana



    Paisa



    Daam



    Bigha



    Kattha



    Dhur



    Square feet



    Square metres



    Acre



    Hectare



    Land Revenue Office



    Land ownership certificate (Lalpurja)



    Land surveyor (Amin)
  key_facts: |-
    1 Ropani = 16 Aana = 64 Paisa = 256 Daam.



    1 Bigha = 20 Kattha = 400 Dhur.



    1 Ropani = 5,476 square feet.



    1 Bigha = 72,900 square feet.



    1 Kattha = 3,645 square feet.



    1 Aana = 342.25 square feet.



    1 square foot = 0.09290304 square metres.



    1 Acre = 43,560 square feet.



    1 Hectare = 10,000 square metres.
sources:
  last_verified: 2026-11-27
---
# Nepal Land Converter: Ropani, Aana, Bigha, Kattha to Sq Ft

Land measurement in Nepal uses traditional units such as Ropani, Aana, Paisa, Daam, Bigha, Kattha and Dhur. These units are commonly encountered when buying, selling, comparing or checking land areas.

However, converting between the Hill and Terai measurement systems can be confusing, particularly when a land record uses one unit and a property listing uses another.

Our **Nepal Land Converter** helps you calculate land area across both traditional systems. You can convert Ropani, Aana, Paisa, Daam, Bigha, Kattha and Dhur into square feet, square metres, acres and hectares.

```

<div id="nepal-land-converter">
  <style>
    #nepal-land-converter {
      --nlc-blue: #25479D;
      --nlc-red: #ED2D2A;
      --nlc-border: #dce3ef;
      --nlc-bg: #f5f7fb;
      font-family: Arial, Helvetica, sans-serif;
      color: #202938;
      width: 100%;
      max-width: 100%;
      margin: 20px auto;
      box-sizing: border-box;
    }

    #nepal-land-converter * {
      box-sizing: border-box;
    }

    #nepal-land-converter .nlc-card {
      background: #fff;
      border: 1px solid var(--nlc-border);
      border-radius: 14px;
      padding: 24px;
      box-shadow: 0 4px 18px rgba(25, 50, 90, 0.06);
    }

    #nepal-land-converter .nlc-heading {
      text-align: center;
      margin-bottom: 22px;
    }

    #nepal-land-converter .nlc-heading h2 {
      color: var(--nlc-blue);
      font-size: 27px;
      margin: 0 0 9px;
      line-height: 1.3;
    }

    #nepal-land-converter .nlc-heading p {
      color: #657187;
      font-size: 14px;
      line-height: 1.6;
      margin: 0;
    }

    #nepal-land-converter .nlc-section-title {
      font-size: 17px;
      color: var(--nlc-blue);
      margin: 0 0 15px;
      font-weight: 700;
    }

    #nepal-land-converter .nlc-group {
      background: var(--nlc-bg);
      border: 1px solid var(--nlc-border);
      border-radius: 11px;
      padding: 17px;
      margin-bottom: 17px;
    }

    #nepal-land-converter .nlc-fields {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 12px;
    }

    #nepal-land-converter .nlc-field label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 7px;
      color: #39465a;
    }

    #nepal-land-converter input {
      width: 100%;
      min-width: 0;
      height: 43px;
      padding: 9px 10px;
      border: 1px solid #cbd4e2;
      border-radius: 7px;
      background: #fff;
      color: #202938;
      font-size: 15px;
      outline: none;
    }

    #nepal-land-converter input:focus {
      border-color: var(--nlc-blue);
      box-shadow: 0 0 0 3px rgba(37, 71, 157, 0.10);
    }

    #nepal-land-converter input[aria-invalid="true"] {
      border-color: var(--nlc-red);
    }

    #nepal-land-converter .nlc-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
      margin: 21px 0;
    }

    #nepal-land-converter button {
      border: 0;
      border-radius: 7px;
      padding: 12px 23px;
      min-height: 43px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
    }

    #nepal-land-converter .nlc-clear {
      background: #e9edf5;
      color: #344158;
    }

    #nepal-land-converter .nlc-clear:hover {
      background: #dce3ef;
    }

    #nepal-land-converter .nlc-results {
      border: 1px solid #d6e0f3;
      border-radius: 11px;
      overflow: hidden;
      margin-top: 22px;
    }

    #nepal-land-converter .nlc-results-heading {
      background: var(--nlc-blue);
      color: #fff;
      padding: 15px 18px;
      font-size: 17px;
      font-weight: 700;
    }

    #nepal-land-converter .nlc-results-body {
      padding: 17px;
      background: #fff;
    }

    #nepal-land-converter .nlc-result-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 15px;
      padding: 12px 4px;
      border-bottom: 1px solid #edf0f5;
      font-size: 14px;
    }

    #nepal-land-converter .nlc-result-row:last-child {
      border-bottom: 0;
    }

    #nepal-land-converter .nlc-result-label {
      color: #58657a;
      font-weight: 600;
    }

    #nepal-land-converter .nlc-result-value {
      color: var(--nlc-blue);
      font-weight: 700;
      text-align: right;
      overflow-wrap: anywhere;
    }

    #nepal-land-converter .nlc-breakdown {
      background: #f5f7fb;
      border-radius: 8px;
      padding: 13px;
      margin-top: 14px;
      font-size: 14px;
      line-height: 1.8;
    }

    #nepal-land-converter .nlc-breakdown strong {
      color: var(--nlc-blue);
    }

    #nepal-land-converter .nlc-status {
      min-height: 20px;
      color: var(--nlc-red);
      font-size: 13px;
      text-align: center;
      margin: 8px 0;
    }

    #nepal-land-converter .nlc-note {
      margin-top: 17px;
      padding: 13px;
      border-left: 3px solid var(--nlc-red);
      background: #fff7f6;
      color: #5e6572;
      font-size: 12px;
      line-height: 1.7;
      border-radius: 4px;
    }

    #nepal-land-converter .nlc-small {
      color: #748096;
      font-size: 12px;
      line-height: 1.6;
      margin-top: 12px;
    }

    @media (max-width: 650px) {
      #nepal-land-converter .nlc-card {
        padding: 16px;
      }

      #nepal-land-converter .nlc-heading h2 {
        font-size: 22px;
      }

      #nepal-land-converter .nlc-fields {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      #nepal-land-converter .nlc-result-row {
        align-items: flex-start;
        flex-direction: column;
        gap: 5px;
      }

      #nepal-land-converter .nlc-result-value {
        text-align: left;
      }
    }

    @media (max-width: 360px) {
      #nepal-land-converter .nlc-fields {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <div class="nlc-card">
    <div class="nlc-heading">
      <h2>Nepal Land Measurement Converter</h2>
      <p>Convert Ropani, Aana, Paisa, Daam, Bigha, Kattha and Dhur into square feet, square metres, acres and hectares.</p>
    </div>

    <div class="nlc-group">
      <h3 class="nlc-section-title">Hill Land Measurement System</h3>
      <div class="nlc-fields">
        <div class="nlc-field">
          <label for="nlc-ropani">Ropani</label>
          <input id="nlc-ropani" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-aana">Aana</label>
          <input id="nlc-aana" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-paisa">Paisa</label>
          <input id="nlc-paisa" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-daam">Daam</label>
          <input id="nlc-daam" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
      </div>
    </div>

    <div class="nlc-group">
      <h3 class="nlc-section-title">Terai Land Measurement System</h3>
      <div class="nlc-fields">
        <div class="nlc-field">
          <label for="nlc-bigha">Bigha</label>
          <input id="nlc-bigha" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-kattha">Kattha</label>
          <input id="nlc-kattha" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-dhur">Dhur</label>
          <input id="nlc-dhur" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
      </div>
    </div>

    <div class="nlc-group">
      <h3 class="nlc-section-title">Other Measurement Units</h3>
      <div class="nlc-fields">
        <div class="nlc-field">
          <label for="nlc-sqft">Square Feet (sq ft)</label>
          <input id="nlc-sqft" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-sqm">Square Metres (m²)</label>
          <input id="nlc-sqm" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-acre">Acre</label>
          <input id="nlc-acre" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
        <div class="nlc-field">
          <label for="nlc-hectare">Hectare</label>
          <input id="nlc-hectare" type="number" min="0" step="any" inputmode="decimal" placeholder="0">
        </div>
      </div>
    </div>

    <div class="nlc-actions">
      <button type="button" class="nlc-clear" id="nlc-clear">Clear All</button>
    </div>

    <div class="nlc-status" id="nlc-status" role="status" aria-live="polite"></div>

    <div class="nlc-results" aria-live="polite">
      <div class="nlc-results-heading">Converted Land Area</div>
      <div class="nlc-results-body">
        <div class="nlc-result-row">
          <span class="nlc-result-label">Total Square Feet</span>
          <span class="nlc-result-value" id="nlc-out-sqft">0 sq ft</span>
        </div>
        <div class="nlc-result-row">
          <span class="nlc-result-label">Total Square Metres</span>
          <span class="nlc-result-value" id="nlc-out-sqm">0 m²</span>
        </div>
        <div class="nlc-result-row">
          <span class="nlc-result-label">Total Acres</span>
          <span class="nlc-result-value" id="nlc-out-acre">0 acres</span>
        </div>
        <div class="nlc-result-row">
          <span class="nlc-result-label">Total Hectares</span>
          <span class="nlc-result-value" id="nlc-out-hectare">0 hectares</span>
        </div>

        <div class="nlc-breakdown">
          <div><strong>Hill System:</strong> <span id="nlc-out-hill">0 Ropani, 0 Aana, 0 Paisa, 0 Daam</span></div>
          <div><strong>Terai System:</strong> <span id="nlc-out-terai">0 Bigha, 0 Kattha, 0 Dhur</span></div>
        </div>
      </div>
    </div>

    <div class="nlc-note">
      <strong>Important:</strong> This converter uses standard customary conversion factors and is intended for general information. For legal transactions, property registration, boundaries and official land records, always verify the measurements with the relevant Land Revenue or Survey Office and a qualified surveyor.
    </div>

    <p class="nlc-small">Enter values in any one measurement system or combine values from different fields. Results update automatically. Displayed results are rounded to a maximum of 8 decimal places.</p>
  </div>

  <script>
    (function () {
      const root = document.getElementById("nepal-land-converter");
      if (!root || root.dataset.initialized === "true") return;
      root.dataset.initialized = "true";

      const SQFT_TO_SQM = 0.09290304;

      const FACTORS = {
        ropani: 5476,
        aana: 342.25,
        paisa: 85.5625,
        daam: 21.390625,
        bigha: 72900,
        kattha: 3645,
        dhur: 182.25,
        sqft: 1,
        sqm: 1 / SQFT_TO_SQM,
        acre: 43560,
        hectare: 10000 / SQFT_TO_SQM
      };

      const ids = Object.keys(FACTORS);

      const $ = (id) => root.querySelector("#" + id);

      function format(value) {
        if (!Number.isFinite(value)) return "Invalid";
        const rounded = Number(value.toFixed(8));
        return rounded.toLocaleString("en-US", {
          useGrouping: false,
          maximumFractionDigits: 8
        });
      }

      function readInput(id) {
        const field = $("nlc-" + id);
        const raw = field.value.trim();

        field.setAttribute("aria-invalid", "false");

        if (raw === "") return 0;

        const value = Number(raw);

        if (!Number.isFinite(value) || value < 0) {
          field.setAttribute("aria-invalid", "true");
          return null;
        }

        return value;
      }

      function splitArea(totalSqft, units) {
        let remaining = totalSqft;
        const parts = [];

        units.forEach((unit, index) => {
          const factor = FACTORS[unit];

          if (index === units.length - 1) {
            parts.push(remaining / factor);
          } else {
            const count = Math.floor((remaining + 1e-9) / factor);
            parts.push(count);
            remaining -= count * factor;
          }
        });

        return parts;
      }

      function update() {
        let totalSqft = 0;

        for (const id of ids) {
          const value = readInput(id);

          if (value === null) {
            $("nlc-status").textContent =
              "Please enter valid non-negative numbers in all fields.";
            return;
          }

          totalSqft += value * FACTORS[id];
        }

        if (!Number.isFinite(totalSqft)) {
          $("nlc-status").textContent =
            "The entered values are too large to calculate.";
          return;
        }

        $("nlc-status").textContent = "";

        $("nlc-out-sqft").textContent =
          format(totalSqft) + " sq ft";

        $("nlc-out-sqm").textContent =
          format(totalSqft * SQFT_TO_SQM) + " m²";

        $("nlc-out-acre").textContent =
          format(totalSqft / FACTORS.acre) + " acres";

        $("nlc-out-hectare").textContent =
          format(totalSqft / FACTORS.hectare) + " hectares";

        const hill = splitArea(
          totalSqft,
          ["ropani", "aana", "paisa", "daam"]
        );

        const terai = splitArea(
          totalSqft,
          ["bigha", "kattha", "dhur"]
        );

        $("nlc-out-hill").textContent =
          format(hill[0]) + " Ropani, " +
          format(hill[1]) + " Aana, " +
          format(hill[2]) + " Paisa, " +
          format(hill[3]) + " Daam";

        $("nlc-out-terai").textContent =
          format(terai[0]) + " Bigha, " +
          format(terai[1]) + " Kattha, " +
          format(terai[2]) + " Dhur";
      }

      ids.forEach((id) => {
        $("nlc-" + id).addEventListener("input", update);
      });

      $("nlc-clear").addEventListener("click", function () {
        ids.forEach((id) => {
          $("nlc-" + id).value = "";
          $("nlc-" + id).setAttribute("aria-invalid", "false");
        });

        $("nlc-status").textContent = "";
        update();
      });

      update();
    })();
  </script>
</div>

```

## Nepal Land Measurement Systems

Nepal commonly uses two traditional land measurement systems: the Hill system and the Terai system.

### 1. Hill Land Measurement System

The Hill system uses four units:

- Ropani
- Aana
- Paisa
- Daam

These units are commonly used in Kathmandu Valley and many hilly areas of Nepal.

The relationship between these units is:

- 1 Ropani = 16 Aana
- 1 Aana = 4 Paisa
- 1 Paisa = 4 Daam
- 1 Ropani = 64 Paisa
- 1 Ropani = 256 Daam

One Ropani is equivalent to 5,476 square feet.

### 2. Terai Land Measurement System

The Terai system uses three main units:

- Bigha
- Kattha
- Dhur

These units are commonly used in Nepal's Terai region.

The relationship between these units is:

- 1 Bigha = 20 Kattha
- 1 Kattha = 20 Dhur
- 1 Bigha = 400 Dhur

One Bigha is equivalent to 72,900 square feet.

## Nepal Land Measurement Conversion Table

The following table provides the standard square-foot conversion factors for commonly used Nepali land measurement units.

```

<div style="width:100%; overflow-x:auto; margin:20px 0;">
  <table style="width:100%; min-width:500px; border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; text-align:left;">
    <thead>
      <tr style="background-color:#25479D; color:#ffffff;">
        <th style="padding:12px 15px; border:1px solid #25479D;">Land Unit</th>
        <th style="padding:12px 15px; border:1px solid #25479D;">Equivalent Units</th>
        <th style="padding:12px 15px; border:1px solid #25479D; text-align:right;">Square Feet</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Ropani</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">16 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">5,476</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">4 Paisa</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">342.25</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Paisa</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">4 Daam</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">85.5625</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Daam</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">—</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">21.390625</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Bigha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">20 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">72,900</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">20 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">3,645</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">—</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">182.25</td>
      </tr>
    </tbody>
  </table>
</div>

```

These square-foot factors are used as the base values in the calculator. Metric equivalents are calculated using 1 square foot = 0.09290304 square metres.

## Ropani to Square Feet Conversion

Ropani is a traditional land measurement unit used in Nepal's Hill system.

**1 Ropani = 5,476 square feet.**

A Ropani is further divided into 16 Aana, 64 Paisa or 256 Daam.

```

<div style="width:100%; overflow-x:auto; margin:20px 0;">
  <table style="width:100%; min-width:400px; border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; text-align:left;">
    <thead>
      <tr style="background-color:#25479D; color:#ffffff;">
        <th style="padding:12px 15px; border:1px solid #25479D;">Ropani</th>
        <th style="padding:12px 15px; border:1px solid #25479D; text-align:right;">Square Feet</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Ropani</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">5,476 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">2 Ropani</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">10,952 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">3 Ropani</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">16,428 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">4 Ropani</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">21,904 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">5 Ropani</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">27,380 sq ft</td>
      </tr>
    </tbody>
  </table>
</div>

```

**Formula:**

Square feet = Ropani × 5,476

For example, 2 Ropani equals:

2 × 5,476 = **10,952 square feet**.

## Aana to Square Feet Conversion

Aana is a smaller unit within the Ropani measurement system. **1 Aana = 342.25 square feet.**

```

<div style="width:100%; overflow-x:auto; margin:20px 0;">
  <table style="width:100%; min-width:400px; border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; text-align:left;">
    <thead>
      <tr style="background-color:#25479D; color:#ffffff;">
        <th style="padding:12px 15px; border:1px solid #25479D;">Aana</th>
        <th style="padding:12px 15px; border:1px solid #25479D; text-align:right;">Square Feet</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">342.25 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">2 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">684.50 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">3 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">1,026.75 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">4 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">1,369 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">8 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">2,738 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">16 Aana</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">5,476 sq ft</td>
      </tr>
    </tbody>
  </table>
</div>

```

**Formula:**

Square feet = Aana × 342.25

For example, 5 Aana equals:

5 × 342.25 = **1,711.25 square feet**.

## Bigha to Square Feet Conversion

Bigha is a traditional land measurement unit commonly used in the Terai region.

**1 Bigha = 72,900 square feet.**

One Bigha consists of 20 Kattha or 400 Dhur.

```

<div style="width:100%; overflow-x:auto; margin:20px 0;">
  <table style="width:100%; min-width:400px; border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; text-align:left;">
    <thead>
      <tr style="background-color:#25479D; color:#ffffff;">
        <th style="padding:12px 15px; border:1px solid #25479D;">Bigha</th>
        <th style="padding:12px 15px; border:1px solid #25479D; text-align:right;">Square Feet</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Bigha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">72,900 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">2 Bigha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">145,800 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">3 Bigha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">218,700 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">4 Bigha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">291,600 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">5 Bigha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">364,500 sq ft</td>
      </tr>
    </tbody>
  </table>
</div>

```

**Formula:**

Square feet = Bigha × 72,900

For example, 2 Bigha equals:

2 × 72,900 = **145,800 square feet**.

## Kattha to Square Feet Conversion

Kattha is a subdivision of Bigha in the Terai land measurement system.

**1 Kattha = 3,645 square feet.**

One Kattha consists of 20 Dhur.

```

<div style="width:100%; overflow-x:auto; margin:20px 0;">
  <table style="width:100%; min-width:400px; border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; text-align:left;">
    <thead>
      <tr style="background-color:#25479D; color:#ffffff;">
        <th style="padding:12px 15px; border:1px solid #25479D;">Kattha</th>
        <th style="padding:12px 15px; border:1px solid #25479D; text-align:right;">Square Feet</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">3,645 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">2 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">7,290 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">3 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">10,935 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">4 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">14,580 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">5 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">18,225 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">10 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">36,450 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">20 Kattha</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">72,900 sq ft</td>
      </tr>
    </tbody>
  </table>
</div>

```

**Formula:**

Square feet = Kattha × 3,645

For example, 3 Kattha equals:

3 × 3,645 = **10,935 square feet**.

## Dhur to Square Feet Conversion

Dhur is a smaller unit used in the Terai measurement system.

**1 Dhur = 182.25 square feet.**

```

<div style="width:100%; overflow-x:auto; margin:20px 0;">
  <table style="width:100%; min-width:400px; border-collapse:collapse; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; text-align:left;">
    <thead>
      <tr style="background-color:#25479D; color:#ffffff;">
        <th style="padding:12px 15px; border:1px solid #25479D;">Dhur</th>
        <th style="padding:12px 15px; border:1px solid #25479D; text-align:right;">Square Feet</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">1 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">182.25 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">2 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">364.50 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">5 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">911.25 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">10 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">1,822.50 sq ft</td>
      </tr>
      <tr style="background-color:#f5f7fb;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">15 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">2,733.75 sq ft</td>
      </tr>
      <tr style="background-color:#ffffff;">
        <td style="padding:11px 15px; border:1px solid #e2e6ee;">20 Dhur</td>
        <td style="padding:11px 15px; border:1px solid #e2e6ee; text-align:right;">3,645 sq ft</td>
      </tr>
    </tbody>
  </table>
</div>

```

**Formula:**

Square feet = Dhur × 182.25

For example, 5 Dhur equals:

5 × 182.25 = **911.25 square feet**.

## Ropani to Kattha Conversion

Ropani and Kattha belong to two different traditional land measurement systems. Both can be converted using their square-foot equivalents.

- 1 Ropani = 5,476 square feet.
- 1 Kattha = 3,645 square feet.

Therefore:

5,476 ÷ 3,645 = approximately **1.50233 Kattha**.

**Formula:**

Kattha = (Ropani × 5,476) ÷ 3,645

For example, 2 Ropani equals:

(2 × 5,476) ÷ 3,645 = approximately **3.00466 Kattha**.

## Bigha to Ropani Conversion

Bigha and Ropani are used in different regional measurement systems. To convert between them, use their square-foot equivalents.

- 1 Bigha = 72,900 square feet.
- 1 Ropani = 5,476 square feet.

Therefore:

72,900 ÷ 5,476 = approximately **13.31264 Ropani**.

**Formula:**

Ropani = (Bigha × 72,900) ÷ 5,476

For example, 2 Bigha equals approximately **26.62527 Ropani**.

## Square Feet to Ropani Conversion

Square feet is a widely understood unit for measuring property area.

To convert square feet into Ropani, divide the total square feet by 5,476.

**Formula:**

Ropani = Square feet ÷ 5,476

For example, 10,000 square feet equals:

10,000 ÷ 5,476 = approximately **1.82615 Ropani**.

## Square Metres, Acres and Hectares

Nepal also uses metric measurements such as square metres and hectares in official and technical contexts.

The calculator supports conversion into these units as well.

Important conversion relationships include:

- 1 square foot = 0.09290304 square metres.
- 1 acre = 43,560 square feet.
- 1 hectare = 10,000 square metres.

For example:

- 1 Ropani = approximately 508.73705 square metres.
- 1 Bigha = approximately 6,772.63162 square metres.
- 1 acre = approximately 7.95471 Ropani.
- 1 hectare = approximately 19.65652 Ropani.

Metric figures are calculated from the square-foot conversion factors and displayed as rounded results.

## How to Use the Nepal Land Converter

The land converter allows you to enter an area using any of the supported units.

Follow these steps:

1. Choose the measurement system you want to enter.
2. Enter the land area in the appropriate field.
3. For mixed measurements, enter values in multiple fields within the same system.
4. Check the calculated square-foot and square-metre values.
5. View the equivalent area in the Hill and Terai measurement systems.
6. Use the Clear All button to start another calculation.

For example, if your land record shows 2 Ropani, 3 Aana and 1 Paisa, enter those three values in their respective fields. The calculator combines them to determine the total land area.

## How to Read Ropani–Aana–Paisa–Daam Measurements

Land records in the Hill measurement system may show an area using four values in this order:

**Ropani – Aana – Paisa – Daam**

For example, 1-4-2-1 represents:

- 1 Ropani
- 4 Aana
- 2 Paisa
- 1 Daam

To calculate the total square feet:

(1 × 5,476) + (4 × 342.25) + (2 × 85.5625) + (1 × 21.390625)

The result is **7,031.203125 square feet**.

Always check the column labels and notation used on the actual land record before interpreting a recorded measurement.

## Important Notes About Land Measurement in Nepal

Traditional land measurement units are useful when comparing property areas, checking advertisements and understanding land records.

However, an online converter should not be treated as an official land survey or legal verification.

Before purchasing, selling or transferring land:

- Check the recorded area on the original land ownership certificate (Lalpurja).
- Confirm the relevant cadastral map and parcel details.
- Verify measurements with the concerned Land Revenue Office or Survey Office.
- Consult a licensed surveyor (Amin) when a physical measurement is required.

The calculator provides mathematical conversions using the stated customary factors. The official recorded land area and applicable survey records should take priority in legal matters.

## Frequently Asked Questions About Nepal Land Measurement

### 1. How many square feet are in 1 Ropani?

One Ropani equals 5,476 square feet. It is also equal to 16 Aana, 64 Paisa or 256 Daam.

### 2. How many Aana make 1 Ropani?

One Ropani consists of 16 Aana.

### 3. How many square feet are in 1 Aana?

One Aana equals 342.25 square feet.

### 4. How many Paisa make 1 Aana?

One Aana consists of 4 Paisa.

### 5. How many Daam make 1 Paisa?

One Paisa consists of 4 Daam.

### 6. How many Kattha make 1 Bigha?

One Bigha consists of 20 Kattha.

### 7. How many Dhur make 1 Kattha?

One Kattha consists of 20 Dhur.

### 8. How many square feet are in 1 Kattha?

One Kattha equals 3,645 square feet.

### 9. How many square feet are in 1 Dhur?

One Dhur equals 182.25 square feet.

### 10. How many Kattha are in 1 Ropani?

One Ropani equals approximately 1.50233 Kattha.

### 11. How many Ropani are in 1 Bigha?

One Bigha equals approximately 13.31264 Ropani.

### 12. How do I convert square feet into Ropani?

Divide the total square feet by 5,476. For example, 10,000 square feet is approximately 1.82615 Ropani.

### 13. What is the difference between Ropani and Bigha?

Ropani belongs to the Hill land measurement system, while Bigha belongs to the Terai system. One Ropani equals 5,476 square feet, whereas one Bigha equals 72,900 square feet.

### 14. Can I use this converter for land transactions?

The converter can help you understand and compare land areas, but it does not replace official land records, cadastral measurements or verification by a licensed surveyor.

## Conclusion

Understanding Nepal's land measurement units makes it easier to compare property sizes and interpret land records. Whether you are working with Ropani, Aana, Paisa, Daam, Bigha, Kattha or Dhur, knowing the standard conversion factors can help you calculate land area across different measurement systems.

Use the Nepal Land Converter above to convert traditional land units into square feet, square metres, acres and hectares. For official transactions, always verify the recorded area with the relevant land authorities and qualified professionals.