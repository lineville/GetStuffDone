"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _icons = require("@material-ui/icons/");

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _styles = require("@material-ui/core/styles");

var _colors = require("@material-ui/core/colors/");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// import styles from "../CSS/notification";
var variantIcon = {
  success: _icons.CheckCircle,
  warning: _icons.Warning,
  error: _icons.Error,
  info: _icons.Info
};

var Notification = function Notification(props) {
  var classes = props.classes,
      className = props.className,
      message = props.message,
      onClose = props.onClose,
      variant = props.variant,
      other = _objectWithoutProperties(props, ["classes", "className", "message", "onClose", "variant"]);

  var Icon = variantIcon[variant];
  return _react["default"].createElement(_SnackbarContent["default"], _extends({
    className: (0, _classnames["default"])(classes[variant], className),
    "aria-describedby": "client-snackbar",
    message: _react["default"].createElement("span", {
      id: "client-snackbar",
      className: classes.message
    }, _react["default"].createElement(Icon, {
      className: (0, _classnames["default"])(classes.icon, classes.iconVariant)
    }), message),
    action: [_react["default"].createElement(_IconButton["default"], {
      key: "close",
      "aria-label": "Close",
      color: "inherit",
      className: classes.close,
      onClick: onClose
    }, _react["default"].createElement(_icons.Close, {
      className: classes.icon
    }))]
  }, other));
};

Notification.propTypes = {
  classes: _propTypes["default"].object.isRequired,
  className: _propTypes["default"].string,
  message: _propTypes["default"].node,
  onClose: _propTypes["default"].func,
  variant: _propTypes["default"].oneOf(["success", "warning", "error", "info"]).isRequired
};

var styles = function styles(theme) {
  return {
    success: {
      backgroundColor: _colors.green[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: theme.palette.primary.dark
    },
    warning: {
      backgroundColor: _colors.amber[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
    },
    message: {
      display: 'flex',
      alignItems: 'center'
    },
    margin: {
      margin: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit
    },
    leftIcon: {
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      marginLeft: theme.spacing.unit
    }
  };
};

var _default = (0, _styles.withStyles)(styles)(Notification);

exports["default"] = _default;

//# sourceMappingURL=Notification.jsx.map