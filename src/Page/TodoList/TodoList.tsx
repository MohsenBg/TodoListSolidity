import React, { useEffect, useState } from "react";
import WalletImg from "../../assets/other/wallet02.png";
import "./TodoList.scss";
import {
  ABI_CONTRACT_TODO_LIST,
  ADDRESS_CONTRACT_TODO_LIST,
} from "../.././config";
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../../Redux/store";
import { HiBadgeCheck } from "react-icons/hi";
import Loading from "../../assets/other/Infinity-1.4s-51px .svg";
import { ActionTypeLoading } from "../../Redux/Loading/Actions";

const TodoList = () => {
  const [todoListContract, setTodoListContract] = useState<any>("");
  const [render, setRender] = useState(false);
  const [taskCount, setTaskCount] = useState(1);
  const [tasks, setTasks] = useState<any>([]);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");
  //const [render, setRender] = useState(false);
  //const [render, setRender] = useState(false);

  //--------------------------------------

  const Web3 = useSelector(
    (state: typeof initialState) => state.AccountData.Web3
  );
  const Accounts = useSelector(
    (state: typeof initialState) => state.AccountData.addressAccount
  );
  const dispatch = useDispatch();
  useEffect(() => {
    async function Check() {
      dispatch({ type: ActionTypeLoading.ON_LOADING });
      if (Web3 !== "") {
        const TodoListContact = await new Web3.eth.Contract(
          ABI_CONTRACT_TODO_LIST,
          ADDRESS_CONTRACT_TODO_LIST
        );
        console.log(TodoListContact);

        const taskCount = await TodoListContact.methods.taskCount().call();
        let Tasks = [];
        for (let i = 1; i <= taskCount; i++) {
          const task = await TodoListContact.methods.tasks(i).call();
          Tasks.push(task);
        }
        setTasks(Tasks);
        console.log(Tasks);
        setTodoListContract(TodoListContact);
        setTaskCount(taskCount);
        setRender(true);
      } else {
        setRender(false);
      }
    }
    Check();

    dispatch({ type: ActionTypeLoading.END_LOADING });
  }, [Web3]);

  const CreateTask = () => {
    if (titleInput.length > 0 && contentInput.length > 1)
      dispatch({ type: ActionTypeLoading.ON_LOADING });
    //@ts-ignore
    todoListContract.methods
      .createTask(titleInput, contentInput)
      .send({ from: Accounts })
      .once("receipt", (receipt: any) => {
        dispatch({ type: ActionTypeLoading.END_LOADING });
        window.location.reload();
      });
  };

  const CompletedTask = async (id: any) => {
    dispatch({ type: ActionTypeLoading.ON_LOADING });

    await todoListContract.methods
      .toggleCompleted(id)
      .send({ from: Accounts })
      .once("receipt", (receipt: any) => {
        window.location.reload();
      });
    dispatch({ type: ActionTypeLoading.END_LOADING });
  };

  return (
    <>
      {render ? (
        <div className="containerTodoList">
          <div className="imgAccountDiv">
            <img className="imgAccount" src={WalletImg} alt="ImgAccount" />
          </div>
          <div className="address">
            Account address <br />
            <span className="addressAccount">{Accounts}</span>
          </div>
          <span className="titleAddTask">Add your task</span>
          <div className="inputTitle">
            <input
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              type="text"
              placeholder="Title"
            />
          </div>
          <div className="inputContent">
            <textarea
              value={contentInput}
              onChange={(e) => setContentInput(e.target.value)}
              placeholder="your task"
            />
          </div>
          <div className="btnAddTask">
            <div onClick={CreateTask}>Add Task</div>
          </div>
          <div className="AllTaskList">
            {tasks.map((item: any) => {
              return (
                <div key={item.id} className="cardTaskList">
                  <div className="title">
                    <span>{item.title}</span>
                  </div>
                  <span className="content">{item.content}</span>
                  <div className="statusOfTask">
                    <div>
                      {item.completed ? (
                        <div>
                          <HiBadgeCheck />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div>
                          <img src={Loading} alt="Loading" />
                          <span style={{ color: "rgb(233,12,89)" }}>
                            Processing
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {!item.completed ? (
                    <div className="btnTask">
                      <div onClick={() => CompletedTask(item.id)}>
                        Task complete
                      </div>
                    </div>
                  ) : (
                    <div className="btnTask">
                      <div onClick={() => CompletedTask(item.id)}>
                        on Process
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default TodoList;
