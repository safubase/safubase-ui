// MODULES
import React from 'react';
import { IoSettingsSharp, IoSettingsOutline } from 'react-icons/io';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return this.props.active ? <IoSettingsSharp /> : <IoSettingsOutline />;
  }
}

export default Settings;
