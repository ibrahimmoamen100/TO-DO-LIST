import React, { Component } from 'react'
import './Testing.css'
import Menu, { SubMenu, MenuItem } from 'rc-menu';


export default class Testing extends Component {
  state = {
    name: '',
    tasks: [
      { id: 1, title: 'go to gym', done: false, showMenu: false },
      { id: 2, title: 'go to school', done: false, showMenu: false },
      { id: 3, title: 'do your homework', done: false, showMenu: false },
      { id: 4, title: 'go to job', done: false, showMenu: false }
    ],
    showMenu: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      name: '',
      age:'hello world'
    })
  }

  handleChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  handleClick = () => {
    this.state.name === '' ? alert('Task Can Not Be Empty') :
      this.setState({
        tasks: [
          ...this.state.tasks,
          {
            id: Math.random() * 10, title: this.state.name, done: false
          }
        ]
      })
  }

  handleKeyUp = e => {
    const eleValue = e.target.value
    const ele = e.target

    ele.style.width = eleValue.length > 13 ? (eleValue.length * 8) + 40 + 'px' : '200px';
    const widthNow = ele.getBoundingClientRect().width
    console.log(widthNow)
    // ele.style.height = eleValue.length * 8 + 40 > (600 / eleValue.length === 1) ? height + 37.46494 + 'px' : height + 'px'

  }

  render() {
    // const input = document.getElementById('input')
    const deleteItems = (id) => {
      let items = this.state.tasks.filter(item => {
        return item.id !== id
      })
      this.setState({
        tasks: items
      })

    }
    document.addEventListener('DOMContentLoaded', () => {

      // let taskContents = document.querySelectorAll('#task_content_list')
      let contextMenuContainer = document.querySelector('.contextMenu_container')

      document.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        console.log('hello from contextmenu', contextMenuContainer)
        // alert('you tried to open contextmenu')


      })



    });

    const handleCheckbox = (id) => {
      const myDones = this.state.tasks.map(item => {
        if (id === item.id) {
          console.log('yes its equal id')
          return { ...item, done: !item.done }
        } else {
          return item
        }
      })
      console.log(myDones)
      this.setState({ tasks: myDones })
    }

    const todoRow = () => {
      return (
        this.state.tasks.length ?
          (this.state.tasks.map(task =>
          (

            <li id="task_content_list" className={`list-group-item w-100  d-flex justify-content-between align-items-center gap-5 ${task.done ? 'completed' : ''}`}
              key={task.id} >

              <span className='d-flex flex-wrap fs-5 task_content' style={{ wordWrap: 'breakWord' }}>{task.title}</span>
              <div className=' form-group d-flex justify-content-end deleted_container'>
                <div className="form-check checkbox-sm" id="checkbox-form">
                  <input className="form-check-input checkbox_inputs"
                    checked={task.done} onChange={() => handleCheckbox(task.id)}
                    autoComplete="off" type="checkbox" value="" id="flexCheckDefault" />
                </div>
                <button onClick={() => deleteItems(task.id)} className='btn btn-danger btn-sm px-2 pt-1 pr-1 deleted '>x</button>
              </div>
            </li>
          )
          ))

          :
          (<span className="fs-5 ">There is no Task to Show..!!</span>)
      )
    }










    return (
      <div>

        <header className="App-header container-fluid">
          <div className={`contextMenu_container ${this.state.showMenu ? 'showMenus' : ''}`}>
            <button>hello</button>
            <button>welcome</button>
          </div>
          <form action="" className="w-100" onSubmit={this.handleSubmit}>
            <h1 className='h1'>Simple To Do List</h1>
            <div className="input-group justify-content-center ">
              <input type="text" className='form-control flex-10' id='input' placeholder='Type Task'
                onKeyUp={this.handleKeyUp} onChange={this.handleChange} value={this.state.name} />
              <button className='btn btn-primary d-inline' onClick={this.handleClick}>Add </button>
            </div>
          </form>
          <ul className='list-group pt-5 ' id='task_container' style={{ emptyCells: 'hide', wardWrap: 'breakWord' }}>
            {todoRow()}

          </ul>
        </header>
      </div>
    )
  }
}
