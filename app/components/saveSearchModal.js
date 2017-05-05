import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";

class SaveSearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onClose}>
        <Modal
          onModalHide={this.props.onClosed}
          backdropOpacity={0.2}
          isVisible={this.props.visible}
        >

          <View style={css.container}>
            <View style={css.form}>
              <TouchableWithoutFeedback>
                <View>
                  <Text style={{ backgroundColor: "transparent" }}>
                    Hello!
                  </Text>
                  <Text style={{ backgroundColor: "transparent" }}>
                    Hello!
                  </Text>

                  <TouchableOpacity
                    onPress={() => alert("Clicked")}
                    activeOpacity={0.5}
                  >
                    <Text style={{ backgroundColor: "transparent" }}>
                      Click me!
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ backgroundColor: "transparent" }}>
                    Hello!
                  </Text>
                  <Text style={{ backgroundColor: "transparent" }}>
                    Hello!
                  </Text>
                  <Text style={{ backgroundColor: "transparent" }}>
                    Hello!
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          <TouchableOpacity onPress={this.props.onClose} activeOpacity={0.95}>
            <View style={css.cancelButton}>

              <Text style={css.cancelText}>
                Cancel
              </Text>

            </View>
          </TouchableOpacity>

        </Modal>

      </TouchableWithoutFeedback>
    );
  }
}

const css = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end"
  },
  form: {
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  cancelButton: {
    height: 57,
    borderRadius: 12,
    backgroundColor: "white",
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  cancelText: {
    backgroundColor: "transparent",
    color: "#007AFF",
    fontSize: 20,
    lineHeight: 20,
    fontWeight: "500"
  }
});

export default SaveSearchModal;
