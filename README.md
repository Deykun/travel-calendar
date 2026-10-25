# Travel calendar 📅

The website: https://deykun.github.io/travel-calendar

Travel calendar takes your travel history, one calendar per year, and stacks all those years on top of each other into a single 12-month view. Each day of the year then shows everything that ever happened on that date: how many countries you have been in on 14 April across all years, in which years you were abroad, and when you set foot in a country for the first time.

The calendar is built from GPS activities exported from **[Strava](https://www.strava.com/)** or from trips on a public **[Nomads.com](https://nomads.com/)** profile. With Strava data every activity is matched to the countries it passes through, so a ride that crosses a border counts for both sides and the calendar can tell you that on 14 August you were in three countries.

## What it tells you

With your data loaded, the calendar answers questions like:

- **Peak days** - the date on which you have visited the most countries across all years, and the date you were abroad in the most years.
- **Days abroad** - the share of days spent outside your home country in the selected range of years.
- **Longest trips** - the longest streaks of consecutive days abroad, with the sequence of countries and how many days you spent in each. "Kind" streaks tolerate one or two missed days, so a day without a recorded activity doesn't break the trip.
- **Most countries in one trip** - the streak during which you visited the most countries.
- **New countries** - countries visited for the first time in the selected range, and the exact day each one was unlocked.
- **Any day in detail** - click a day to see its trips, places and dates, with a link to open the location in Google Maps. Hover the flags to see which year each visit belongs to.
- **Transit** - days spent travelling between two countries that are not your home.
- **Year over year** - highlight days and countries that are new in the last year of the selected range, or press play to watch the calendar fill up year by year.

The number shown on each day is configurable: countries visited, years abroad, the year the day was first spent abroad, or the number of countries unlocked that day. The calendar can be saved as an image, and calendars built from Nomads.com data can be shared by link.

## Data sources

### Strava

1. Request your archive on [this Strava page](https://www.strava.com/athlete/delete_your_account) ("Request your archive" - you don't have to delete anything).
2. Download and extract the ZIP from the email Strava sends you.
3. Drop the GPX / FIT files from the `activities` folder into the app.

Countries are detected from the GPS coordinates of each activity. Home countries are picked automatically (the countries you are active in all year round, otherwise the most active one) and can be changed in settings.

Privacy:

- Files are never uploaded to a server. They are parsed and stored locally in your browser.
- Country detection from coordinates happens in the browser too, without any external API.
- The website doesn't use analytics tools to track your activity.

### Nomads.com

Enter a public Nomads.com username in settings and the trips are fetched and mapped onto the calendar.

Not sure what it looks like? The intro screen can load an example calendar.
