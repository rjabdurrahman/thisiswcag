# Changes to tests
## 09/11/2021
- Updated data tables test replacing check for `summary` attribute with a check for the `caption` element (line 22).
## 22/12/2021
- Updated status messages test to add the category `dynamic-content`
## 12/01/2022
- Updated success criteria test for `1.4.3 Contrast (Minimum)` to add the category `colour` (line 39 - 42)
- Reworded success criteria test for `1.1.1 Non-text Content` (CAPTCHA) to **an invalid test or exercise presented by an image has text identification describing the non-text content** (line  12)
## 29/01/2022
**Reworded tests**
### 1.1.1 Non-text Content
- `all <img> elements have an alt attribute`
- `all descriptive <img> elements have a programmatic description of the image`
- `all complex descriptive <img> element descriptions are provided adjacent to the image or on a separate page`

### 1.2.1 Audio-only and Video-only (Prerecorded)
- `pre-recorded video with no dialogue has easily reached text or audio description of what happens visually`
- `pre-recorded audio has an easily reached text transcript`

### 1.3.1 Info and Relationships
- `headings are marked up using heading elements`
- `lists are programmatically marked up using <ul>, <ol>, <dl> elements`
- `landmark regions are correctly applied`

### 1.3.2 Meaningful Sequence
- `the reading order and navigation of text content is logical and intuitive`

### 1.4.12 Text Spacing
- `there is no loss of content or functionality when the text spacing bookmarklet is applied`

### 2.4.1 Bypass Blocks
- `iframes have descriptive, informative or unique titles`

### 2.4.2 Page Titled
- `page <title> is descriptive and informative`

### 2.4.3 Focus Order
- `the navigation order of link, form elements and interactive components is logical`

### 2.4.5 Multiple Ways
- `at least 2 of related pages, table of contents, site map, site search, or list of web pages are provided for non-workflows`

### 2.4.6 Headings and Labels
- `labels for form controls and interactive controls are informative`
- `page headings are informative`

### 3.1.1 Language of Page
- `each page has a lang attribute`

### 3.1.2 Language of Parts
- `content in a different language than the page default is identified using the lang attribute`

**Condensed tests**
### 4.1.1 Parsing
- `No errors identified when parsed through W3C valdiator and parsing bookmarklet applied`
