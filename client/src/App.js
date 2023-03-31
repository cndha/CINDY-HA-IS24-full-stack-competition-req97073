import { useState, useEffect } from 'react';
import axios from 'axios';

import DataTable from './components/DataTable';
import Modal from 'react-modal';
import CreateModal from './components/CreateModal';

import logo from './logo.png';

function App() {
  const [dataState, setDataState] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [idList, setIdList] = useState([]); //array of product Ids to check for generating new id

  //display data
  const getProducts = () => {
    axios.get('/api/products')
      .then(res => {
        console.log(res);
        setDataState(res.data);
        setTotal(res.data.length);

        const idArray = res.data.map(i => {
          return i.productId
        })
        setIdList(idArray);
        console.log(idArray);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, [])

  const tableData = dataState.map((i, index) => {
    return (
      <DataTable
        key={index}
        productId={i.productId}
        productName={i.productName}
        productOwnerName={i.productOwnerName}
        developers={i.developers}
        scrumMasterName={i.scrumMasterName}
        startDate={i.startDate}
        methodology={i.methodology}
        getFunction={getProducts}
      />
    )
  })

  const tableHeadings = ["PRODUCT ID", "PRODUCT NAME", "PRODUCT OWNER", "DEVELOPERS", "SCRUM MASTER", "START DATE", "METHODOLOGY"];

  return (
    <div className="max-w-screen-2xl mx-auto mb-[80px]">
      <div className="w-full flex justify-between items-center mb-[80px]">
        <img src={logo} alt="" className="w-1/5 max-w-1/5" />
        <div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-[#234075] text-white text-md font-sans font-semibold tracking-wide rounded-[20px] px-6 py-3 mr-[20px]"
          >
            ADD NEW ENTRY
          </button>
        </div>
      </div>

      <h1 className="font-serif font-semibold text-5xl ml-[80px] mb-[44px]">IMB Applications</h1>

      <p className="text-md font-sans font-semibold tracking-wide ml-[80px] mb-[18px]">TOTAL: {total}</p>

      <div className="bg-[#EFEFEF] w-[95%] ml-[2.5%] rounded-[40px] p-[44px]">
        <table className="w-full">
          <tr className="text-left">
            {tableHeadings.map((i) => {
              return (
                <th className="text-[#8494b4] text-sm font-sans font-extrabold tracking-wide pb-[60px]">{i}</th>
              )
            })}
          </tr>
          {tableData}
        </table>
      </div>

      {modalOpen && (
        <Modal
          isOpen={modalOpen}
          parentSelector={() => document.body}
        >
          <CreateModal
            idList={idList}
            getProducts={getProducts}
            onClose={() => setModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
