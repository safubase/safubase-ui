// MODULES
import React from 'react';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp,
} from 'react-icons/md';

class Arrow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.choose_dir = this.choose_dir.bind(this);
  }

  choose_dir(dir) {
    switch (dir) {
      case 'down':
        return <MdKeyboardArrowDown />;

      case 'left':
        return <MdKeyboardArrowLeft />;
      case 'right':
        return <MdKeyboardArrowRight />;

      default:
        return <MdKeyboardArrowUp />;
    }
  }

  render() {
    return this.choose_dir(this.props.dir);
  }
}

export default Arrow;
