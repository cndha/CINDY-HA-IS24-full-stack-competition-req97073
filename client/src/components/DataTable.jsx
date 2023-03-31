import { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

function DataTable(props) {
  const [edit, setEdit] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true); //save changes btn
  const [selectProductId, setSelectProductId] = useState();
  const [editField, setEditField] = useState({
    productName: props.productName,
    productOwnerName: props.productOwnerName,
    developerOne: props.developers[0],
    developerTwo: props.developers[1],
    developerThree: props.developers[2],
    developerFour: props.developers[3],
    developerFive: props.developers[4],
    scrumMasterName: props.scrumMasterName,
    startDate: props.startDate,
    methodology: props.methodology
  })


  const handleChange = (e) => {
    setDisableBtn(false);

    const key = e.target.name;
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    //new state obj
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
      developers: [editField.developerOne, editField.developerTwo, editField.developerThree, editField.developerFour, editField.developerFive],
      scrumMasterName: editField.scrumMasterName,
      startDate: editField.startDate,
      methodology: editField.methodology
    };

    await axios.patch(`/api/products/${selectProductId}`, sendData)
      .then(res => {
        console.log(res);
        setEdit(false); //close edit modal
        props.getFunction(); //display new data
        setDisableBtn(true); //change btn color
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <tr className="text-left align-top font-medium text-md">
        <td>{props.productId}</td>
        <td>{props.productName}</td>
        <td>{props.productOwnerName}</td>
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

      {edit && (
        <Modal
          isOpen={edit}
          parentSelector={() => document.body}
        >
          <div className="flex flex-col items-center px-[24px] py-[16px]">
            <p className="mb-[44px] text-[#65769c] text-md font-bold leading-wider">EDIT PRODUCT ID: {selectProductId}</p>

            <form onSubmit={updateData}>
              <div className="grid grid-cols-2 gap-[44px]">

                <div className="col-start-1 col-span-1">
                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xs font-bold leading-wider">
                        PRODUCT NAME
                      </label>
                    </div>
                    <input
                      type="text"
                      name="productName"
                      className="w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter product name..."
                      value={editField.productName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xs font-bold leading-wider">
                        PRODUCT OWNER
                      </label>
                    </div>
                    <input
                      type="text"
                      name="productOwnerName"
                      className="w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter product owner name..."
                      value={editField.productOwnerName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xs font-bold leading-wider">
                        SCRUM MASTER
                      </label>
                    </div>
                    <input
                      type="text"
                      name="scrumMasterName"
                      className="w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter scrum master name..."
                      value={editField.scrumMasterName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-8">
                    <div className="mb-2">
                      <label className="text-xs font-bold leading-wider">
                        START DATE
                      </label>
                    </div>
                    <input
                      type="date"
                      min="2000-01-01"
                      max="2030-12-31"
                      name="startDate"
                      className="w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="YYYY/MM/DD"
                      value={editField.startDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-[44px]">
                    <div className="mb-2">
                      <label className="text-xs font-bold leading-wider">
                        METHODOLOGY
                      </label>
                    </div>
                    <input
                      type="text"
                      name="methodology"
                      className="w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter methodology..."
                      value={editField.methodology}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-start-2 col-span-1">
                  <div className="mb-8 flex flex-col">
                    <div className="mb-2">
                      <label className="text-xs font-bold leading-wider">
                        DEVELOPERS
                      </label>
                    </div>
                    <input
                      type="text"
                      name="developerOne"
                      className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      value={editField.developerOne}
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="text"
                      name="developerTwo"
                      className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter developer name..."
                      value={editField.developerTwo}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="developerThree"
                      className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter developer name..."
                      value={editField.developerThree}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="developerFour"
                      className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter developer name..."
                      value={editField.developerFour}
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name="developerFive"
                      className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                      placeholder="Enter developer name..."
                      value={editField.developerFive}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full space-y-[12px]">
                <button
                  type="submit"
                  className={`${disableBtn ? 'bg-[#8494b4]' : 'bg-[#234075]'} text-white text-sm font-sans font-bold tracking-wider rounded-[20px] px-4 py-1`}
                  disabled={disableBtn}
                >
                  SAVE CHANGES
                </button>
                <button onClick={() => setEdit(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  )
};

export default DataTable;