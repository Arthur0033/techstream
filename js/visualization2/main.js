/* main file for loading data on visualization 2    */


/* file description copied off of data set website https://zenodo.org/records/7923702 */

/* One file per month is provided as a csv file with the following features:

callsign: the identifier of the flight displayed on ATC screens (usually the first three letters are reserved for an airline: AFR for Air France, DLH for Lufthansa, etc.)
number: the commercial number of the flight, when available (the matching with the callsign comes from public open API); this field may not be very reliable;
icao24: the transponder unique identification number;
registration: the aircraft tail number (when available);
typecode: the aircraft model type (when available);
origin: a four letter code for the origin airport of the flight (when available);
destination: a four letter code for the destination airport of the flight (when available);
firstseen: the UTC timestamp of the first message received by the OpenSky Network;
lastseen: the UTC timestamp of the last message received by the OpenSky Network;
day: the UTC day of the last message received by the OpenSky Network;
latitude_1, longitude_1, altitude_1: the first detected position of the aircraft;
latitude_2, longitude_2, altitude_2: the last detected position of the aircraft. 

first seen last seen separated into this format: 2019-01-31 00:14:53+00:00

Need to splice space to get date and time.

*/

let calendarMap;

//start application by loading the data
loadData();


function loadData() {
  //load the TTC CSV
  d3.csv("data/flightlist_february_2019.csv", row => {

	//separating the date from the time from string to actualy date time values.
    firstSeenParts = row.firstseen.split(" ");
    row.firstseen_filtered = new Date(firstSeenParts[0] + "T" + firstSeenParts[1]);
    lastSeenParts = row.lastseen.split(" ");
    row.lastseen_filtered = new Date(lastSeenParts[0] + "T" + lastSeenParts[1]);
    return row;

  }).then(data => {

    //filter data to only include flights that have lat, long, origin, dest, first and last seen
    const flights = data.filter(d => {
      return d.latitude_1 && d.longitude_1 && d.latitude_2 && d.longitude_2 && d.origin && d.destination
      && d.firstseen && d.lastseen;
    });

    //log the first 20 entries of flights to verify
    console.log(flights.slice(0, 20));
    //Initialize the Calendar Map with flight data
    calendarMap = new CalendarMap("visualization-1", flights);
    calendarMap.loadFlights();

  });

}
