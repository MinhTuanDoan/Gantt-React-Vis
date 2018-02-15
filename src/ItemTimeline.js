import React, { Component } from 'react';
import './App.js'
import Timeline from 'react-visjs-timeline'
import ItemEdit from './ItemEdit'
import Header from './Header'





  const getItemStyle = () => ({
      width: ``+ this.length +``,
      background: 'lightgreen'
      // background: isDragging ? 'lightgreen' : 'grey',
  });

// style={getItemStyle()}

class ItemTimeline extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedProject: this.props.selectedProject,
      editedItem: '',
      previoustime: '',
      secondtime: ''
    }
  }


  options = {
    width: '100%',
    height: '500px',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    zoomMax: 100000000000,
    orientation: 'top',
    selectable: true,
    stack: true,
    stackSubgroups: true,
    editable: true,
    multiselect: false,
    template: function (item, element, data) {
      // console.log("this is item in the options object\n", item)
      return '<div class="containTasks"><div class="draggingDots"></div><div>'+ item.content +'</div><div class="draggingDots"></div></div>';
      // return '<div>'+ item.content +'</div>';
    },

    onUpdate: (e) => {
      this.setState({editedItem: e})
    },
    onMove: (task, callback) => {
      // e.preventDefault();
      // console.log(
      //   task.start, task.end, task.id
      //   )
        const item = {
          content: this.props.content,
          start: task.start.toISOString().substring(0,10),
          end: task.end.toISOString().substring(0,10),
          completed: this.props.completed,
          id: this.props.id,
          belongs_to: this.props.belongs_to,
          project_id: this.props.project_id,
        } 
      this.props.editItem(item);
      // this.setState({editedItem: ""})
      // this.setState({item: ""})

    }
  }




  clickHandler = (item) => {
  }

  onUpdate = (e) => {
    console.log(e)
  }

  getEdits = (item) => {
    this.props.editItem(item);
    this.setState({editedItem: ""})
    // this.setState({items: ""})
  }

  render(){

    console.log(this.state, ' this is this.state')
    // console.log("ItemTimeLine state items", this.state.items, this.props.items, '<------- props')
    // console.log("ItemTimeLine Props", this.props)
    // this.props.selectedProject
    // Timeline.on(event, callback) => {
    //   console.log(event, callback)
    // }

    return (
      <div>
        <h1 onClick={this.clickHandler}>Hi</h1>
        <Header id={this.props.selectedProject[0].project_id} createItem={this.props.createItem} />
        <Timeline options={this.options}  items={this.props.selectedProject} />
        {this.state.editedItem ==="" ? null : <ItemEdit editedItem ={this.state.editedItem} getEdits={this.getEdits} deleteItem={this.props.deleteItem} /> }
      </div>
    );

  }
}
export default ItemTimeline;    
