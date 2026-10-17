// Matched after stripping a trailing .gz, so .gpx / .gpx.gz / .fit / .fit.gz are all accepted
export const STRAVA_ALLOWED_FORMATS = ['gpx', 'fit'];

// How many GPX points (spread evenly, incl. first & last) are checked in 'preflight' mode
export const STRAVA_PREFLIGHT_POINTS_TO_CHECK = 5;
