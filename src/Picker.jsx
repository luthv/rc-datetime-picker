import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import Calendar from './panels/Calendar.jsx';
import Time from './panels/Time.jsx';
import Buttons from './panels/Buttons';


class Picker extends Component {
  constructor() {
    super();
    this.state = {
      panel: 'calendar'
    };
  }

  changePanel = (panel) => {
    this.setState({
      panel
    });
  }

  render() {
    const {
      isOpen = true, 
      buttons, 
      splitPanel, 
      showTimePicker = true, 
      showCalendarPicker = true
    } = this.props;
    const {panel} = this.state;
    const isTimePanel = panel === 'time';
    const isCalendarPanel = panel === 'calendar';
    const className = classNames('datetime-picker', this.props.className, {
      split: splitPanel
    });
    const props = blacklist(this.props, 'className', 'isOpen', 'splitPanel');    

    return (
      <div className={className} style={{display: isOpen ? 'block' : 'none'}} onClick={(evt) => evt.stopPropagation()}>
        {buttons
          ? <Buttons {...props} />
          : undefined
        }

        {splitPanel
          ? <div className="panel-nav">
              <button type="button" onClick={() => this.changePanel('calendar')} className={isCalendarPanel ? 'active' : ''}>
                <i className="fa fa-calendar-o"></i>Date
              </button>
              <button type="button" onClick={() => this.changePanel('time')} className={isTimePanel ? 'active' : ''}>
                <i className="fa fa-clock-o"></i>Time
              </button>
            </div>
          : undefined
        }
        
        {showCalendarPicker
          ? <Calendar {...props} style={{display: isCalendarPanel || !splitPanel ? 'block' : 'none'}} />
          : undefined
        }

        {showTimePicker
          ? <Time {...props} style={{display: isTimePanel || !splitPanel ? 'block' : 'none'}} />
          : undefined
        }
      </div>
    );
  }
}


export default Picker;
