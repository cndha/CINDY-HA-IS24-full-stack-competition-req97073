import { useState, useEffect } from 'react';
import axios from 'axios';

function DataTable(props) {
  const [selectProductId, setSelectProductId] = useState();
  const [edit, setEdit] = useState(false);
  const [editField, setEditField] = useState({
    productName: props.productName,
    productOwnerName: props.productOwnerName,
    developers: props.developers,
    scrumMasterName: props.scrumMasterName,
    startDate: props.startDate,
    methodology: props.methodology
  })


  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    // console.log(key, val);

    return setEditField({
      ...editField,
      [key]: val,
    });
  }

  const updateData = async (e) => {
    e.preventDefault();

    const sendData = {
      productId: selectProductId,
      productName: editField.productName,
      productOwnerName: editField.productOwnerName,
      developers: editField.developers.split(","),
      scrumMasterName: editField.scrumMasterName,
      startDate: editField.startDate,
      methodology: editField.methodology
    };
    console.log("data to send", sendData);

    await axios.patch(`/api/products/${selectProductId}`, sendData)
      .then(res => {
        setEdit(false);
        props.getFunction();
        console.log("PATCH WORKED", res);
      })
      .catch(err => console.log(err))
  }

  return (
    <tr className="text-left align-top font-medium text-md">
      <td>{props.productId}</td>
      <td>{props.productName}</td>
      <td>{props.productOwnerName}</td>
      {/* <p className="">{props.developers}</p> */}
      {/* {props.developers.map(d => {
        return (
          <td className="">{d}</td>
        )
      })} */}
      {props.developers.length > 1 ? (
        <td className="pb-[60px] leading-normal">
        {props.developers[0]}
        <br />
        {props.developers[1]}
        <br />
        {props.developers[2]}
        <br />
        {props.developers[3]}
        <br />
        {props.developers[4]}
      </td>
      ) : (
        <td>{props.developers}</td>
      )}
      <td>{props.scrumMasterName}</td>
      <td>{props.startDate}</td>
      <td>{props.methodology}</td>
      <button
        className="bg-[#234075] text-white text-xs font-sans font-bold tracking-wider rounded-[20px] px-4 py-2"
        onClick={() => { setEdit(true); setSelectProductId(props.productId); }}
      >
        EDIT
      </button>
    </tr>
    // <div className="mb-[40px]">
    //   {!edit ? (
    //     <tr>
    //       <td className="">{props.productId}</td>
    //       <td className="">{props.productName}</td>
    //       <td className="">{props.productOwnerName}</td>
    //       {/* <p className="">{props.developers}</p> */}
    //       {props.developers.map(d => {
    //         return (
    //           <td className="">{d}</td>
    //         )
    //       })}
    //       <td className="">{props.scrumMasterName}</td>
    //       <td className="">{props.startDate}</td>
    //       <td className="">{props.methodology}</td>
    //       <button
    //         className="bg-[#234075] text-white text-xs font-sans font-bold tracking-wider rounded-[20px] px-4 py-2"
    //         onClick={() => { setEdit(true); setSelectProductId(props.productId); }}
    //       >
    //         EDIT
    //       </button>
    //     </tr>
    //   ) : (
    //     <>
    //       <form onSubmit={updateData}>
    //         <div className="mb-24">
    //           <div className="mb-8">
    //             <label className="font-rococo text-gray-600 text-sm">
    //               Product Name
    //             </label>
    //           </div>
    //           <input
    //             type="text"
    //             name="productName"
    //             className="rounded-lg border border-gray-200 bg-gray-100 p-16 text-sm focus:border-gray-400 focus:ring-0 hover:border-gray-400"
    //             value={editField.productName}
    //             onChange={handleChange}
    //             required
    //           />
    //           <input
    //             type="text"
    //             name="productOwnerName"
    //             className="rounded-lg border border-gray-200 bg-gray-100 p-16 text-sm focus:border-gray-400 focus:ring-0 hover:border-gray-400"
    //             value={editField.productOwnerName}
    //             onChange={handleChange}
    //             required
    //           />
    //           <input
    //             type="text"
    //             name="developers"
    //             className="rounded-lg border border-gray-200 bg-gray-100 p-16 text-sm focus:border-gray-400 focus:ring-0 hover:border-gray-400"
    //             value={editField.developers}
    //             onChange={handleChange}
    //             required
    //           />
    //           <input
    //             type="text"
    //             name="scrumMasterName"
    //             className="rounded-lg border border-gray-200 bg-gray-100 p-16 text-sm focus:border-gray-400 focus:ring-0 hover:border-gray-400"
    //             value={editField.scrumMasterName}
    //             onChange={handleChange}
    //             required
    //           />
    //           <input
    //             type="text"
    //             name="startDate"
    //             className="rounded-lg border border-gray-200 bg-gray-100 p-16 text-sm focus:border-gray-400 focus:ring-0 hover:border-gray-400"
    //             value={editField.startDate}
    //             onChange={handleChange}
    //             required
    //           />
    //           <input
    //             type="text"
    //             name="methodology"
    //             className="rounded-lg border border-gray-200 bg-gray-100 p-16 text-sm focus:border-gray-400 focus:ring-0 hover:border-gray-400"
    //             value={editField.methodology}
    //             onChange={handleChange}
    //             required
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           className="p-2 bg-[#C1E8E0] text-md font-bold text-black"
    //         >Patch</button>
    //       </form>
    //     </>
    //   )}

    // </div>
  )
};

export default DataTable;