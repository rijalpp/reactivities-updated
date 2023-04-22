import {
  action,
  makeAutoObservable,
  makeObservable,
  observable,
  runInAction
} from "mobx";
import { Activity } from "../modules/activity";
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
  title = "Hello from MobX!";
  // activities: Activity[] = [];
  activityRegistry = new Map<string, Activity>();
  selectedActivity: Activity | undefined = undefined; // Activity | null is called union type.
  editMode = false;
  loading = false;
  loadingInitial = true;

  constructor() {
    // makeObservable(this, {
    //     title: observable,
    //     setTitle: action // action.bound automatically binds the function to class if just setTitle() function name is used.
    // })
    // or
    makeAutoObservable(this);
  }

  // setTitle() {
  //     this.title = this.title+'!';
  // }

  // //making the arrow function automatically binds the setTitle to the class without using action.bound
  // setTitle = () => {
  //     this.title = this.title + '!';
  // }

  get activitiesByDate() {
    return Array.from(this.activityRegistry.values()).sort((a, b) =>
     Date.parse(a.date) - Date.parse(b.date));
  }

  loadActivities = async () => {
    try {
      const activities = await agent.Activities.list();

      activities.forEach((activity: Activity) => {
        activity.date = activity.date.split("T")[0];
        //this.activities.push(activity);
        this.activityRegistry.set(activity.id, activity);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  selectActivity = (id: string) => {
    // this.selectedActivity = this.activities.find(a => a.id === id);
    this.selectedActivity = this.activityRegistry.get(id);
  }

  cancelSelectedActivity = () => {
    this.selectedActivity = undefined;
  }

  openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
  }

  closeForm = () => {
    this.editMode = false;
  }

  createActivity = async (activity: Activity) => {
    this.loading = true;
    activity.id = uuid();
    try {
        await agent.Activities.create(activity);
        runInAction(() => {
            // this.activities.push(activity);
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.editMode = false;
            this.loading = false;
        })
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        });
    }
  }

  updateActivity = async (activity: Activity) => {
    this.loading = true;
    try {
        await agent.Activities.update(activity);
        runInAction(() => {
          // this.activities = [...this.activities.filter(a => a.id !== activity.id), activity];
          this.activityRegistry.set(activity.id, activity);
           this.selectedActivity = activity;
           this.editMode = false;
           this.loading = false;
        });
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        });
    }
  }

  deleteActivity = async (id: string) => {
    this.loading = true;
    try {
        await agent.Activities.delete(id);
        runInAction(() => {
           // this.activities = [...this.activities.filter(a => a.id !== id)];
           this.activityRegistry.delete(id);
            if (this.selectedActivity?.id === id) this.cancelSelectedActivity();
            this.loading = false;
        });
    } catch (error) {
        console.log(error);
        runInAction(() => {
            this.loading = false;
        });
    }
  }

}


