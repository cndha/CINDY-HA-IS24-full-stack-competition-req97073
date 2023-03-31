import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateModal = (props) => {
  const { onClose, getProducts, idList } = props;
  const [form, setForm] = useState({
    productName: "",
    productOwnerName: "",
    developerOne: "",
    developerTwo: "",
    developerThree: "",
    developerFour: "",
    developerFive: "",
    scrumMasterName: "",
    startDate: "",
    methodology: ""
  })

  const generateProductId = () => {
    let newProductId = Math.floor(Math.random() * (9999 - 1000) + 1000);

    if (idList.includes(newProductId)) {
      return generateProductId();
    }

    return newProductId;
  }

  const handleChange = (e) => {
    const key = e.target.name;
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    //set new state obj
    return setForm({
      ...form,
      [key]: val,
    });
  }

  const createNewEntry = async (e) => {
    e.preventDefault();

    const postData = {
      productId: generateProductId(),
      productName: form.productName,
      productOwnerName: form.productOwnerName,
      developers: [form.developerOne, form.developerTwo, form.developerThree, form.developerFour, form.developerFive],
      scrumMasterName: form.scrumMasterName,
      startDate: form.startDate,
      methodology: form.methodology
    };

    await axios.post('/api/products', postData)
      .then(res => {
        console.log(res);
        getProducts(); //update data
        onClose(false); //close modal
      })
      .catch(err => console.log(err))

  }

  return (
    <div className="flex flex-col items-center px-[24px] py-[16px]">
      <p className="mb-[44px] text-[#65769c] text-md font-bold leading-wider">CREATE NEW PRODUCT ENTRY</p>

      <form onSubmit={createNewEntry}>
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
                value={form.productName}
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
                value={form.productOwnerName}
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
                value={form.scrumMasterName}
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
                value={form.startDate}
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
                value={form.methodology}
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
                placeholder="Enter developer name..."
                value={form.developerOne}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="developerTwo"
                className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                placeholder="Enter developer name..."
                value={form.developerTwo}
                onChange={handleChange}
              />
              <input
                type="text"
                name="developerThree"
                className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                placeholder="Enter developer name..."
                value={form.developerThree}
                onChange={handleChange}
              />
              <input
                type="text"
                name="developerFour"
                className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                placeholder="Enter developer name..."
                value={form.developerFour}
                onChange={handleChange}
              />
              <input
                type="text"
                name="developerFive"
                className="mb-3 w-[300px] rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 hover:border-gray-400"
                placeholder="Enter developer name..."
                value={form.developerFive}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-[12px]">
          <button
            type="submit"
            className="bg-[#234075] text-white text-sm font-sans font-bold tracking-wider rounded-[20px] px-4 py-1"
          >
            SAVE
          </button>
          <button onClick={() => onClose(false)}>Cancel</button>
        </div>
      </form>
    </div>
  )
};

export default CreateModal;