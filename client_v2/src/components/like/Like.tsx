import React, {ReactNode} from "react";
import {IconButton} from "@material-ui/core";
import {Message, ThumbDown, ThumbUp} from "@material-ui/icons";

interface IProps {
  iconType?: string;
  count?: any;
  children?: ReactNode;
}

const Like: any = (props:IProps) => {
  let icon: any;

  switch (props.iconType) {
    case 'like':
      icon = <ThumbUp/>;
      break;
    case 'dislike':
      icon = <ThumbDown/>;
      break;
    case 'comment':
      icon = <Message/>
  }

  return (
    <IconButton color={props.iconType == 'dislike' ? "secondary" : "primary"} >
      { icon } &nbsp; {props.count}
    </IconButton>
);
};

export default Like;