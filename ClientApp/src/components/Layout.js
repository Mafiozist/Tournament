import React, { Component, createRef, useRef } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;
  
  constructor(props){
    super(props)
    this.ref =  createRef(null);
    this.state={
      height: 0,
    }
  }

  componentDidMount() {
    if (this.ref.current) {
      const height = this.ref.current.clientHeight; // Получаем высоту элемента
      this.setState({ height: height }); // Обновляем состояние с высотой элемента
    }
  }

  render() {
    return (
      <div style={{width:'100%', height:'100%'}}>
        <NavMenu ref={this.ref} />
        <Container style={{width:'100%', height:'100%'}}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
