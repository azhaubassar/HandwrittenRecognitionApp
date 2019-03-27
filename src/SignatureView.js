import React, {
  Component, PropTypes
} from 'react';

import ReactNative, {
  View, Text, Modal, Platform, Alert, StyleSheet, TouchableHighlight
} from 'react-native';

import SignatureCapture from 'react-native-signature-capture';

const toolbarHeight = Platform.select({
  android: 0,
  ios: 22
});

const modalViewStyle = {
  paddingTop: toolbarHeight,
  flex: 1
};

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});

class SignatureView extends Component {

  static propTypes = {
    onSave: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };
  }

  show(display) {
    this.setState({visible: display});
  }

  render() {
    const {visible} = this.state;

    return (
      <Modal transparent={false} visible={visible} onRequestClose={this._onRequreClose.bind(this)}>
        <View style={modalViewStyle}>
          <View style={{padding: 10, flexDirection: 'row'}}>
            <Text onPress={this._onPressClose.bind(this)}>{' x '}</Text>
            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={{fontSize: 14}}>Please write </Text>
            </View>
          </View>
          <SignatureCapture
              style={{flex: 1, width: '100%'}}
              showBorder={true}
              viewMode={"portrait"}
              showNativeButtons={false}
              saveImageFileInExtStorage={false}
              ref="sign"
              showTitleLabel={false}
            onDragEvent={this._onDragEvent.bind(this)}
            onSaveEvent={this._onSaveEvent.bind(this)}
          />

            <View style={{ flex: 1, flexDirection: "row" }}>
                <TouchableHighlight style={styles.buttonStyle}
                                    onPress={() => { this.saveSign() } } >
                    <Text>Save</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonStyle}
                                    onPress={() => { this.resetSign() } } >
                    <Text>Reset</Text>
                </TouchableHighlight>

            </View>
        </View>
      </Modal>
    );
  }

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onPressClose() {
    console.log('closed')
    this.show(false);
  }

  _onRequreClose() {
    this.show(false);
  }

  _onDragEvent() {
    // This callback will be called when the user enters signature
   console.log("dragged");
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
      console.log('saved je', result);
    this.props.onSave && this.props.onSave(result);
  }
}

export default SignatureView;
