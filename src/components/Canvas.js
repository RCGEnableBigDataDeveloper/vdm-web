import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Canvas.css'
require('jqueryui');
require('jsplumb');


const jsPlumb = window.jsPlumb;

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodes: props.nodes,
      currentNode: props.currentNode
    };

  }

  componentDidMount() {
    let nodes = this.props.nodes.nodes;
    let connections = this.props.nodes.connections;
    let plumb = this.props.plumb;
    let addNode = this.props.addNode;
    let nodeClicked = this.props.nodeClicked;

    if(plumb){
      plumb.setContainer(this.props.id);
      jsPlumb.ready(function () {
        console.log('Plumb ready!')
  
        plumb.batch(function () {
          // Restore nodes
          if(nodes){
            nodes.forEach(node => {
              addNode(node, plumb, nodeClicked, false)
            });
    
            for (const c of connections) {
              plumb.connect(c);
            }
          }
        });
      });
    }else{
      console.log("ERROR: Plumb instance is not defined for " + this.props.id)
    }

  }

  render() {
    return (
      <div id={this.props.id} className='canvas col-lg-6 col-md-3' />
    )
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    
  }
}

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Canvas)