import React, { Component } from "react";
import { View, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Carousel from "react-native-snap-carousel";

class OptionCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      date: new Date()
    };
  }

  onDateChange = date => {
    this.setState({ date: date });
  };

  render() {
    return (
      <View style={css.container}>

        <View style={[css.borderContainer, this.props.borderContainerStyle]}>

          <Text style={css.textStyle}>{this.props.label}</Text>

          <View style={css.switchContainer}>

            <Carousel
              showsHorizontalScrollIndicator={false}
              sliderWidth={EStyleSheet.value("65%", "width")}
              itemWidth={EStyleSheet.value("30%", "width")}
              inactiveSlideOpacity={0.35}
              inactiveSlideScale={0.6}
              swipeThreshold={1}
              animationOptions={{ duration: 100 }}
              contentContainerCustomStyle={css.carouselContentContainer}
            >

              <Text
                style={{
                  textAlign: "center",
                  width: EStyleSheet.value("30%", "width")
                }}
              >
                System 1 sdfdsf
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: EStyleSheet.value("30%", "width")
                }}
              >
                System 2 sdf 
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: EStyleSheet.value("30%", "width")
                }}
              >
                System 3sdf sdf s
              </Text>

            </Carousel>

          </View>

        </View>

      </View>
    );
  }
}

const css = EStyleSheet.create({
  $fontHeight: "2.6%",
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "5%"
  },
  borderContainer: {
    borderColor: "$filterItemBorderColor",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    height: "8%"
  },
  switchContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  textStyle: {
    backgroundColor: "transparent",
    fontSize: "$fontHeight",
    color: "$switchFontColor",
    minWidth: 80
  },
  carouselContentContainer: {
    alignItems: "center"
  }
});

export default OptionCarousel;
