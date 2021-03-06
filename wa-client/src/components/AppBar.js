import React from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import LineWeightIcon from '@material-ui/icons/LineWeight';
import {dashboardStyles} from "../styles/styles";
import { useAuth } from "../context/auth";
import api from '../api'

export default function AreaAppBar(props) {
    const classes = dashboardStyles();
    const {clearToken} = useAuth();

    const handleLogout = () => {
        api.logout().then(res => {
            if (res.status === 200) {
                clearToken();
                window.location.reload();
            }
        }).catch(err => {
            console.error(err)
        })
    };

    return (
      <AppBar position="relative" className={classes.appBar}>
          <Toolbar>
              <div>
                  <IconButton color="inherit" href={"/"} >
                      <Badge color="secondary">
                          <LineWeightIcon/>
                      </Badge>
                  </IconButton>
              </div>
              <div>
                  <Typography variant="h6" style={{fontWeight: 900}} noWrap>
                      AREA
                  </Typography>
              </div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                  <IconButton color="inherit" onClick={handleLogout}>
                      <Badge color="secondary">
                          <PowerSettingsNew/>
                      </Badge>
                  </IconButton>
              </div>
          </Toolbar>
      </AppBar>
    );
}