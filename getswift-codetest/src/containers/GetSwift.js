import React, {Component} from 'react';
import '../styles/GetSwift.css'

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

  render = () => {
    let warehouseDrone = 0
    let droneData = this.state.droneData.map( drone => {
      if (drone.packages.length === 0) {
        warehouseDrone += 1
      }
      return (
        <div className="drone">
          <p>Drone ID: {drone.droneId}</p>
          <p>It's Current Location:</p>
          <p>- {drone.location.latitude}</p>
          <p>- {drone.location.longitude}</p>
          <p>Holding Package:</p>
        </div>
      )
    })

    let packageData = this.state.packageData.map( eachPackage => {
      return (
        <div className="package">
          <p>Package ID: {eachPackage.packageId}</p>
          <p>Destination:</p>
          <p>- {eachPackage.destination.latitude}</p>
          <p>- {eachPackage.destination.longitude}</p>
          <p>Deadline: {eachPackage.deadline}</p>
        </div>
      )
    })

    return (
      <div>
        <h1>GetSwift's Code Test</h1>
        <div className='button' onClick={this.logData}>SHOW DATA</div>

        <div className="droneSection">
          <h1>DRONE DATA</h1>
          <p>There are {this.state.droneData.length} drones in total</p>
          <p>There are {warehouseDrone} drones in the warehouse</p>
          <p>There are {this.state.droneData.length - warehouseDrone} drones out</p>

          {droneData}
        </div>
        <div className="packageSection">
          <h1>PACKAGE DATA</h1>
          There are {this.state.packageData.length} unassigned packages
          {packageData}
        </div>
      </div>
    )
  }
}

export default GetSwift;
