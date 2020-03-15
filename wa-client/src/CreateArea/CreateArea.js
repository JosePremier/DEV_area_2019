import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Redirect} from "react-router-dom"
import AreaAppBar from "../components/AppBar";
import AreaFooter from "../components/Footer";
import api from "../api";
import DialogSelect from "./DialogSelect";
import { createAreaStyles } from "../styles/styles";
import { useAuth } from "../context/auth";
import { useTheme } from "@material-ui/core";

export default function CreateArea() {
    const [redirect, setRedirect] = useState(false);
    const [user, setUser] = useState(null);
    const [action, setAction] = useState("");
    const [reaction, setReaction] = useState("");
    const [services, setServices] = useState(null);
    const { clearToken } = useAuth();
    const classes = createAreaStyles(useTheme);

    useEffect(() => {
        api.getCurrentUser().then(res => {
            if (res.status === 200)
                setUser(res.data.user ? res.data.user : null);
        }).catch(err => {
            console.error(err);
            clearToken();
        })
    }, [clearToken]);

    useEffect(() => {
        api.getAllServices().then(res => {
            if (res.status === 200) {
                setServices(res.data)
            }
        }).catch(err => {
            console.error(err);
        })
    }, []);

    const handleSubmit = () => {
        if (action !== "" && reaction !== "") {
            api.createArea(localStorage.token, action, reaction).then(res => {
                if (res.status === 200) {
                    setRedirect(true);
                    alert('Area created');
                }
            }).catch(err => {
                alert('Area creation failed');
                console.error(err);
            });
        } else {
            alert('Please submit value for action and reaction');
        }
    };

    if (redirect)
        return <Redirect to={'/dashboard'}/>;
    else
        return (
          <React.Fragment>
              <CssBaseline/>
              <AreaAppBar classes={classes}/>
              <main>
                  {/* Hero unit */}
                  <div>
                      <Container maxWidth="sm" >
                          <Typography component="h1" variant="h2" align="center" className={classes.title} gutterBottom>
                              Create your own.
                          </Typography>
                          <Typography variant="h5" align="center" color="textSecondary" paragraph>
                              Configure a new AREA
                          </Typography>
                          <div className={classes.bodyContent}>
                              <Typography component="h1" variant="h2"  color="textPrimary" gutterBottom className={classes.typo}>
                                  IF
                              </Typography>
                              <DialogSelect
                                value={"THIS"}
                                type={"actions"}
                                onValueChange={(action) => {
                                    setAction(action);
                                }}
                                user={user}
                                services={services}
                              />
                              <Typography component="h1" variant="h2" align="left" color="textPrimary" gutterBottom className={classes.typo}>
                                  THEN
                              </Typography>
                              <DialogSelect
                                value={"THAT"}
                                type={"reactions"}
                                onValueChange={(reaction) => {
                                    setReaction(reaction);
                                }}
                                user={user}
                                services={services}
                              />
                          </div>
                          <div className={classes.heroButtons}>
                              <Grid container spacing={2} justify="center">
                                  <Grid item>
                                      <Button variant="contained" onClick={() => {
                                          setRedirect(true)
                                      }} className={classes.button} >
                                          Cancel
                                      </Button>
                                  </Grid>
                                  <Grid item>
                                      <Button variant="contained" onClick={ handleSubmit }>
                                          Validate
                                      </Button>
                                  </Grid>
                              </Grid>
                          </div>
                      </Container>
                  </div>
                  <Container className={classes.cardGrid} maxWidth="md">
                      {/* End hero unit */}
                      <Grid container spacing={4}>
                      </Grid>
                  </Container>
              </main>
              <AreaFooter classes={classes}/>
          </React.Fragment>
        );
}