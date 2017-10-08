import React, {Component} from 'react';
import '../styles/GetSwift.css'
import Moment from 'react-moment';

class GetSwift extends Component {
  constructor () {
    super();

    this.state = {
      droneData: [],
      packageData: [],
    }
  }

  componentWillMount = () => {
    const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
    const DRONE_URL = 'https://codetest.kube.getswift.co/drones'
    const PACKAGE_URL = 'https://codetest.kube.getswift.co/packages'

    fetch(PROXY_URL + DRONE_URL)
    .then(response => response.json())
    .then(data => this.setState({
      droneData: data,
    }))
    .catch( (error) => console.log(error.response))


    fetch(PROXY_URL + PACKAGE_URL)
    .then(response => response.json())
    .then(data => this.setState({
      packageData: data,
    }))
    .catch( (error) => console.log(error.response))

  }

  logData = () => {
    console.log(this.state.droneData)
    console.log(this.state.packageData)
  }

  assign = () => {
    let droneData = this.state.droneData
    let packageData = this.state.packageData

    let newDroneData = droneData.map( drone => {
      if (drone.packages.length === 0) {
        // let pkg = packageData.shift()
        if (packageData.length > 0) {
          drone.packages = [packageData.shift()]
          return drone
        } else {
          drone.packages = []
          return drone
        }
      } else {
        return drone;
      }
    })

    this.setState({
      droneData: newDroneData,
      packageData: packageData,
    })
    // debugger
  }

  sortPackageData = () => {
    let packageData = this.state.packageData
    packageData.sort( (a, b) => {
      return parseFloat(a.deadline) - parseFloat(b.deadline);
    })

    this.setState({
      packageData: packageData,
    })
  }


  render = () => {
    let warehouseDrone = 0
    let droneData = this.state.droneData.map( drone => {
      if (drone.packages.length === 0) {
        warehouseDrone += 1
      }

      if (drone.packages.length === 0) {
        return (
          <div className="drone">
            <p className="bold">Drone ID: {drone.droneId}</p>
            <div className='destination'>
              <p>Current Location:</p>
            </div>
            <div className='destination'>
              <p>lat: {drone.location.latitude}</p>
              <p>lon: {drone.location.longitude}</p>
            </div>
            <div className='drone-returning'>
              <div className='drone-package-header'><p>EMPTY DRONE</p></div>
              <p>Status: RETURNING TO DEPO</p>
              <p>Estimate Time of Arrival: </p>
            </div>
          </div>
        )
      } else {
        return (
          <div className="drone">
            <p className="bold">Drone ID: {drone.droneId}</p>
            <div className='destination'>
              <p>Current Location:</p>
            </div>
            <div className='destination'>
              <p>lat: {drone.location.latitude}</p>
              <p>lon: {drone.location.longitude}</p>
            </div>
            <div className='drone-package'>
              <div className='drone-package-header'><p>HOLDING PACKAGE:</p></div>
              <p>Status: ENROUTE</p>
              <p>Package ID: {drone.packages[0].packageId}</p>
              <p>Deadline: <Moment unix>{drone.packages[0].deadline}</Moment></p>
              <div className='destination'>
                <p>Destination</p>
              </div>
              <div className='destination'>
                <p>lat: {drone.packages[0].destination.latitude}</p>
                <p>long: {drone.packages[0].destination.longitude}</p>
              </div>
              <p>Time of Completion: </p>
            </div>
          </div>
        )
      }

    })

    let packageData = this.state.packageData.map( eachPackage => {
      var packageDate = new Date(eachPackage.deadline*1000);
      var packageHours = packageDate.getHours();
      var packageMinutes = "0" + packageDate.getMinutes();
      var packageSeconds = "0" + packageDate.getSeconds();

      var nowDate = new Date();
      var nowHours = nowDate.getHours();
      var nowMinutes = "0" + nowDate.getMinutes();
      var nowSeconds = "0" + nowDate.getSeconds();

      return (
        <div className="package">
          <p className="bold">Package ID: {eachPackage.packageId}</p>
          <div className='destination'>
            <p>Destination:</p>
          </div>
          <div className='destination'>
            <p>lat: {eachPackage.destination.latitude}</p>
            <p>long: {eachPackage.destination.longitude}</p>
          </div>
          <p>Deadline: <Moment unix>{eachPackage.deadline}</Moment></p>
          {/* <p>Time Left: <Moment toNow><Moment unix>{eachPackage.deadline}</Moment></Moment></p> */}
          {/* <p>Package Deadline: {packageHours + ':' + packageMinutes.substr(-2) + ':' + packageSeconds.substr(-2)}</p> */}
          {/* <p>Time NOW: {nowHours + ':' + nowMinutes.substr(-2) + ':' + nowSeconds.substr(-2)}</p> */}
          <p>Time Left: {(packageHours - nowHours) === 1 || packageHours ===0 ? 0 : ((packageHours - nowHours) + 24) % 24} Hours {((packageMinutes - nowMinutes) + 60) % 60} Min {((packageSeconds - nowSeconds) + 60) % 60} Sec</p>


          {/* <p>Time Left: <Moment unix>{eachPackage.deadline}</Moment></p>
          <p><Moment interval={30000}>
                1976-04-19T12:59-0500
            </Moment></p> */}
        </div>
      )
    })

    // const dateToFormat = new Date();
    // <div><Moment interval={1000}>{dateToFormat}</Moment></div>


    return (
      <div>
        <h1>GetSwift's Code Test</h1>
        <div className='button' onClick={this.logData}>SHOW DATA (console.log)</div>
        <div className='button' onClick={this.assign}>MANUAL ASSIGN!</div>
        <div className='button' onClick={this.sortPackageData}>SORT PACKAGE DATA</div>
        <p>The depo is located at 303 Collins Street, Melbourne, VIC 3000</p>
        <p>Latitude: -37.816664, Longitude: 144.963848</p>

        <div className='summary'>
          <div className='drone-data'>
            <h3>DRONE DATA</h3>
            <p>There are {this.state.droneData.length} drones in total</p>
            <p>There are {warehouseDrone} drones in the warehouse</p>
            <p>There are {this.state.droneData.length - warehouseDrone} drones enroute</p>
          </div>
          <div className='package-data'>
            <h3>PACKAGE DATA</h3>
            There are {this.state.packageData.length} unassigned packages
          </div>
        </div>

        <div className="droneSection">
          {droneData}
        </div>
        <div className="packageSection">
          {packageData}
        </div>
      </div>
    )
  }
}

export default GetSwift;
