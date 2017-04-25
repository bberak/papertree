import React, { Component, } from 'react'
import { View, Dimensions, Image, StyleSheet } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';

class Background extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    
    let images = [],  
    index = 0,
    imgWidth = 24,
    imgHeight = 12,
    winWidth = Dimensions.get('window').width,
    winHeight = Dimensions.get('window').height;

    for (var row = 0; row < Math.ceil(winHeight / imgHeight); row++) {    
      let top = row * imgHeight;
      for (var col = 0; col <Math.ceil(winWidth / imgWidth); col++){
        let left = col * imgWidth;
        images.push(<Image key={index} source={require("../images/tile.png")} style={{position: 'absolute', top: top, left: left}} />);
        index++;
      }
    }
    
    return (
        <View style={[css.container, this.props.containerStyle]}>
        
          {images}
        
          <View style={css.body}>
            {this.props.children}
          </View>
        
        </View>
    )
  }
}

const css = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "$primaryColor"
  },
  body: {
    position: "relative",
    flex: 1
  }
});



export default Background