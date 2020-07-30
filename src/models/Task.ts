interface Task {
  id: string;
  label: string;
  activeFrom: number;
  icon: any;
  expiresAt: number | null;
  finished: boolean;
  finishedAt: number | null;
}

export default Task;
