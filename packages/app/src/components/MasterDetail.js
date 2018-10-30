import React, { Component } from "react";
import PropTypes from "prop-types";
import { Group } from "@offcourse/atoms";
class Detail extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children, ...rest } = this.props;
    return (
      <Group
        minWidth={["100%", "100%", "25rem"]}
        width={["100%", "100%", "55rem"]}
        maxWidth={["100%", "100%", "55rem"]}
        height="calc(100vh - 2.25rem)"
        overflow={"hidden scroll"}
        mr={0}
        flex="3"
        flexDirection="column"
        justifyContent="stretch"
        alignItems="stretch"
        px={6}
        pb={[6, 6, "4rem"]}
        {...rest}
      >
        {children}
      </Group>
    );
  }
}

class Master extends Component {
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children, visible } = this.props;
    return (
      <Group
        display={visible ? ["flex", "flex", "flex"] : ["none", "none", "flex"]}
        alignItems="stretch"
        position="sticky"
        flex="none"
        p={6}
      >
        {children}
      </Group>
    );
  }
}

export default class MasterDetail extends Component {
  static Master = Master;
  static Detail = Detail;
  static propTypes = {
    children: PropTypes.node
  };
  render() {
    const { children } = this.props;
    return (
      <Group
        flexDirection={["column", "row", "row"]}
        alignItems={["center", "flex-start", "flex-start"]}
        bg={["white", "grayScale.1", "grayScale.1"]}
        width={["100%", "100%", "auto"]}
        height="calc(100vh - 2.25rem)"
        overflow="hidden"
      >
        {children}
      </Group>
    );
  }
}
