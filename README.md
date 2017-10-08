![app](./img/app.png)

# ANALYSIS

I built a client-side app using React that makes fetch requests to the provided endpoints for drones and packages. This also allows me to conveniently display all the data on the browser with any styling that I prefer. I invested a good amount of time to first analyze the data and understand the objective at hand before I actually start coding.

For each API, I laid put a summary of how many drones and packages there are in total. And of those drones I have indicated how many of those are available (not carrying a package) and those that are already enroute to it's delivery destination. Each object is color-coated by their status.

- Assigned Drones (Green)
- Unassigned Drones (Orange)
- Unassigned Packages (Red)

## GET /packages

- Package ID
- Destination
- Deadline

Every package contains a Unix timestamp. I used this value to sort all the packages according to whichever is most urgent. I compared the deadline with the current time to determine the that is left.  Each unassigned package is color coated in red.

![package](./img/package.png)

### SORT BUTTON

![sort](./img/sort.png)

The sort button sorts all the packages according to whichever is most urgent.

## GET /drones

- Drone ID
- Location
- Package Info

The drones API returns a random list of drones with their id, location and package (if carrying). The first thing to notice is that every drone has a current location which can be compared with the location of the depo. I'm using the Halversine formula to calculate the distance between one point to another. With that, I can then determine the time that'll take for the drone to reach its destination.

Each drone is either carrying a package or not. However, all drones have a current location that is different of the depo which means that they are on its way back to the depo. I have also incorporate the time that'll take for them to reach the depo. These drones are highlighted in orange which indicates that they are available for delivery.

![drone](./img/drone.png)

![unassigned](./img/unassigned.png)

### ASSIGN BUTTON

![assign](./img/assign.png)

The "assign" button assigns all available drone with the most urgent packages. The solution of "assignments" and "unassignedPackageIds" can be viewed on the console.

# ASSESSMENT
