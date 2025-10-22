/* Calendar Visualization js file for component class */



  /* Class to load in all TTC Subway Station Data into a map visualization */

class CalendarMap {


    constructor(parentElement, data) {

        this.parentElement = parentElement;
        this.data = data;
        this.flightsPerDay = {};

    }


/* method for loading all flights and their data
NOTE: Since there are two dates to consider, we take the first date as the flight date for flights that
Cross timezone regions or technically cross the time into the next date*/

  loadFlights() {

        console.log("loadFlights");
        var vis = this;

        // Group flights by day
        vis.data.forEach(flight => {
            //take only the date portion of the flight data from firstseen.

            const day = flight.firstseen_filtered.toISOString().split("T")[0];

            //if this is the first flight for this day initialize array containing flights
            if (!vis.flightsPerDay[day]) {
                vis.flightsPerDay[day] = [];
            }

            vis.flightsPerDay[day].push(flight);

        });



        console.log("Flights per day:", vis.flightsPerDay);
    }



  }
