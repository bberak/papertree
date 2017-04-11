import React, { Component, } from 'react'
import { View, Text, Image} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

class Background extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Image 
        style={[css.backgroundImage, this.props.containerStyle]} 
        resizeMode={this.props.resizeMode || "repeat"}
        source={this.props.imageSource || require('../images/tile.png')}
        blurRadius={this.props.blurRadius}>
        {this.props.children}
      </Image>
    )
  }
}

const css = EStyleSheet.create({
  backgroundImage: {
    flex: 1,
    backgroundColor: "$primaryColor",
    width: null,
    height: null
  }
});

export default Background