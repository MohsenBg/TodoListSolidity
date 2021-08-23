
const { assert } = require("console");


const TodoList = artifacts.require("./TodoList.sol");

contract('TodoList',(account)=>{
    before(async()=>{
        this.taskList = await TodoList.deployed();
    })

    it('deployed successfully' , async()=>{
        const address = await this.taskList.address
        assert(!(address,0X0))
        assert(!(address,""))
        assert(!(address,null))
        assert(!(address,undefined))
    })

    it('lists tasks', async()=>{
        const taskCount = await this.taskList.taskCount()
        const task = await this.taskList.tasks(taskCount)
        assert(task.id.toNumber(),taskCount.toNumber())
        assert(task.content, "why you didn't try make your own Tasks!")
    assert(task.completed, false)
    assert(taskCount.toNumber(), 1)
    })
    
    it("create tasks",async()=>{
        const result = await this.taskList.createTask("second task","A new task")
        const taskCount = await this.taskList.taskCount()
        const event = result.logs[0].args
        //console.log(result)
        assert(taskCount,2)
        assert(event.id.toNumber(), 2)
        assert(event.title, "second task")
    assert(event.content, 'A new task')
    assert(event.completed, false)
    })

    it('toggles task completion', async () => {
        const result = await this.taskList.toggleCompleted(1)
        const task = await this.taskList.tasks(1)
        assert(task.completed, true)
        const event = result.logs[0].args
        assert(event.id.toNumber(), 1)
        assert(event.completed, true)
      })

})