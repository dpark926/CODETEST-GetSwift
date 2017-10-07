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
    return (
      <div>
        <h1>GetSwift's Code Test</h1>
        <div className='button' onClick={this.logData}>SHOW DATA</div>
      </div>
    )
  }
}

export default GetSwift;
