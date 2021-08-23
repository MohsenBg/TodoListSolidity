// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract TodoList {
    uint256 public taskCount = 0;
    struct Task {
        uint256 id;
        string title;
        string content;
        bool completed;
    }
    mapping(uint256 => Task) public tasks;

    event TaskCreated(uint256 id, string title, string content, bool completed);
    event TaskCompleted(uint256 id, bool completed);

    constructor() public {
        createTask("first task", "why you didn't try make your own Tasks!");
    }

    function createTask(string memory _title, string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _title, _content, false);
        emit TaskCreated(taskCount, _title, _content, false);
    }

    function toggleCompleted(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.completed = !_task.completed;
        tasks[_id] = _task;
        emit TaskCompleted(_id, _task.completed);
    }
}
