import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  touchable: {
    overflow: 'hidden',
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});

const IOS7_BLUE = '#007AFF';

const isString = (value) => (typeof value === 'string' || value instanceof String);

export default function createIconButtonComponent(Icon) {
  return class IconButton extends PureComponent {
    static propTypes = {
      backgroundColor: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      borderRadius: PropTypes.number,
      color: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      size: PropTypes.number,
      iconStyle: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      style: PropTypes.any, // eslint-disable-line react/forbid-prop-types
      children: PropTypes.node,
    };

    static defaultProps = {
      backgroundColor: IOS7_BLUE,
      borderRadius: 5,
      color: 'white',
      size: 20,
    };

    render() {
      const { style, iconStyle, children, ...restProps } = this.props;

      let props = restProps;

      const iconProps = {};
      Object.keys(Text.propTypes)
        .concat(['style','name','size','color'])
        .forEach( key => {
          ({[key]: iconProps[key], ...props} = props)
        });

      const touchableProps = {};
      Object.keys(TouchableHighlight.propTypes)
        .forEach( key => {
          ({[key]: touchableProps[key], ...props} = props)
        });

      let dummy;
      ['iconStyle','borderRadius','backgroundColor'].forEach( key => {
        ({[key]: dummy, ...props} = props)
      });
      iconProps.style = iconStyle ? [styles.icon, iconStyle] : styles.icon;

      const colorStyle = {};
      ['color'].forEach( key => {
        ({[key]: colorStyle[key]} = this.props)
      });

      const blockStyle = {};
      ['backgroundColor', 'borderRadius'].forEach( key => {
        ({[key]: blockStyle[key]} = this.props)
      });

      return (
        <TouchableHighlight
          style={[styles.touchable, blockStyle]}
          {...touchableProps}
        >
          <View style={[styles.container, blockStyle, style]} {...props}>
            <Icon {...iconProps} />
            {isString(children) ? (
              <Text style={[styles.text, colorStyle]}>{children}</Text>
            ) : (
              children
            )}
          </View>
        </TouchableHighlight>
      );
    }
  };
}
