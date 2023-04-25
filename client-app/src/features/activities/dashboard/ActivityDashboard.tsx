import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";


export default observer(function ActivityDashboard() {
  //semantic-ui-react Grid.Column has 16 columns unlike bootstrap which as 12 columns.
  const { activityStore } = useStore();
  const {loadActivities, activityRegistry} = activityStore;

  useEffect(() => {
   if (activityRegistry.size <= 1) loadActivities();
  }, [loadActivities, activityRegistry]); //passing activityStore as the dependency to useEffect. 

  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app' inverted={false} />

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activities Filters</h2>
      </Grid.Column>
    </Grid>
  );
});
