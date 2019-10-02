import React , {useState , useEffect} from "react";
import './inventory.css';
import MaterialTable from 'material-table';
const Inventory = props =>{
const[state,setState] =useState({
  columns: [],
  data:[]
})

  useEffect(()=>{
    fetch('/inventory' )
    .then(function(response){
       return response.json()
      })
    .then(function(data){ 
      setState({columns: [
        { title: 'Product', field: 'product_name' },
        { title: 'Price', field: 'product_price' },
        { title: 'Quantity', field: 'product_quantity' }
      ],
      data:data});
      console.log("stateeee ", state);
          
    })
    .catch(error=> console.log(error));
  })
      return (
        <MaterialTable
        class="table"
          title="Inventory Table"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.push(newData);
                  setState({ ...state, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data[data.indexOf(oldData)] = newData;
                  setState({ ...state, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...state.data];
                  data.splice(data.indexOf(oldData), 1);
                  setState({ ...state, data });
                }, 600);
              }),
          }}
        />
        
      );

}
export default Inventory;
