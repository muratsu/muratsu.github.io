---
title: Top 3 Languages for Bay Area Software Engineering Jobs
date: "2018-06-26T22:40:32.169Z"
template: "post"
draft: false
slug: "/posts/top-3-languages-bay-area-software-engineering-jobs-2018/"
category: "Data"
tags:
  - "Developers"
  - "Jobs"
description: "One of my close friends asked me about the most popular programming language in the Bay Area, and I ended up scraping available job openings to figure out the answer"
---

The software world is changing with new libraries and trends. This rapidly changing environment is pushing developers to learn new technologies. There are many exciting technologies & languages but only limited time. For aspiring backend developers, the question is: “which programming language should they focus on to maximize their impact on 2018?”

For this experiment, I’ve decided to scrape the popular startup site Angel List, because Startup Jobs is a great resource! To make the search a bit more relevant, I’ve used the following two tags: “Full Time” & “California, US”. Firstly I’ll talk a bit about how I got the data set ready, if you’re only interested in the results, please scroll down further.

Node.js has some powerful libs like [request](https://github.com/request/request) & [cheerio](https://github.com/cheeriojs/cheerio) that make scraping a breeze. Python also has scrapy, but I’m less familiar with it. So the general idea is to write two essential functions:

1. A function which will gather all the available jobs matching our criteria
2. A function which will collect all the details about the jobs we’ve discovered earlier

It turns out the first function is not so hard to write:

```javascript
async function fetchAllListings() {
  const api = "https://angel.co/job_listings/startup_ids";
  const options = {
    method: 'POST',
    uri: api,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36'
    },
    formData: {
      'filter_data[locations][]': "1624-California%2C+US",
      'filter_data[types][]': "full-time",
      'tab': "find"
    },
    json: true
  };

  const queryResult = await rp(options);
  const jobs = [];
  queryResult.ids.forEach((val, idx) => {
    jobs.push({
      companyId: val,
      listingIds: queryResult.listing_ids[idx]
    });
  })
  return jobs;
}
```

The function fetchAllListings will grab all the listings we’re interested in, but we need more granular information about them to aggregate/group them later on. The following function will parse the job details for a specific company:

```javascript
// Fetched all all the listings of a company in more detail
async function fetchCompanyListings(listing) {
  const jobs = [];
  const startupId = `startup_ids%5B%5D=${listing.companyId}`;
  const listingIds = listing.listingIds.reduce((acc, cur) => {
    return acc + "&listing_ids%5B0%5D%5B%5D=" + cur;
  }, '');
  const target = `https://angel.co/job_listings/browse_startups_table?${startupId}${listingIds}`;
  const options = {
    uri: target,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36'
    },
  };
  return new Promise(async (resolve, reject) => {
    try {
      const queryResult = await rp(options);
      const $ = cheerio.load(queryResult);
      const companyName = $('.header-info .startup-link').text();
      const companyPage = $('.header-info .startup-link').attr('href');
      // Iterate all listings
      $('.jobs > .content > .listing-row').each((idx, elem) => {
        const job = {};
        const title = $(elem).find('.title > a');
        // Company Details
        job.company = {
          name: companyName,
          link: companyPage
        };
        // Extract Title
        job.link = title.attr('href');
        job.title = title.text();
        // Extract Compenstation
        const compenstation = $(elem).find('.compensation').text().trim().split(' · ');
        job.salary = compenstation[0];
        job.stock = compenstation[1];
        // Extract Tags
        job.tags = $(elem).find('.tags').text().trim().split(' · ');
        jobs.push(job);
      });
      resolve(jobs);
    } catch (error) {
      reject(error);
    }
  })
}
```

The hardest part of scraping, in this case, was to avoid getting blocked. If you don’t throttle API calls somewhere around 1 Call / 2 Secs, the web server will start returning the HTTP code 429. For more details, please check out the GitHub repo: [https://github.com/muratsu/angelco-parser](https://github.com/muratsu/angelco-parser) 

The whole scrape takes about approximately 2 hours. Once the data is all ready, you can import it to MongoDB and start querying it. Below are the results for the backend developers!

(**TLDR**; For the backend, the most in-demand languages are **Python**, **Java** & **Javascript**.)

![Python is the leading programming language](/media/plang-2018.jpg)

It looks like **Python** is the most in-demand language on Bay Area with **Java** and **Javascript** following closely. If you have any questions or suggestions please reach out to me on [Twitter](https://www.twitter.com)! Happy Hacking ✌😉
