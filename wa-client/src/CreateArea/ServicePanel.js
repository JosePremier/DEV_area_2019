import React, {useEffect, useState} from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TwitterAuth from "../auth/TwitterAuth";
import { panelStyles } from "../styles/styles";
import {useTheme} from "@material-ui/core";

export default function ServicePanel(props) {
  const classes = panelStyles(useTheme);
  const [selected, setSelected] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  let index = 0;

  useEffect(() => {
    if (props.user.twitter_token !== "")
      setIsLogged(true)
  }, [props.user]);

  const handleListItemClick = (event, value) => {
    setSelected(value);
    props.onValueChange(value);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.service.name}</Typography>
        </ExpansionPanelSummary>
            {/*{ ComponentMap[props.service.name] }*/}
            { isLogged ?
              <div className={classes.rootList}>
                <List component="nav" aria-label="main mailbox folders">
                  { props.service[props.type] && Object.keys(props.service[props.type]).map(key => {
                    const value = props.service[props.type][key].value;

                    return (
                      <ListItem
                        key={index++}
                        button
                        selected={selected === value}
                        onClick={ event => handleListItemClick(event, value)}
                      >
                        <ListItemText primary={props.service[props.type][key].label} />
                      </ListItem>
                    );
                  }) }
                </List>
              </div>
              :
              <TwitterAuth handleSuccess={() => {setIsLogged(true)}}/>
            }
      </ExpansionPanel>
    </div>
  );
}