[![Netlify Status](https://api.netlify.com/api/v1/badges/ab75b185-11bc-4956-bb80-59c01c12c120/deploy-status)](https://app.netlify.com/sites/wcag-filter-tool/deploys)
# WCAG Filter Tool
The intention is to reduce the variance of testing for web accessibility between professionals and people who have an interest in accessibility. Agreeing on what constitutes a failure is the first step towards testing in a consistent way and having consistent results.

## The Categories
The success criteria are grouped according to what part of the website you're developing. Allowing you to focus on the relevant criteria you need to apply and understand when building or testing. 

If your website doesn't have video or audio content you don't need to test against those criteria.

- all (all WCAG success criteria)
- content
- custom Controls
- forms and UI
- audio / video
- structure
- colour
- font-size
- dynamic content
- keyboard
- link

### Using the tests
Each test is written in a way which is clear to understand and straightforward to apply to web content. Accessibility guidance for font sizing:
- `text smaller than 18.6px and bold has a minimum contrast ratio of 4.5:1 with the background colour`
- `text at least 18.6px and bold has a minimum contrast ratio of 3:1 with the background colour`
- `text smaller than 24px and not bold has a minimum contrast ratio of 4.5:1 with the background colour`
- `text at least 24px and not bold has a minimum contrast ratio of 3:1 with the background colour`

Some tests are conditional:

> * A test followed by **AND** <other test> = the previous test AND this test must be applied to pass the success criteria
> * A test followed by **OR** <other test> = the previous test OR this test must be applied to pass the success criteria

### Examples
#### Apply any of the 3 tests
  
* 1.1.1 Non-text Content - two different modalities of CAPTCHA are provided
* 1.1.1 Non-text Content - **or**, providing access to a human to bypass CAPTCHA
* 1.1.1 Non-text Content - **or**, not requiring CAPTCHA for authorised users  

#### Apply both tests

* 1.3.1 Info and Relationships - two or more radio buttons, or checkbox controls must be grouped using a `<fieldset>`
* 1.3.1 Info and Relationships - **and**, the `<fieldset>` must have a succinct `<legend>` element  
 
## What this list isn't
It's not a catch-all list for things which you feel _should_ be accessibility failures but aren't. This is a list of what each WCAG 2.1 success criteria means and distilling that meaning into one or more tests. 

## Contributing
Disagree with any of the tests? great! There are several ways to contribute:
- Create a PR and ammend the details in `data/json.js`
- Log an issue in this repo, click "Issues" and follow the process of adding an issue
- Send an email to ross.mullen@canaxess.com.au to indicate you disagree and want to alter a test/add a test
- Send a Twitter DM to [@mrrossmullen](https://twitter.com/mrrossmullen?lang=en) to indicate you disagree and want to alter a test/add a test

Not every request will be actioned. If your request is to add or ammend a test, you will need to justify how the test fails against WCAG. Non-sequential headings are not a WCAG 2.1 failure. 

https://www.tpgi.com/heading-off-confusion-when-do-headings-fail-wcag/
> WCAG techniques, such as H42: Using h1-h6 to identify headings and ARIA12: Using role=heading to identify headings, recommend that heading markup indicate the appropriate heading level for the content, but they don’t go so far as to define what’s “appropriate”—an issue that has been the subject of considerable discussion. So although hierarchical heading structures reflect a best practice, skipping heading levels does not represent a WCAG failure.

All requests are welcomed and appreciated, but are included only after consensus amongst the community. 
  
This project is aimed at conveying facts. Tests should strive to avoid personal preferences for identifying accessibility failures.

## Changelog
This checklist is a living document where tests can change regularly, consult the [changelog](https://github.com/canaxess/wcag-filter-tool/blob/main/CHANGELOG.md) for details.
  
## License
MIT Licensed. Copyright (c) CANAXESS 2021.
