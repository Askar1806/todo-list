interface ITask {
    text: string;
    id: string;
    isDone: boolean;
    description: null | string;
    createdTime: string;
};

export default ITask;