/* eslint-disable react/prop-types */
import React from 'react';
import style from './ClassComponent.module.css';
import PropTypes from 'prop-types';

export class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: 'Результат',
      userNumber: '',
      randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
      count: 0,
      flag: false,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState(state => ({
      count: state.count + 1,
    }));

    this.setState(state => {
      if (!state.userNumber) {
        return {
          result: 'Введите число',
        };
      }

      if (state.userNumber > state.randomNumber) {
        return {
          result: `${state.userNumber} больше загаданного`,
        };
      }

      if (state.userNumber < state.randomNumber) {
        return {
          result: `${state.userNumber} меньше загаданного`,
        };
      }

      return {
        result: `Вы угадали, загаданное число ${state.userNumber}. 
        Количетво попыток: ${state.count}`,
        flag: true,

      };
    });

    this.setState({
      userNumber: '',
    });
  };

  handleChange = (e) => {
    this.setState((state, props) => ({
      userNumber: e.target.value,
    }));
    console.log(this.state, this.randomNumber);
  };

  handleReset = (e) => {
    this.setState((state) => ({
      result: 'Результат',
      userNumber: '',
      randomNumber:
      Math.floor(Math.random() * this.props.max - this.props.min) +
      this.props.min,
      count: 0,
      flag: false,
    }));
  };


  render() {
    const {flag} = this.state;
    return (
      <div className={style.game}>
        <p className={style.result}>{this.state.result}</p>

        <form className={style.form} onSubmit={this.handleSubmit}>

          <label className={style.label} >
                Угадай число
          </label>

          <input
            className={style.input}
            onChange={this.handleChange}
            value={this.state.userNumber}
            type="number" id= "user_number"/>

          <button
            className={style.btn}>
          Угадать
          </button>

        </form>

        { flag && (
          <button onClick={this.handleReset}
            className={style.btn_new}>
          Сыграть ещё
          </button>
        )}
      </div>
    );
  }
}

ClassComponent.PropTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
};
