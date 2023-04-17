import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/modules/activity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}
export default function ActivityDashboard({activities, selectedActivity, deleteActivity,
     selectActivity, cancelSelectActivity, editMode, openForm, closeForm, createOrEdit}: Props) {
  //semantic-ui-react Grid.Column has 16 columns unlike bootstrap which as 12 columns.
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList activities={activities}
         selectActivity={selectActivity}
         deleteActivity={deleteActivity}/>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedActivity && !editMode &&
        <ActivityDetails
         activity={selectedActivity}
         cancelSelectedActivity={cancelSelectActivity}
         openForm={openForm}
        />
        }
        {editMode &&
        <ActivityForm activity={selectedActivity} closeForm={closeForm} createOrEdit={createOrEdit}  />}
      </Grid.Column>
    </Grid>
  );
}
