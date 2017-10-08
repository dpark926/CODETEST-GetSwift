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

  render = () => {
    let warehouseDrone = 0
    let droneData = this.state.droneData.map( drone => {
      if (drone.packages.length === 0) {
        warehouseDrone += 1
      }

      if (drone.packages.length === 0) {
        return (
          <div className="drone">
            <p>Drone ID: {drone.droneId}</p>
            <p>It's Current Location:</p>
            <p>lat: {drone.location.latitude}</p>
            <p>lon: {drone.location.longitude}</p>
          </div>
        )
      } else {
        return (
          <div className="drone">
            <p>Drone ID: {drone.droneId}</p>
            <p>It's Current Location:</p>
            <p>lat: {drone.location.latitude}</p>
            <p>lon: {drone.location.longitude}</p>
            <div className='drone-package'>
              <div className='drone-package-header'><p>HOLDING PACKAGE:</p></div>
              <p>Status: ENROUTE</p>
              <p>Package ID: {drone.packages[0].packageId}</p>
              <p>Deadline: <Moment unix>{drone.packages[0].deadline}</Moment></p>
              <p>Destination</p>
              <p>lat: {drone.packages[0].destination.latitude}</p>
              <p>long: {drone.packages[0].destination.longitude}</p>
              <p>Time of Completion: </p>
            </div>
          </div>
        )
      }

    })

    let packageData = this.state.packageData.map( eachPackage => {
      return (
        <div className="package">
          <p>Package ID: {eachPackage.packageId}</p>
          <p>Destination:</p>
          <p>lat: {eachPackage.destination.latitude}</p>
          <p>long: {eachPackage.destination.longitude}</p>
          <p>Deadline: <Moment unix>{eachPackage.deadline}</Moment></p>
          <p>Time Left: <Moment fromNow><Moment unix>{eachPackage.deadline}</Moment></Moment></p>
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
